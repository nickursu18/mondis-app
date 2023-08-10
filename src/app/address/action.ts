"use server";
import axios from "axios";
import moment from "moment";

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
};

export const generateCourierOrder = async (order: OrderData) => {
  // console.log(order);
  await axios
    .request({
      method: "POST",
      url: "https://api.fancourier.ro/login",
      params: {
        username: "Rapciuc1994",
        password: "Mamaia123456789",
      },
    })
    .then((res: any) => {
      console.log(res.data.data.token);
      axios.defaults.headers.common.Authorization = "Bearer " + res.data.data.token;
    })
    .catch((err) => console.log(err));

  const awbData = await generateInternalAWB(order);
  console.log(awbData);
  const awbNumber = awbData.response[0].awbNumber;

  const res = await createCourierOrder(order, awbNumber);
  return res;
};

const generateInternalAWB = async (order: OrderData) => {
  return await axios
    .request({
      method: "POST",
      url: "https://api.fancourier.ro/intern-awb",
      data: {
        clientId: 7251049,
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
              content: `Order no. ${order.id}`,
              dimensions: {
                length: 1,
                height: 2,
                width: 3,
              },
              costCenter: "DEP IT",
              // options: ["X"],
            },
            recipient: {
              name: order.address_data.name,
              phone: order.address_data.phone,
              email: "weraci4955@mahmul.com",
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
      return res.data;
    })
    .catch((err) => {
      return null;
    });
};

const createCourierOrder = async (order: OrderData, awbNumber: number) => {
  await axios
    .request({
      method: "POST",
      url: "https://api.fancourier.ro/order",

      data: {
        info: {
          awbnumber: null, // it must be filled in with the AWB number if you want it to be printed by the courier, when picking up the shipment
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
        clientId: 7251049,
      },
    })
    .then((res) => {
      console.log(res);
      return true;
    })
    .catch((e) => {
      console.log(e);
      return false;
    });

  return false;
};
