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
          <a href="/" className="pls menu-item active">Primiți o ofertă</a>
          <a href="/parcels" className="menu-item hover:active">vânzările Dvs.</a>
          <a href="#" className="menu-item">Înapoi spre magazin</a>

        </div>

      </div>
      <hr className="bline w-full" />
      <div className="w-full stepsContainer">
        <div className="grid grid-cols-2">
          <div>
            <h3 className="topH">Adaugă în listă</h3><br />
            <p className='stepPara2'>
            Pentru produsul din categoria x,y,z :
            </p>
            <h2 className="mt-2 bigBold">{productS.estimate} lei</h2>
            <br />
            <Link href="/addproducts" onClick={() => addToCart()} className='mbtn' style={{width: "30%"}}>Add to Sale</Link>
          </div>
          <div className="twoSec">
          <div className="items-start text-left amp2" style={{width:"100%"}}>
          <h1 className="secHead2">Produse de vânzare</h1>
          <br />
          <img src="plist.svg" />
          <br />
          <p>Cum îmi voi primi banii?<br />Care sunt criteriile de aprobare?</p>
          
          </div>
          </div>
        
        </div>
      </div>
    </main>
  )
}
