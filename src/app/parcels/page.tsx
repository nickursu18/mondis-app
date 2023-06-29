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
    let orderData:any;
    if(localStorage.getItem('orderId')) {
     orderData=typeof window !== 'undefined' ? JSON.parse("["+localStorage.getItem('orderId')?.replace("null,","")+"]") : null;
    }
    const a=100;
    const b=200;
    const searchParams = useSearchParams();
  
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
                        <h3 className="topH"></h3><br />
                        {orderData?.map((orderItem: any, i: any) => {return (
            
            <div key={i} className='item2'>
              <div className="flex">
              <img src="orangetick.svg" />
              <span className='prodname w-full'>Order #{i+1} </span>
              <span className='prodname text-right items-right'><img src="waiting.svg" /></span>
              </div>
            </div>
            )})}
                        <br />
                    </div>
                    <div className="twoSec">
                    <img src="idd.svg" />
                </div>
            </div>
            </div>
        </main>
    )
}
