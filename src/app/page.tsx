"use client";
import Image from 'next/image'
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">

      <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
      <div className="header flex items-center">
        <img src="logo.png" className='logo' />
        <div className="menu">
          <a href="#" className="pls menu-item active">Recieve an Offer</a>
          <a href="#" className="menu-item hover:active">Your Parcels</a>
          <a href="#" className="menu-item">Back to the Store</a>

        </div>

      </div>
      <hr className="bline w-full" />
      <div className="w-full stepsContainer">
        <div className="grid grid-cols-2">
          <div>
            <h3 className="topH">Choose Gender</h3>
            <img src="gender_img.png" className="genderPhoto" />
            <br /><br />
            <div className="flex colmm">
              <Link href="/brand" className="items-center text-center msg">
                <img src="women.svg" style={{ height: "100px", width: "140px" }} className="chooseGender" />
                <span className="genderLabel">Women</span>
              </Link>
              <Link href="/brand" className="items-center text-center msg">
                <img src="men.svg" style={{ height: "100px", width: "140px" }} className="chooseGender" />
                <span className="genderLabel">Men</span>
              </Link>
              <Link href="/brand" className="items-center text-center msg">
                <img src="kids.svg" style={{ height: "100px", width: "140px" }} className="chooseGender" />
                <span className="genderLabel">Kids</span>
              </Link>
            </div>
          </div>
          <div className="twoSec">
            <h1 className="secHead">Items Description</h1>
            <img src="steps.svg" className="mt-8" />
            <br />
            <div className="p-5">
              <span className="stepSmall">Step 1</span>
              <p className="stepPara mt-4">To get a quote for your item, first indicate whether it is women’s, men’s or children’s.</p>
            </div>
            <div className="threeSec mt-5">
            <p>How can we most easily distinguish
womenswear from menswear?</p>
          </div>
          </div>
        
        </div>
      </div>
    </main>
  )
}
