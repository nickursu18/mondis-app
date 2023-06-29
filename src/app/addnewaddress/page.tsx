"use client"
import Image from 'next/image'
import {useState} from "react";
import Link from "next/link";

export default function Home() {
    let estimateTotal=0;
    const cartData=typeof window !== 'undefined' ? JSON.parse("["+localStorage.getItem('items')?.replace("null,","")+"]") : null;
    const [name,setName] = useState("")
    const [familyName,setFamilyName] = useState("")
    const [phone,setPhone] = useState("")
    const [country,setCountry] = useState("")
    const [city,setCity] = useState("")
    const [street,setStreet] = useState("")
    const [postalCode,setPostalCode] = useState("")
    const [additional,setAdditional] = useState("")
    const addressS = {
        name: name,
        familyName: familyName,
        phone: phone,
        country: country,
        city: city,
        street: street,
        postalCode: postalCode,
        additional: additional,
        
    
      }
      function addAddress() {
        
        localStorage.setItem('address', localStorage.getItem('address')+","+JSON.stringify(addressS));
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
                        <h3 className="topH">Add new Address</h3><br />

                        <br /><p className='labl2'>Consignee</p><br />
                        <div className='flex cols-2 gap-5 w-full'>
                            <div>
                                <b className='labl'>Name</b>
                                <br />
                                <input type="text" value={name} onChange={(event) => { setName(event.target.value);}} className='texts' style={{width: "100%"}} placeholder='' />
            
                            </div>
                            <div>
                                <b className='labl'>Family Name</b>
                                <br />
                                <input type="text" value={familyName} onChange={(event) => { setFamilyName(event.target.value);}} className='texts' style={{width: "100%"}} placeholder='' />
            
                            </div>
                        </div>
                        <div className='flex cols-2 gap-5 w-full'>
                            <div>
                                <b className='labl'>Phone</b>
                                <br />
                                <input type="text" value={phone} onChange={(event) => { setPhone(event.target.value);}} className='texts' style={{width: "100%"}} placeholder='' />
            
                            </div>
                            
                        </div>
                        <br /><p className='labl2'>Address</p><br />
                        <div className='flex cols-2 gap-5 w-full'>
                            <div>
                                <b className='labl'>Country</b>
                                <br />
                                <input type="text" value={country} onChange={(event) => { setCountry(event.target.value);}} className='texts' style={{width: "100%"}} placeholder='' />
            
                            </div>
                            <div>
                                <b className='labl'>City</b>
                                <br />
                                <input type="text" value={city} onChange={(event) => { setCity(event.target.value);}} className='texts' style={{width: "100%"}} placeholder='' />
            
                            </div>
                        </div>
                        <div className='flex cols-2 gap-5 w-full'>
                            <div>
                                <b className='labl'>Street</b>
                                <br />
                                <input type="text" value={street} onChange={(event) => { setStreet(event.target.value);}} className='texts' style={{width: "100%"}} placeholder='' />
            
                            </div>
                            <div>
                                <b className='labl'>Postal code</b>
                                <br />
                                <input type="text" value={postalCode} onChange={(event) => { setPostalCode(event.target.value);}} className='texts' style={{width: "100%"}} placeholder='' />
            
                            </div>
                        </div>
                        <div>
                                <b className='labl'>Additional</b>
                                <br />
                                <textarea rows={5} value={additional} onChange={(event) => { setAdditional(event.target.value);}} className='texts' style={{width: "100%"}} placeholder=''></textarea>
            
                            </div>
                        <Link href="/address" onClick={() => addAddress()} className='mbtn mt-5'>Add Address</Link>
                    </div>
                    <div className="twoSec">
          <div className="items-start text-left amp2" style={{width:"100%"}}>
          <h1 className="secHead2">Items for Sale</h1>
          <br />
          {cartData?.map((cartItem: any, i: any) => {estimateTotal+=parseInt(cartItem.estimate);return (
            
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
