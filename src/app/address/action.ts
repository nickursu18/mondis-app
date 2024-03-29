"use server";
import axios from "axios";
import moment from "moment-timezone";

const httpClient = axios.create({
  baseURL: "https://api.fancourier.ro",
  headers: {
    date: moment
      .tz(new Date(), "Europe/Bucharest")
      .format("MMMM DD HH:mm:ss.SS [GMT]Z")
      .toString(),
    "Content-Type": "application/json",
  },
});

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
  building: string;
  entrance: string;
  floor: string;
  apartment: string;
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
  fancourier_orderId: number;
};

export const loginFanCourier = async () => {
  return await httpClient
    .request({
      method: "POST",
      url: "login",
      params: {
        username: process.env.fancourier_username,
        password: process.env.fancourier_password,
      },
    })
    .then((res: any) => {
      httpClient.defaults.headers.common.Authorization =
        "Bearer " + res.data.data.token;
      return true;
    })
    .catch((err) => {
      return false;
    });
};

export const generateCourierOrder = async (
  orderId: number,
  address: AddressData,
  pickup: {
    date: string;
    firstPickup: string;
    secondPickup: string;
  }
) => {
  const res = await loginFanCourier();
  if (res) {
    const awbNumber = await generateInternalAWB(orderId, address);

    console.log("========================================");
    console.log(awbNumber);
    console.log("========================================");

    return await createCourierOrder(awbNumber, address, pickup);
  }
};

const generateInternalAWB = async (orderId: number, address: AddressData) => {
  return await httpClient
    .request({
      method: "POST",
      url: "intern-awb",
      data: {
        clientId: process.env.fancourier_clientid,
        shipments: [
          {
            info: {
              service: "Standard",
              bank: "",
              bankAccount: "",
              packages: {
                parcel: 1,
                envelope: 0,
              },
              weight: 12,
              cod: 0,
              declaredValue: 0,
              payment: "sender",
              refund: "",
              returnPayment: "recipient",
              observation: "",
              content: "",
              dimensions: {
                length: "45",
                height: "25",
                width: "20",
              },
              costCenter: "cost center",
              // options: ["X"],
            },
            sender: {
              name: "Client Garabo",
              phone: "0769001001",
              contactPerson: "",
              secondaryPhone: "",
              email: "",
              address: {
                county: "Bucuresti",
                locality: "Bucuresti",
                zipCode: "052331",
                building: "",
                entrance: "",
                floor: "",
                street: "Imasului",
                streetNo: "57",
                apartment: "",
                dropOffLocation: "",
              },
            },
            recipient: {
              name: address.name,
              contactPerson: `${address.familyName} ${address.name}`,
              phone: address.phone,
              secondaryPhone: "",
              email: address.email,
              address: {
                locality: address.city,
                county: address.country,
                agency: "Bucharest",
                street: address.street,
                streetNo: address.building,
                zipCode: address.postalCode,
                building: null,
                entrance: address.entrance,
                floor: address.floor,
                apartment: address.apartment,
                country: "Romania",
              },
            },
          },
        ],
      },
    })
    .then((res) => {
      console.log(res.data.response[0]);

      return res.data.response[0].awbNumber;
    })
    .catch((err) => {
      console.log(err);

      return null;
    });
};

const createCourierOrder = async (
  awbNumber: number,
  address: AddressData,
  pickup: {
    date: string;
    firstPickup: string;
    secondPickup: string;
  }
) => {
  return await httpClient
    .request({
      method: "POST",
      url: "order",
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
          pickupDate: moment(pickup.date).add(1, "day").format("YYYY-MM-DD"), // the date when the courier will show up to pick up the shipment(s.
          pickupHours: {
            // the interval cannot be below 2 hours
            first: pickup.firstPickup, // minimum pickup time
            second: pickup.secondPickup, // maximum pickup time
          },
          observations: "test",
        },
        clientId: process.env.fancourier_clientid,
        sender: {
          name: address.name,
          contactPerson: "Jon Snow",
          phone: address.phone,
          secondaryPhone: "0799999888",
          email: address.email,
          address: {
            locality: address.city,
            county: address.country,
            agency: "Bucharest",
            street: address.street,
            streetNo: address.building,
            zipCode: address.postalCode,
            building: null,
            entrance: address.entrance,
            floor: address.floor,
            apartment: address.apartment,
            country: "Romania",
          },
        },
      },
    })

    .then((res) => {
      return res.data["data"]["id"];
    })
    .catch((e) => {
      console.log(e);
      return undefined;
    });
};
