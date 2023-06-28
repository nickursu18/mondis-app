import Image from 'next/image'

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
          <div className='items-center text-center'>
           <center>
           <img src="addprods.svg" />
           </center>
            
            <br />
            <p className='amp2'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived.
            </p>
          
            <br />
            <div className="flex gap-5 text-center items-center">
              <button className='mbtn' style={{width:"48%"}}>Add More items</button>
              <button className='mbtn' style={{width:"48%"}}>Complete the Sale</button>
            </div>
          </div>
          <div className="twoSec">
          <div className="items-start text-left amp2" style={{width:"100%"}}>
          <h1 className="secHead2">Items for Sale</h1>
          <br />
          <div className='item'>
            <div className="flex">
            <img src="trashicon.svg" />
            <span className='prodname  w-full'>Zara X Collection Jacket </span>
            <span className='prodname text-right items-right'>$10.25 </span>
            </div>
          </div>

          <div className='item'>
            <div className="flex">
            <img src="trashicon.svg" />
            <span className='prodname  w-full'>Zara X Collection Jacket </span>
            <span className='prodname text-right items-right'>$10.25 </span>
            </div>
          </div>

          <div className='item'>
            <div className="flex">
            <img src="trashicon.svg" />
            <span className='prodname  w-full'>Zara X Collection Jacket </span>
            <span className='prodname text-right items-right'>$10.25 </span>
            </div>
          </div>
          <br />
          <hr className='rline' />
          <br />
          <div className='item'>
            <div className="flex">
            <span className='prodname2  w-full text-lg'>You will recieve </span>
            <span className='prodnamen text-right items-right'>$25.12 </span>
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
