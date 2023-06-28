import Image from 'next/image'
import Link from 'next/link'
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
            <h3 className="topH">Choose your Category</h3>
            <div className="flex gap-4 mt-5">
              <div className="items-center text-center">
                <img src="coat.svg" className='hov' />
              </div>
              <div className="items-center text-center">
                <img src="footwear.svg" className='hov' />
              </div>
              <div className="items-center text-center">
                <img src="bag.svg" className='hov'/>
              </div>
              <div className="items-center text-center">
                <img src="accessory.svg" className='hov' />
              </div>
             </div>
            <br />
            <div  className="items-start text-left amp2 hov" style={{width:"70%"}}>
             <Link href="/addtolist">
              <h1 className="secHead2">Subcategories</h1>
              <ul>
                <li>Sub 1</li>
                <li>Sub 2</li>
                <li>Sub 3</li>
                <li>Sub 4</li>
                <li>Sub 5</li>
              </ul>
              </Link>
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
            <p>Why is my Article Category Invalid?<br />I don't know which category my Article falls under.</p>
          </div>
          </div>
        
        </div>
      </div>
    </main>
  )
}
