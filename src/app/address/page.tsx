"use client";
import Image from "next/image";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
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
  let addressData: any = [];
  let cartData: any = [];

  if (localStorage.getItem("items")) {
    cartData = JSON.parse(
      "[" + localStorage.getItem("items")?.replace("null,", "") + "]"
    );
  }
  if (localStorage.getItem("address")) {
    addressData = JSON.parse(
      "[" + localStorage.getItem("address")?.replace("null,", "") + "]"
    );
  }
  async function createOrder(address_data: any, cart_data: any) {
    const orderId = Math.random();
    const { data: brands } = await supabase
      .from("orders")
      .insert({
        address_data: address_data,
        cart_data: cart_data,
        nproduct: totProds,
        amtproduct: estimateTotal,
        orderId: orderId,
      });
    localStorage.removeItem("items");
    localStorage.setItem(
      "orderId",
      localStorage.getItem("orderId") + "," + orderId
    );

    router.push("/parcels");
  }
  return (
    <main className="flex flex-col items-center justify-between">
      <link
        href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
        rel="stylesheet"
      />
      <div className="header lg:flex items-center">
        <img src="logo.png" className="logo" />
        <div className="menu">
          <a href="/" className="pls menu-item active">
            Primiți o ofertă
          </a>
          <a href="/parcels" className="menu-item hover:active">
            Coletele Dvs.
          </a>
          <a href="#" className="menu-item">
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
                <div
                  className="item"
                  onClick={() => createOrder(addressItem, cartData)}
                >
                  <div className="flex">
                    <img src="trashicon.svg" />
                    <span className="prodname3  w-full">
                      {addressItem.street +
                        ", " +
                        addressItem.city +
                        ", " +
                        addressItem.country}{" "}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <Link className="mbtn mt-5" href="/addnewaddress">
              Adăugați o adresă
            </Link>
          </div>
          <div className="lg:twoSec">
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
                      <img src="trashicon.svg" />
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
