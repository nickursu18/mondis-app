"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import moment from "moment";
import { OrderData } from "../address/action";

export default function Home() {
  const supabaseUrl: any = "https://pkrvehrepdgvyksotuyg.supabase.co";
  const supabaseKey: any =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrcnZlaHJlcGRndnlrc290dXlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc5NTQ4NTcsImV4cCI6MjAwMzUzMDg1N30.ZLsSjv5GYf82e2pLwOWrcbSH89jwuLedNdTEeqdQsKE";
  const supabase = createClient(supabaseUrl, supabaseKey);
  // const router = useRouter();
  // const [nproduct, setnProduct] = useState(0);
  // const [amtproduct, setAmtProduct] = useState(0);
  let orderData: any;
  if (typeof window !== "undefined") {
    if (localStorage.getItem("orderId")) {
      orderData =
        typeof window !== "undefined"
          ? JSON.parse(
              "[" + localStorage.getItem("orderId")?.replace("null,", "") + "]"
            )
          : null;
    }
  }

  const [orders, setOrders] = useState<OrderData[]>([]);

  const fetchOrders = async () => {
    const { data, error }: any = await supabase
      .from("orders")
      .select()
      .in("id", orderData);

      setOrders(data);
  };
  useEffect(()=>{
    fetchOrders();
  },[])
  

  const a = 100;
  const b = 200;
  const searchParams = useSearchParams();
  // const a = 100;
  // const b = 200;
  // const searchParams = useSearchParams();

  const orderStatusName = (orderStatus: number) => {
    switch (orderStatus) {
      case 0:
        return "Waiting Courier Pickup";
      case 1:
        return "Waiting to be Delivered";
      case 2:
        return "Estimation Recieved";
      case 3:
        return "Estimation Approved";
      case 4:
        return "Digital Contract Signed";
      case 5:
        return "Gift Card Issued";
    }
  };

  console.log(orders);

  return (
    <main className="flex flex-col items-center justify-between">
      <link
        href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
        rel="stylesheet"
      />
      <div className="header flex flex-col sm:flex-row items-center">
        <img src="logo.png" className="logo" />
        <div className="flex flex-col space-y-4 sm:space-y-0 items-center sm:flex-row mt-4 sm:mt-[0]">
          <a href="/" className="menu-item sm:p-[30px]">
            Primiți o ofertă
          </a>
          <a href="/parcels" className="menu-item sm:p-[30px]">
            Coletele Dvs.
          </a>
          <a href="#" className="menu-item sm:p-[30px]">
            Înapoi spre magazin
          </a>
        </div>
      </div>
      <hr className="bline w-full" />
      <div className="w-full stepsContainer">
        <div className="lg:grid lg:grid-cols-2 gap-10">
          <div className="items-start text-left">
            {orders?.map((orderItem: any, i: any) => (
                <div key={i} className="item2">
                  <div className="flex space-x-4">
                    <img src="orangetick.svg" />
                    <span className="prodname w-full">
                      Coletul {moment(orderItem.created_at).format("MMMM Do")} (
                      {orderItem.cart_data?.length} articole){" "}
                    </span>
                      <img src="waiting.svg" />
                    <img src="parcel.svg" className="inline-block" />
                    <span className="text-[9px]">
                      {orderStatusName(orderItem.orderStatus)}
                    </span>
                  </div>
                </div>
              
            ))}
            {orderData?.length == 0 ? (
              <div>
                <p>Nu aveți nici un colet expediat către Mondis. </p>
                <br />
                <Link href="/" className="mbtn mt-5">
                  Începeți aici
                </Link>
              </div>
            ) : (
              ""
            )}
            <br />
          </div>
          <div className="lg:twoSec mt-10 lg:mt-0">
            <img src="appg.svg" />
          </div>
        </div>
      </div>
    </main>
  );
}
