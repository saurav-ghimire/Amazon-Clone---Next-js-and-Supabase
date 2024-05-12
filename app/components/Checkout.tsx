"use client"
import { useAppSelector } from "@/lib/hooks/redux";
import { useSupabase } from "@/lib/hooks/useSupabase";
import { getCart } from "@/store/cartSlice";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaLock } from "react-icons/fa";  

type Product = {
  id: any;
  title: string;
  price: any;
  quantity: any;
  image: any;
};

type CartItem = {
  id: any;
  quantity: any;
};


function Checkout() {

  const fullnameRef = useRef<HTMLInputElement>(null);
  const [fullName, setFullName] = useState("");
  
  const handleFullNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const cartItems = useAppSelector(getCart);
  const { getProducts, product } = useSupabase();
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    const updateCartProducts = () => {
      if (product.length > 0 && cartItems.length > 0) {
        const matchedProducts = cartItems.map((cartItem: CartItem) => {
          const matchedProduct = product.find((p: Product) => p.id === cartItem.id);
          if (matchedProduct) {
            return {
              ...matchedProduct,
              quantity: cartItem.quantity
            };
          }
          return null;
        }).filter(Boolean) as Product[];
        setCartProducts(matchedProducts);
      }
    };

    updateCartProducts();
  }, [cartItems, product]);

  useEffect(() => {
    let total = 0;
    cartProducts.forEach(cartProduct => {
      total += cartProduct.price * cartProduct.quantity;
    });
    setSubtotal(total);
  }, [cartProducts]);


  return ( 
    <div className="w-[80%] m-auto">
      <div>
        <div className="py-10 flex justify-between items-center">
          <div className="mb-5">
            <Image src={'/amazon-logo.png'} height={100} width={100} alt="Amazon" />
          </div>
          <div>
            <h1 className="font-bold text-2xl">Checkout</h1>
          </div>
          <div>
            <FaLock className="text-gray-400 text-2xl" />
          </div>
        </div>
      </div>
      <div className="flex items-start justify-between">
        <div className="w-[70%]">
          <h2 className="font-bold text-lg mb-3">Delivery Address</h2>
          <hr />
          <div className="space-y-4 mt-4">
            <div>
              <label htmlFor="fullName" className="block font-medium mb-1">Full Name</label>
              <input type="text"
              ref={fullnameRef}
              value={fullName} onChange={handleFullNameChange} 
               id="fullName" name="fullName" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="address1" className="block font-medium mb-1">Address Line 1</label>
              <input type="text" id="address1" name="address1" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="address2" className="block font-medium mb-1">Address Line 2 (optional)</label>
              <input type="text" id="address2" name="address2" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="city" className="block font-medium mb-1">City</label>
              <input type="text" id="city" name="city" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="state" className="block font-medium mb-1">State/Province</label>
              <input type="text" id="state" name="state" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="zip" className="block font-medium mb-1">ZIP/Postal Code</label>
              <input type="text" id="zip" name="zip" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="country" className="block font-medium mb-1">Country</label>
              <input type="text" id="country" name="country" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="phone" className="block font-medium mb-1">Phone Number</label>
              <input type="text" id="phone" name="phone" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="email" className="block font-medium mb-1">Email Address</label>
              <input type="email" id="email" name="email" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="note" className="block font-medium mb-1">Note</label>
              <textarea id="note" name="note" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"></textarea>
              
            </div>
          </div>
          <div className="mt-2 p-3 bg-gray-100">
            <h2 className="font-bold text-lg mb-3">Items</h2>
            <hr className="mb-2" />
            {cartItems.length === 0 ? (
          <p>No products in cart</p>
        ) : (
          cartProducts.map((cartProduct: Product) => (
            <div key={cartProduct.id} className="border-b border-gray-200 pb-6 mb-4">
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 relative overflow-hidden">
                  <Image src={cartProduct.image} layout="fill" objectFit="contain" alt="cart Items" />
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-md">{cartProduct.title}</h2>
                  <p className="text-gray-600 mt-1">Quantity: {cartProduct.quantity} 
                  
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-lg font-semibold">${cartProduct.price * cartProduct.quantity}</p>
                  
                </div>
              </div>
            </div>
          ))
        )}
          </div>
        </div>
        <div className="w-[25%]">
        <h2 className="font-bold text-lg mb-3">Summary</h2>
          <hr className="mb-4" />
          <div className=" bg-gray-100 px-3 py-5 rounded-lg">
          {cartItems.length === 0 ? (
          <p>No products in cart</p>
        ) : (
          cartProducts.map((cartProduct: Product) => (
            <div key={cartProduct.id} className="border-b border-gray-200 pb-6 mb-4">
              <div className="flex gap-4 items-center">
                <div className="flex-1">
                  <h2 className="font-semibold text-sm">{cartProduct.title}</h2>
                  
                </div>
                <div className="flex flex-col items-end">
                <p className="text-gray-600 mt-1 text-sm">Quantity: {cartProduct.quantity}</p>
                  <p className="text-sm font-semibold">${cartProduct.price * cartProduct.quantity}</p>
                  
                </div>
              </div>
            </div>
          ))
        )}
          <h3 className="font-bold flex justify-between">Subtotal ({cartProducts.length} items): <span className="text-[#ffd814]">${subtotal.toFixed(2)}</span></h3>
          
          <button 
        
        className="mt-2 block bg-[#ffd814] hover:bg-[#ffe714e9] transition-all ease-in-out p-2 rounded-full w-[100%] text-sm font-bold">Pay Now</button>

        </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
