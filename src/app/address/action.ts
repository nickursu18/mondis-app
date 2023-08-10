"use server";
import axios from "axios";

type AddressData = {
  id: string;
  name: string;
  familyName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  street: string;
  postalCode: string;
  additional: string;
};

type CartItem = {
  id: string;
  gender: string;
  brand: string;
  categories: string;
  subcat: string;
  estimate: string;
  subcatname: string;
};

export type OrderData = {
  id: number;
  created_at: string;
  address_data: AddressData;
  cart_data: CartItem[];
  nproduct: number;
  amtproduct: number;
  orderId: string;
  orderStatus: number;
  finalEstimate: null;
  giftCardCode: null;
  fancourier_orderId:number
};

export const loginFanCourier = async ()=>{
  return await axios
    .request({
      method: "POST",
      url: "https://api.fancourier.ro/login",
      params: {
        username: process.env.fancourier_username,
        password: process.env.fancourier_password,
      },
    })
    .then((res: any) => {
      axios.defaults.headers.common.Authorization = "Bearer " + res.data.token;
      return true
    })
    .catch((err) => {return false});
}

export const generateCourierOrder = async (orderId:number,address: AddressData) => {
  const res = await loginFanCourier()
  if(res){
  const awbNumber = await generateInternalAWB(orderId,address);
  return await createCourierOrder(awbNumber);
}
};

const generateInternalAWB = async (orderId:number,address: AddressData) => {
  return await axios
    .request({
      method: "POST",
      url: "https://api.fancourier.ro/intern-awb",
      data: {
        clientId: process.env.fancourier_clientid,
        shipments: [
          {
            info: {
              service: "Standard",
              packages: {
                parcel: 1,
                envelopes: 0,
              },
              weight: 1,
              payment: "recipient",
              returnPayment: null,
              observation: "Observation",
              content: `Order no. ${orderId}`,
              dimensions: {
                length: 1,
                height: 2,
                width: 3,
              },
              costCenter: "DEP IT",
              // options: ["X"],
            },
            recipient: {
              name: address.name,
              phone: address.phone,
              email: 'siroves758@semonir.com',
              // email: order.address_data.email,
              address: {
                county: "Alba",
                locality: "Abrud",
                street: "1 Decembrie 1918",
                streetNo: "11C",
                zipCode: "515100",
              },
            },
          },
        ],
      },
    })
    .then((res) => {
      return res.data.response[0].awbNumber;
    })
    .catch((err) => {
      return null;
    });
};

const createCourierOrder = async ( awbNumber: number) => {
  return await axios
    .request({
      method: "POST",
      url: "https://api.fancourier.ro/order",
      data: {
        info: {
          awbnumber: awbNumber, // it must be filled in with the AWB number if you want it to be printed by the courier, when picking up the shipment
          packages: {
            // mandatory
            parcel: 1,
            envelope: 0,
          },
          weight: 1, // mandatory
          dimensions: {
            // mandatory; the sizes of the largest parcel
            width: 10,
            length: 10,
            height: 10,
          },
          orderType: "Standard", // mandatory; Standard or Express Loco
          pickupDate: "2023-09-27", // the date when the courier will show up to pick up the shipment(s.
          pickupHours: {
            // the interval cannot be below 2 hours
            first: "09:00", // minimum pickup time
            second: "16:00", // maximum pickup time
          },
          observations: "test",
        },
        clientId: process.env.fancourier_clientid,
      },
    })
    .then((res) => {
      return res.data['data']['id']
    })
    .catch((e) => {
      console.log(e);
      return undefined;
    });
};
