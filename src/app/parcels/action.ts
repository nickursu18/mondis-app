"use server";
import axios from "axios";
import { OrderData, loginFanCourier } from "../address/action";


export const trackCourierOrder = async (orders: OrderData[]) => {
  const res = await loginFanCourier()
  const orderIds = orders.map((order)=>order.fancourier_orderId).join('&orderId[]=')
  if(res){
  return await axios
    .request({
      method: "GET",
      url: `https://api.fancourier.ro/reports/orders/tracking?clientId=${process.env.fancourier_clientid}&orderId[]=${orderIds}`,
    })
    .then((res: any) => {
      return res.data?.data
    })
    .catch((err) => console.log(err));
  }
};


