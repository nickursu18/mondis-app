"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter, useSearchParams } from "next/navigation";
export default function Home() {
  const [categorys, setCategory] = useState<any[]>([]);
  const [searchString, setSearchString] = useState("");
  const [subCategory, setSubCategory] = useState<any[]>([]);
  const supabaseUrl: any = "https://pkrvehrepdgvyksotuyg.supabase.co";
  const supabaseKey: any =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrcnZlaHJlcGRndnlrc290dXlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc5NTQ4NTcsImV4cCI6MjAwMzUzMDg1N30.ZLsSjv5GYf82e2pLwOWrcbSH89jwuLedNdTEeqdQsKE";
  const supabase = createClient(supabaseUrl, supabaseKey);
  const router = useRouter();
  const searchParams = useSearchParams();
  let estim = 0;
  const catm: any = searchParams.get("categories");
  async function getData() {
    const toS = catm.substring(0, catm.length - 1);
    const strArray: any = toS.split(",");
    let intArray: any = [];
    for (let i = 0; i < strArray.length; i++) {
      intArray[i] = parseInt(strArray[i]);
    }
    const { data: category } = await supabase
      .from("category")
      .select()
      .in("id", intArray);
    console.log(intArray);
    const amp: any = category;

    setCategory(amp);
  }
  async function getSubCategory() {
    const { data: category } = await supabase.from("subcategory").select();
    const amp: any = category;

    setSubCategory(amp);
  }
  getSubCategory();
  
  if (categorys.length == 0) {
    getData();
  }
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
        <div className="lg:grid grid-cols-2 lg:gap-10">
          <div className="space-y-4">
            <h3 className="topH">Alege Categoria</h3>

            <input
              type="text"
              className="texts"
              onChange={(event) => {
                setSearchString(event.target.value);
                console.log(searchString);
              }}
              value={searchString}
              placeholder="Căutați marca"
            />
            <div
              className="items-start text-left amp2"
              style={{ width: "70%" }}
            >
              <h1 className="secHead2">Subcategoria</h1>
              <ul>
                {subCategory
                  ?.filter((subCategoryItem) =>
                    subCategoryItem.subcat_name
                      .toLowerCase()
                      .includes(searchString.toLowerCase())
                  )
                  ?.slice(0, 10)
                  .map((subCat) => {
                    if (searchParams.get("type") == "Luxury") {
                      estim = subCat.luxury_cost;
                    } else if (searchParams.get("type") == "Premium") {
                      estim = subCat.premium_cost;
                    } else if (searchParams.get("type") == "Medium") {
                      estim = subCat.medium_cost;
                    } else if (searchParams.get("type") == "Budget") {
                      estim = subCat.budget_cost;
                    }
                    return (
                      <li key={subCat.id}>
                        <Link
                          href={
                            "/addtolist?gender=" +
                            encodeURIComponent(
                              btoa("" + searchParams.get("gender"))
                            ) +
                            "&brand=" +
                            encodeURIComponent(
                              btoa("" + searchParams.get("brand"))
                            ) +
                            "&categories=" +
                            encodeURIComponent(
                              btoa("" + searchParams.get("categories"))
                            ) +
                            "&subcat=" +
                            encodeURIComponent(btoa("" + subCat.id)) +
                            "&estimate=" +
                            encodeURIComponent(btoa("" + estim)) +
                            "&subcatname=" +
                            encodeURIComponent(btoa("" + subCat.subcat_name))
                          }
                          className="href"
                        >
                          {subCat.subcat_name}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <br />
            <img src="cat.png" className="genderPhoto" />
          </div>
          <div className="lg:twoSec mt-10 lg:mt-0">
            <h1 className="secHead">Descrierea Articolului</h1>
            <img src="apap.svg" className="mt-8" />
            <br />
            <div className="p-5">
              <span className="stepSmall">Pasul 3</span>
              <p className="stepPara mt-4">Alege categoria și subcategoria</p>
            </div>
            <div className="threeSec mt-5">
              <p>
                <b>
                  Nu știu din ce categorie face parte produsul pe care îl am?
                </b>
                <br />
                Dacă nu știți din ce categorie face parte obiectul
                dumneavoastră, puteți încerca următoarele: examinați-l pentru a
                identifica caracteristicile principale, comparați-l cu
                categoriile comune de îmbrăcăminte și accesorii și luați în
                considerare scopul și modul în care este purtat. Dacă tot nu
                sunteți sigur, puteți încerca să căutați online folosind cuvinte
                cheie legate de aspectul sau funcția obiectului pentru a găsi
                articole similare în diferite categorii și a face o presupunere
                educată.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
