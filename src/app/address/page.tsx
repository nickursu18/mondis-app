"use client"
import Image from 'next/image'
import { useState } from "react";
import { createClient } from '@supabase/supabase-js';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
export default function Home() {
    const supabaseUrl: any = 'https://pkrvehrepdgvyksotuyg.supabase.co'
    const supabaseKey: any = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrcnZlaHJlcGRndnlrc290dXlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc5NTQ4NTcsImV4cCI6MjAwMzUzMDg1N30.ZLsSjv5GYf82e2pLwOWrcbSH89jwuLedNdTEeqdQsKE"
    const supabase = createClient(supabaseUrl, supabaseKey);
    const router = useRouter();
    const [nproduct,setnProduct] = useState(0);
    const [amtproduct,setAmtProduct] = useState(0);
    const a=100;
    const b=200;
    const searchParams = useSearchParams();
    let estimateTotal=0;
    let totProds=0;
    let addressData:any=[];
    let cartData:any=[];
    
    if(localStorage.getItem('address')) {
        cartData=JSON.parse("["+localStorage.getItem('items')?.replace("null,","")+"]");
    }
        if(localStorage.getItem('address')) {
        addressData=JSON.parse("["+localStorage.getItem('address')?.replace("null,","")+"]");
    }
    async function createOrder (address_data:any, cart_data:any) {
        const orderId = Math.random();
        const { data: brands } = await supabase
        .from('orders')
        .insert({ address_data: address_data,cart_data: cart_data,nproduct: totProds,amtproduct: estimateTotal,orderId:orderId });
        localStorage.removeItem("items");
        localStorage.setItem('orderId', localStorage.getItem('orderId')+","+orderId);
      
        
        router.push("/parcels");
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
                    <div className='items-start text-left'>
                        <h3 className="topH">Select an Address</h3><br />

                        <br />
                        <p>The courier will deliver the mondis bag to your address.</p>
                        {addressData?.map((addressItem: any, i: any) => (
                            <div key={i} className="threeSec9 items-start text-left msg" style={{ width: "100%" }}>
                            <div className='item' onClick={() => createOrder(addressItem, cartData)}>
                                <div className="flex">
                                    <img src="trashicon.svg" />
                                    <span className='prodname3  w-full'>{addressItem.street+", "+addressItem.city+", "+addressItem.country} </span>
                                </div>
                            </div>
                        </div>
                        ))}
                        
                        <Link className='mbtn mt-5' href="/addnewaddress">Add Address</Link>
                    </div>
                    <div className="twoSec">
          <div className="items-start text-left amp2" style={{width:"100%"}}>
          <h1 className="secHead2">Items for Sale</h1>
          <br />
          {cartData?.map((cartItem: any, i: any) => {totProds++;estimateTotal+=parseInt(cartItem.estimate);return (
            
            <div key={i} className='item'>
              <div className="flex">
              <img src="trashicon.svg" />
              <span className='prodname  w-full'>{cartItem.brand+" "+cartItem.subcatname} </span>
              <span className='prodname text-right items-right'>${cartItem.estimate} </span>
              </div>
            </div>
            )})}

         
          <br />
          <hr className='rline' />
          <br />
          <div className='item'>
            <div className="flex">
            <span className='prodname2  w-full text-lg'>You will recieve </span>
            <span className='prodnamen text-right items-right'>${estimateTotal} </span>
            </div>
          </div>

          <p className='text-md mt-10'>Sell easier, cheaper and with free shipping to Mondis!</p>
          <br />
          </div>
          </div>

                </div>
            </div>
        </main>
    )
}
