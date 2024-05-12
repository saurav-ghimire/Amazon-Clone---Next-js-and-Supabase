"use client"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { addToCart } from "@/store/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { toast } from 'react-toastify';

function AddToCart({details}:{details:any}) {
  
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ id: details.id }));
    toast.success("Added to cart");
  };

  return ( 
    <div className="border border-gray-300 rounded-md h-fit">
        <div className="p-4 bg-white">
          <Image src={'/pay.png'} height={40} width={200} alt="Paynow" className="mb-2" />
            <h2 className="font-bold text-xl">${details?.price}</h2>
            <p className="text-[#565959] text-[12px] mt-1">Shipping & Import Charges to Canada are free</p>
            <p className="text-[#565959] text-[12px] mt-1">If you have any concern then please ready our <Link className="font-bold text-[#232f3e]" href="/">Delivery Policy</Link></p>
            
            <div className="flex flex-col gap-2 mt-3">
            <button onClick={handleAddToCart} className="block bg-[#ffd814] hover:bg-[#ffe714e9] transition-all ease-in-out p-2 rounded-full w-[100%] text-sm font-bold">Add to Cart</button>

            <button onClick={() => {
              router.push('/checkout')

            }} className="block bg-[#ffa41c] hover:bg-[#ffa41ce4] transition-all ease-in-out p-2 rounded-full w-[100%] text-sm font-bold">Buy Now</button>
            </div>
        </div>
    </div>
   );
}

export default AddToCart;