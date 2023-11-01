"use server";
import axios from "axios";
import { loginFanCourier } from "../address/action";

export const fetchCounties = async ()=>{
  const auth = await loginFanCourier()
  if(auth)
  return await axios
  .request({
    url: "https://api.fancourier.ro/reports/counties",
  })
  .then((res: any) => {
   return res.data.data
    
  })
  .catch((err) => {
    console.log(err)
    return false;
  });
}
export const fetchLocalities = async (county:string)=>{
  return await axios
  .request({
    url: "https://api.fancourier.ro/reports/localities",
    params:{
      county
    }
  })
  .then((res: any) => {
   return res.data.data
  })
  .catch((err) => {
    console.log(err)
    return false;
  });
}
export const fetchStreets = async (county:string,locality:string,page:number)=>{
  return await axios
  .request({
    url: "https://api.fancourier.ro/reports/streets",
    params:{
      county,locality,page
    }
  })
  .then((res: any) => {
    // console.log(res.data.data)
   return res.data
  })
  .catch((err) => {
    console.log(err)
    return false;
  });
}

