"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { nanoid } from "nanoid";

export default function Home() {
  let estimateTotal = 0;
  // const cartData =
  //   typeof window !== "undefined"
  //     ? JSON.parse(
  //         "[" + localStorage.getItem("items")?.replace("null,", "") + "]"
  //       )
  //     : null;
  const [name, setName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [additional, setAdditional] = useState("");

  const addressS = {
    id: nanoid(),
    name: name,
    familyName: familyName,
    email: email,
    phone: phone,
    country: country,
    city: city,
    street: street,
    postalCode: postalCode,
    additional: additional,
  };
  function addAddress() {
    localStorage.setItem(
      "address",
      localStorage.getItem("address") + "," + JSON.stringify(addressS)
    );
  }

  const [cartData, setCartData] = useState(
    typeof window !== "undefined"
      ? JSON.parse(
          "[" + localStorage.getItem("items")?.replace("null,", "") + "]"
        )
      : null
  );

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
          <div className="items-start text-left space-y-4">
            <h3 className="topH">Adaugă adresa </h3>
            <br />

            <br />
            <p className="labl2">Destinatar</p>
            <br />
            <div className="flex cols-2 gap-5 w-full">
              <div>
                <b className="labl">Nume</b>
                <br />
                <input
                  type="text"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  className="texts"
                  style={{ width: "100%" }}
                  placeholder=""
                />
              </div>
              <div>
                <b className="labl">Prenume</b>
                <br />
                <input
                  type="text"
                  value={familyName}
                  onChange={(event) => {
                    setFamilyName(event.target.value);
                  }}
                  className="texts"
                  style={{ width: "100%" }}
                  placeholder=""
                />
              </div>
            </div>
            <div className="flex cols-2 gap-5 w-full">
              <div>
                <b className="labl">Telefon</b>
                <br />
                <input
                  type="text"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                  }}
                  className="texts"
                  style={{ width: "100%" }}
                  placeholder=""
                />
              </div>
              <div>
                <b className="labl">E-mail</b>
                <br />
                <input
                  type="text"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  className="texts"
                  style={{ width: "100%" }}
                  placeholder=""
                />
              </div>
            </div>
            <br />
            <p className="labl2">Adresa</p>
            <br />
            <div className="flex cols-2 gap-5 w-full">
              <div>
                <b className="labl">Țara</b>
                <br />
                <input
                  type="text"
                  value={country}
                  onChange={(event) => {
                    setCountry(event.target.value);
                  }}
                  className="texts"
                  style={{ width: "100%" }}
                  placeholder=""
                />
              </div>
              <div>
                <b className="labl">Oraș</b>
                <br />
                <input
                  type="text"
                  value={city}
                  onChange={(event) => {
                    setCity(event.target.value);
                  }}
                  className="texts"
                  style={{ width: "100%" }}
                  placeholder=""
                />
              </div>
            </div>
            <div className="flex cols-2 gap-5 w-full">
              <div>
                <b className="labl">Strada</b>
                <br />
                <input
                  type="text"
                  value={street}
                  onChange={(event) => {
                    setStreet(event.target.value);
                  }}
                  className="texts"
                  style={{ width: "100%" }}
                  placeholder=""
                />
              </div>
              <div>
                <b className="labl">Cod poștal</b>
                <br />
                <input
                  type="text"
                  value={postalCode}
                  onChange={(event) => {
                    setPostalCode(event.target.value);
                  }}
                  className="texts"
                  style={{ width: "100%" }}
                  placeholder=""
                />
              </div>
            </div>
            <div>
              <b className="labl">Informații suplimentare</b>
              <br />
              <textarea
                rows={5}
                value={additional}
                onChange={(event) => {
                  setAdditional(event.target.value);
                }}
                className="texts"
                style={{ width: "100%" }}
                placeholder=""
              ></textarea>
            </div>
            <Link
              href="/address"
              onClick={() => addAddress()}
              className="mbtn mt-5"
            >
              Salvează adresă
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
                      <img alt="trash" onClick={() => deleteProduct(cartItem.id)} src="trashicon.svg" />
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
