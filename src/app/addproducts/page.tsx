"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Home() {
  let estimateTotal = 0;

  const [cartData, setCartData] = useState(
    typeof window !== "undefined" && localStorage.getItem("items")
      ? JSON.parse(
          "[" + localStorage.getItem("items")?.replace("null,", "") + "]"
        )
      : []
  );

  const router = useRouter();

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

  useEffect(() => {
    if (cartData.length === 0) {
      router.back();
    }
  }, [cartData]);

  return (
    <>
      {cartData.length !== 0 && (
        <main className="flex flex-col items-center justify-between">
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
            rel="stylesheet"
          />
          <div className="header flex flex-col sm:flex-row items-center">
            <a href="https://mondis.ro" target="_parent">
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
            <div className="lg:grid lg:grid-cols-2 lg:gap-10">
              <div className="items-center text-center">
                <center>
                  <img src="ati.svg" />
                </center>

                <br />
                <div className="flex gap-5 text-center items-center">
                  <Link href="/" className="mbtn" style={{ width: "48%" }}>
                    Adăugați produse
                  </Link>
                  <Link
                    href="/address"
                    className="mbtn"
                    style={{ width: "48%" }}
                  >
                    Pasul următor{" "}
                  </Link>
                </div>
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
                            src="trashicon.svg"
                            onClick={() => deleteProduct(cartItem.id)}
                          />
                          <span className="prodname  w-full">
                            {cartItem.gender.toUpperCase() +
                              " " +
                              cartItem.brand.toUpperCase() +
                              " " +
                              cartItem.subcatname}{" "}
                          </span>
                          <span className="prodname w-20 text-right items-right">
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
                      <span className="prodname2  w-full text-lg">
                        Veți primi{" "}
                      </span>
                      <span className="prodnamen 2-20 text-right items-right">
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
      )}
    </>
  );
}
