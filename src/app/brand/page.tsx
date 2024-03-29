"use client";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [searchString, setSearchString] = useState("");
  const [brands, setBrands] = useState<any[]>([]);
  const supabaseUrl: any = "https://pkrvehrepdgvyksotuyg.supabase.co";
  const supabaseKey: any =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrcnZlaHJlcGRndnlrc290dXlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc5NTQ4NTcsImV4cCI6MjAwMzUzMDg1N30.ZLsSjv5GYf82e2pLwOWrcbSH89jwuLedNdTEeqdQsKE";
  const supabase = createClient(supabaseUrl, supabaseKey);
  const searchParams = useSearchParams();
  const search = searchParams.get("gender");

  async function getData() {
    const { data: brands } = await supabase
      .from("brands")
      .select()
      .eq("is_" + search, true);
    const amp: any = brands;
    setBrands(amp);
  }

  if (brands.length == 0) {
    getData();
  }

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
            <h3 className="topH">Alegeți marca</h3>
            <img src="brands.png" className="mt-10 w-full" />
            <br />
            <br />
            <input
              type="text"
              className="texts"
              onChange={(event) => {
                setSearchString(event.target.value);
              }}
              value={searchString}
              placeholder="Căutați marca"
            />
            <div className="lg:flex colmm2 mt-5">
              <div
                className="items-start text-left msg"
                style={{ width: "70%" }}>
                <h1 className="secHead2">Cele mai bune vânzări</h1>
                <ul>
                  {brands
                    ?.filter((brandn) =>
                      brandn.brand
                        .toLowerCase()
                        .includes(searchString.toLowerCase())
                    )
                    .map((brand: any, i: any) => (
                      <li
                        style={i > 10 ? { display: "none" } : {}}
                        key={brand.id}>
                        <Link
                          className="brandLink"
                          href={
                            "/category?gender=" +
                            search +
                            "&type=" +
                            encodeURIComponent(brand.type) +
                            "&brand=" +
                            encodeURIComponent(brand.brand) +
                            "&categories=" +
                            encodeURIComponent(brand.cat_id)
                          }>
                          {brand.brand}
                        </Link>
                      </li>
                    ))}
                  <li>..</li>
                </ul>
              </div>
              <div
                className="items-start text-left msg"
                style={{ width: "100%" }}>
                <div className="threeSec2 mt-5">
                  <h1 className="secHead3">
                    Acceptăm pentru vânzări peste 100 de mărci.
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:twoSec mt-10 lg:mt-0">
            <h1 className="secHead">Descrierea Articolului</h1>
            <img src="steep.svg" className="mt-8" />
            <br />
            <div className="p-5">
              <span className="stepSmall">Pasul 2</span>
              <p className="stepPara mt-4">
                Alegeți marca pentru a primi o estimare corectă.
              </p>
            </div>
            <div className="threeSec mt-5">
              <p>
                <b>Ce fac dacă nu găsesc marca produsului?</b>
                <br />
                Mondis la moment acceptă doar mărcile listate în rezultatele
                căutării. Ne puteți contacta la info@mondis.ro pentru informații
                adăugătoare.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
