import Image from 'next/image'
import Link from 'next/link';
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
            <h3 className="topH">Choose Your Brand</h3>
            <img src="brands.png" className="genderPhoto" />
            <br /><br />
            <input type="text" className='texts' placeholder='Search for your Item Brand' />
            <div className="flex colmm2 mt-5">
              <Link href="/category" className="items-start text-left msg" style={{width:"70%"}}>
              <h1 className="secHead2">Our Best Sellers</h1>
              <ul>
                <li>Tom Tailor</li>
                <li>Sneaker</li>
                <li>Levis</li>
                <li>Jack & Jones</li>
                <li>Zara Man</li>
              </ul>
              
              </Link>
              <div className="items-start text-left msg" style={{width:"100%"}}>
              <div className="threeSec2 mt-5">
              <h1 className="secHead3">We Accept for Sale</h1>
            <p style={{color: "#CD76BA"}}>Calvin Klein, Desigual, Guess, Jack & Jones, Tom Tailor, Zara and another 4000+ brands</p>
          </div>
              </div>
              
            </div>
          </div>
          <div className="twoSec">
            <h1 className="secHead">Items Description</h1>
            <img src="step2.svg" className="mt-8" />
            <br />
            <div className="p-5">
              <span className="stepSmall">Step 2</span>
              <p className="stepPara mt-4">To get a quote for your item, Please indicate the Brand of your Item.</p>
            </div>
            <div className="threeSec mt-5">
            <p>I cant find the brand of my Item</p>
            <p>How do I find out what the brand is?</p>
          </div>
          </div>
        
        </div>
      </div>
    </main>
  )
}
