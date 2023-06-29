"use client"
import Image from 'next/image'
import Link from 'next/link';
import { useState } from "react";
import { createClient } from '@supabase/supabase-js';
import { useRouter, useSearchParams } from 'next/navigation';
export default function Home() {
  const [categorys, setCategory] = useState<any[]>([]);
  const [subCategory, setSubCategory] = useState<any[]>([]);
  const supabaseUrl: any = 'https://pkrvehrepdgvyksotuyg.supabase.co'
  const supabaseKey: any = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrcnZlaHJlcGRndnlrc290dXlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc5NTQ4NTcsImV4cCI6MjAwMzUzMDg1N30.ZLsSjv5GYf82e2pLwOWrcbSH89jwuLedNdTEeqdQsKE"
  const supabase = createClient(supabaseUrl, supabaseKey);
  const router = useRouter();
  const searchParams = useSearchParams()

  const catm:any = searchParams.get('categories');
  async function getData() {
    const toS=catm.substring(0, catm.length - 1);
    const strArray:any = toS.split(",");
let intArray:any = [];
for(let i = 0; i < strArray.length; i++) {
    intArray[i] = parseInt(strArray[i]);
}
    const { data: category } = await supabase
      .from('category')
      .select().in('id', intArray);
      console.log(intArray);
    const amp: any = category;

    setCategory(amp);
  }
  async function getSubCategory(cat_id: any) {

    const { data: category } = await supabase
      .from('subcategory')
      .select().eq('catid', cat_id);
    const amp: any = category;

    setSubCategory(amp);
  }
  if (categorys.length == 0) {
    getData();
  }
  return (
    <main className="flex flex-col items-center justify-between">

      <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
      <div className="header flex items-center">
        <img src="logo.png" className='logo' />
        <div className="menu">
        <a href="/" className="pls menu-item active">Recieve an Offer</a>
          <a href="/parcels" className="menu-item hover:active">Your Parcels</a>
          <a href="#" className="menu-item">Back to the Store</a>

        </div>

      </div>
      <hr className="bline w-full" />
      <div className="w-full stepsContainer">
        <div className="grid grid-cols-2">
          <div>
            <h3 className="topH">Choose your Category</h3>
            <div className="flex gap-4 mt-5">
            {categorys?.map((category) => (
                <div key={category.id} className="items-center text-center">
                  <img src={category.cat_img} onClick={() => getSubCategory(category.id)} className='hov' />
                </div>   ))}
              
             </div>
            <br />
            <div  className="items-start text-left amp2" style={{width:"70%"}}>
             
              <h1 className="secHead2">Subcategories</h1>
              <ul>
              {subCategory?.map((subCat) => (
                <li key={subCat.id}><Link href={"/addtolist?gender="+encodeURIComponent(btoa(""+searchParams.get("gender")))+"&brand="+encodeURIComponent(btoa(""+searchParams.get("brand")))+"&categories="+encodeURIComponent(btoa(""+searchParams.get("categories")))+"&subcat="+encodeURIComponent(btoa(""+subCat.id))+"&estimate="+encodeURIComponent(btoa(""+subCat.estimation))+"&subcatname="+encodeURIComponent(btoa(""+subCat.subcat_name))} className='href'>
                  {subCat.subcat_name}</Link>
                </li>   ))}
              </ul>
              
              </div>
            <br />
            <img src="cat.png" className="genderPhoto" />
            
          </div>
          <div className="twoSec">
            <h1 className="secHead">Items Description</h1>
            <img src="step3.svg" className="mt-8" />
            <br />
            <div className="p-5">
              <span className="stepSmall">Step 3</span>
              <p className="stepPara mt-4">To get a quote for your item, Please choose the category of your article.</p>
            </div>
            <div className="threeSec mt-5">
            <p>Why is my Article Category Invalid?<br />I dont know which category my Article falls under.</p>
          </div>
          </div>
        
        </div>
      </div>
    </main>
  )
}
