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
            sender: {
              name: address.name,
              phone: address.phone,
              email: address.email,
              address: {
                county: address.country,
                locality: address.city,
                street: address.street,
                zipCode: address.postalCode,
                building: address.building,
                entrance: address.entrance,
                floor: address.floor,
                apartment: address.apartment,
              },
            },
            recipient: {
              name: "GARABO GLOBAL SRL",
              phone: "",
              contactPerson: "GARABO GLOBAL SRL",
              secondaryPhone: "",
              email: "",
              address: {
                county: "Romania",
                locality: "Medgidia",
                street: "Sos Constantei Nr 1E",
                zipCode: "905600",
                streetNo: "1",
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

const createCourierOrder = async (
  awbNumber: number,
  address: AddressData,
  pickup: {
    date: string;
    firstPickup: string;
    secondPickup: string;
  }
) => {
  console.log("================>", address);
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
        recipient: {
          name: address.name,
          phone: address.phone,
          email: address.email,
          address: {
            county: address.country,
            locality: address.city,
            street: address.street,
            zipCode: address.postalCode,
            building: address.building,
            entrance: address.entrance,
            floor: address.floor,
            apartment: address.apartment,
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
