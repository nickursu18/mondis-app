"use client";
import Image from "next/image";
import Link from "next/link";
import { exit } from "process";
export default function Home() {
  // localStorage.removeItem('items');
  let estimateTotal = 0;
  const cartData =
    typeof window !== "undefined"
      ? JSON.parse(
          "[" + localStorage.getItem("items")?.replace("null,", "") + "]"
        )
      : null;

  return (
    <main className="flex flex-col items-center justify-between">
      <link
        href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
        rel="stylesheet"
      />
      <div className="header flex flex-col sm:flex-row items-center">
      <a href="https://mondis.ro">
          <img src="logo.png" className="logo" />
        </a>
        <div className="flex flex-col space-y-4 sm:space-y-0 items-center sm:flex-row mt-4 sm:mt-[0]">
          <a href="/" className="menu-item sm:p-[30px]">
            Primiți o ofertă
          </a>
          <a href="/parcels" className="menu-item sm:p-[30px]">
            Coletele Dvs.
          </a>
          <a href="https://mondis.ro" className="menu-item sm:p-[30px]">
            Înapoi spre magazin
          </a>
        </div>
      </div>
      <hr className="bline w-full" />
      <div className="w-full stepsContainer">
        <div className="grid grid-cols-2">
          <div className="items-start text-left">
            <h3 className="topH">Cum veți expedia produsul dvs.?</h3>
            <br />

            <br />
            <Link href="/address">
              <img src="parads.svg" className="hov" style={{ width: "50%" }} />
            </Link>
          </div>
          <div className="twoSec">
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
                  <span className="prodname2  w-full text-lg">Veți primi </span>
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
