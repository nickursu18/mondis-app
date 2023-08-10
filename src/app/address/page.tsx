"use client";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import axios from "axios";

import { createClient } from "@supabase/supabase-js";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { start } from "repl";
import { generateCourierOrder } from "./action";

export default function Home() {
  const supabaseUrl: any = "https://pkrvehrepdgvyksotuyg.supabase.co";
  const supabaseKey: any =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrcnZlaHJlcGRndnlrc290dXlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc5NTQ4NTcsImV4cCI6MjAwMzUzMDg1N30.ZLsSjv5GYf82e2pLwOWrcbSH89jwuLedNdTEeqdQsKE";
  const supabase = createClient(supabaseUrl, supabaseKey);
  const router = useRouter();
  const [nproduct, setnProduct] = useState(0);
  const [amtproduct, setAmtProduct] = useState(0);
  const a = 100;
  const b = 200;
  const searchParams = useSearchParams();
  let estimateTotal = 0;
  let totProds = 0;
  // let addressData: any = [];
  const [cartData, setCartData] = useState(
    typeof window !== "undefined"
      ? JSON.parse(
          "[" + localStorage.getItem("items")?.replace("null,", "") + "]"
        )
      : null
  );
  const [addressData, setAddressData] = useState<any[]>(
    localStorage.getItem("address")
      ? JSON.parse(
          "[" + localStorage.getItem("address")?.replace("null,", "") + "]"
        )
      : null
  );

  async function createOrder(address_data: any, cart_data: any) {
    const orderId = Math.random();
    const courierOrderId = await generateCourierOrder(orderId, address_data);
    if (courierOrderId) {
      const { data }: any = await supabase
        .from("orders")
        .insert({
          address_data: address_data,
          cart_data: cart_data,
          nproduct: totProds,
          amtproduct: estimateTotal,
          orderId: orderId,
          fancourier_orderId: courierOrderId,
        })
        .select();
      if (data) {
        await localStorage.setItem(
          "orderId",
          localStorage.getItem("orderId") + "," + data[0].id
        );
        router.push("/parcels");
      } else alert("Failed, Order did not placed");
    } else alert("Failed, Order did not placed on courier service");
    //
  }

  useEffect(() => {
    if (cartData.length === 0) {
      router.push("/");
    }
  }, [cartData]);

  // const generateCourierOrder = async () => {
  //   await axios
  //     .request({
  //       method: "POST",
  //       url: "https://api.fancourier.ro/login",
  //       params: {
  //         username: "Rapciuc1994",
  //         password: "Mamaia123456789",
  //       },
  //     })
  //     .then((res: any) => {
  //       console.log(res);
  //       axios.defaults.headers.common.Authorization = "Bearer " + res.token;
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const [isPending, startTransition] = useTransition();

  // startTransition(() => {

  //   generateCourierOrder();
  // });

  // generateCourierOrder();

  const deleteProduct = (id: string) => {
    const storeArray: any[] = JSON.parse(
      "[" +
        localStorage.getItem("items")?.substring(0).replace("null,", "") +
        "]"
    );

    const updatedArray: any[] = storeArray.filter(
      (item: any) => item.id !== id
    );

    var commaSeparatedString = updatedArray
      .map((obj) => {
        return JSON.stringify(obj);
      })
      .join(", ");

    console.log(commaSeparatedString);

    setCartData(updatedArray);
    if (updatedArray?.length === 0) {
      localStorage.setItem("items", "null");
      return;
    }
    localStorage.setItem("items", "null," + commaSeparatedString);
    // localStorage.setItem("items", JSON.stringify(updatedArray));
  };

  const deleteAddress = (id: string) => {
    const storeArray: any[] = JSON.parse(
      "[" +
        localStorage.getItem("address")?.substring(0).replace("null,", "") +
        "]"
    );

    const updatedArray = storeArray.filter((item: any) => item.id !== id);

    var commaSeparatedString = updatedArray
      .map((obj) => {
        return JSON.stringify(obj);
      })
      .join(", ");

    console.log(commaSeparatedString);

    setAddressData(updatedArray);
    if (updatedArray?.length === 0) {
      localStorage.setItem("address", "null");
      return;
    }
    localStorage.setItem("address", "null," + commaSeparatedString);
    // localStorage.setItem("items", JSON.stringify(updatedArray));
  };

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
        <div className="lg:grid lg:grid-cols-2 lg:gap-10">
          <div className="items-start text-left">
            <h3 className="topH">Alegeți adresa</h3>
            <br />

            <br />
            <p>
              Curierul va ridica coletul cu articolele Dvs. de la adresa pe care
              o veți indica.
            </p>
            {addressData?.map((addressItem: any, i: any) => (
              <div
                key={i}
                className="threeSec9 items-start text-left msg"
                style={{ width: "100%" }}
              >
                <div className="item">
                  <div className="flex items-center">
                    <img
                      alt="trash"
                      onClick={() => deleteAddress(addressItem.id)}
                      src="trashicon.svg"
                    />
                    <span className="prodname3  w-full">
                      {addressItem.street +
                        ", " +
                        addressItem.city +
                        ", " +
                        addressItem.country}{" "}
                    </span>

                    <button
                      onClick={() => {
                        createOrder(addressItem, cartData);
                      }}
                      className="mbtn mr-4 p-4"
                    >
                      Comandă FAN Courier
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <Link className="mbtn mt-5" href="/addnewaddress">
              Adăugați o adresă
            </Link>
          </div>
          <div className="lg:twoSec mt-10 lg:mt-0">
            <div
              className="items-start text-left amp2"
              style={{ width: "100%" }}
            >
              <h1 className="secHead2">Produse de vânzare</h1>
              <br />
              {cartData?.map((cartItem: any, i: any) => {
                estimateTotal += parseInt(cartItem.estimate);
                return (
                  <div key={i} className="item">
                    <div className="flex">
                      <img
                        alt="trash"
                        onClick={() => deleteProduct(cartItem.id)}
                        src="trashicon.svg"
                      />
                      <span className="prodname  w-full">
                        {cartItem.gender.toUpperCase() +
                          " " +
                          cartItem.brand.toUpperCase() +
                          " " +
                          cartItem.subcatname}{" "}
                      </span>
                      <span className="prodname text-right items-right">
                        {cartItem.estimate} lei
                      </span>
                    </div>
                  </div>
                );
              })}

              <br />
              <hr className="rline" />
              <br />
              <div className="item">
                <div className="flex">
                  <span className="prodname2  w-full text-lg">Vei primi </span>
                  <span className="prodnamen text-right items-right">
                    {estimateTotal} lei
                  </span>
                </div>
              </div>

              <p className="text-md mt-10">
                Vindeți mai ușor, mai ieftin și cu transport gratuit către
                Mondis!
              </p>
              <br />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
