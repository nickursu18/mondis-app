"use client";
import Link from "next/link";

export default function Home() {
  return (
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
          <a
            href="https://mondis.ro"
            className="menu-item sm:p-[30px]"
            target="_parent">
            Înapoi spre magazin
          </a>
        </div>
      </div>
      <hr className="bline w-full" />
      <div className="w-full stepsContainer">
        <div className="lg:grid lg:grid-cols-2 lg:gap-10">
          <div>
            <h3 className="topH">Alegeți Genul</h3>
            <img src="gender_img.png" className="genderPhoto" />
            <br />
            <br />
            <div className="lg:flex lg:colmm">
              <Link
                href="/brand?gender=women"
                className="items-center text-center msg">
                <img
                  src="women.svg"
                  style={{ height: "100px", width: "140px" }}
                  className="chooseGender"
                />
                <span className="genderLabel">Femei</span>
              </Link>
              <Link
                href="/brand?gender=men"
                className="items-center text-center msg">
                <img
                  src="men.svg"
                  style={{ height: "100px", width: "140px" }}
                  className="chooseGender"
                />
                <span className="genderLabel">Bărbați</span>
              </Link>
              <Link
                href="/brand?gender=kids"
                className="items-center text-center msg">
                <img
                  src="kids.svg"
                  style={{ height: "100px", width: "140px" }}
                  className="chooseGender"
                />
                <span className="genderLabel">Copii</span>
              </Link>
            </div>
          </div>
          <div className="lg:twoSec mt-10 lg:mt-0">
            <h1 className="secHead">Descrierea Articolului</h1>
            <img src="sttep1.svg" className="mt-8" />
            <br />
            <div className="p-5">
              <span className="stepSmall">Pasul 1</span>
              <p className="stepPara mt-4">
                Pentru a obține o ofertă pentru articolul dvs., indicați mai
                întâi dacă este pentru femei, bărbați sau copii.
              </p>
            </div>
            <div className="threeSec mt-5">
              <p>
                <b>
                  Cum putem distinge cel mai ușor îmbrăcămintea pentru femei de
                  cea pentru bărbați?
                </b>
                <br />
                Îmbrăcămintea pentru femei are de obicei o tăietură mai
                feminină, cu linii mai moi și forme care evidențiază talia și
                curbele corpului. În plus, în multe culturi, închiderea
                nasturilor pe cămășile, sacourile și paltoanele bărbătești este
                pe partea dreaptă, în timp ce pentru hainele de damă, nasturii
                sunt pe partea stângă.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
