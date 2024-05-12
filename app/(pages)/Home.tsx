"use client"
import { useSupabase } from "@/lib/hooks/useSupabase";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import CategoryWiseProduct from "../components/CategoryWiseProduct";

function HomePage() {
  const {mensProduct, mens, womensProduct, womens} = useSupabase();
  useEffect(()=>{
    mensProduct();
    womensProduct();
  },[]);
  console.log(womens)
  
  return ( 
    <div>
      <div className="md:h-[400px] overflow-hidden">
        <Link href="/search/women"><Image src={'/Banner.jpg'} height={500} width={1000} className="w-[100%]" alt="Banner" /></Link>
      </div>
      <div className="w-[90%] mx-auto">
        <div className="py-10">
          <div>
                <h2 className="font-bold text-2xl">Men's Clothing</h2>
            </div>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-4 md:gap-20 mt-10">
            {mens.slice(0, 4).map((data:any, index:any) => (
              <div key={index}>
                <CategoryWiseProduct products={data} />
              </div>
            ))}
            </div>
        </div>

        <div className="py-10">
          <div>
                <h2 className="font-bold text-2xl">Women's Clothing</h2>
            </div>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-4 md:gap-20 mt-10">
                {womens.slice(0, 4).map((data:any, index:any)=>(
                  
                    <div key={index}>
                      <CategoryWiseProduct products={data} />
                    </div>
                  
                ))}
            </div>
        </div>
      </div>
    </div>
   );
}

export default HomePage;