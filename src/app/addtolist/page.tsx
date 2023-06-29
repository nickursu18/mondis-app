"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation';
export default function Home() {
  const searchParams = useSearchParams()
  const router = useRouter();
  
  const catm:any = searchParams.get('categories');
 
  const productS = {
    gender: atob(""+searchParams.get('gender')),
    brand: atob(""+searchParams.get('brand')),
    categories: atob(""+searchParams.get('categories')),
    subcat: atob(""+searchParams.get('subcat')),
    estimate: atob(""+searchParams.get('estimate')),
    subcatname: atob(""+searchParams.get('subcatname')),
    

  }
  function addToCart() {
    
    localStorage.setItem('items', localStorage.getItem('items')+","+JSON.stringify(productS));
    router.push("/addproducts");
  }
  //console.log(JSON.parse("["+localStorage.getItem('items')?.replace("null,","")+"]"));
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
            <h3 className="topH">Add to list</h3><br />
            <p className='stepPara2'>
            For the Product type 1 you will receive:
            </p>
            <h2 className="mt-2 bigBold">${productS.estimate}</h2>
            <br />
            <Link href="/addproducts" onClick={() => addToCart()} className='mbtn' style={{width: "30%"}}>Add to Sale</Link>
          </div>
          <div className="twoSec">
          <div className="items-start text-left amp2" style={{width:"100%"}}>
          <h1 className="secHead2">Items for Sale</h1>
          <br />
          <img src="plist.svg" />
          <br />
          <p>When will I recieve the money?<br />What is the approval criteria.</p>
          
          </div>
          </div>
        
        </div>
      </div>
    </main>
  )
}
