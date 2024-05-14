"use client"

import { useAppSelector } from "@/lib/hooks/redux";
import { useSupabase } from "@/lib/hooks/useSupabase";
import { supabase } from "@/lib/supabase/database";
import { getCart } from "@/store/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaLock } from "react-icons/fa";  
import { toast } from "react-toastify";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH!)

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

  
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  const handleFullNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
    
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleStateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const handleZipChange = (e: ChangeEvent<HTMLInputElement>) => {
    setZip(e.target.value);
  };

  const handleCountryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNoteChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
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

  const handleCheckout = () => {
    // Check if any field is empty
    if (!fullName || !address || !city || !state || !zip || !country || !phone || !email || !note) {
      // If any field is empty, toast the message
      if (!fullName) toast.error("Full Name cannot be empty");
      if (!address) toast.error("Address cannot be empty");
      if (!city) toast.error("City cannot be empty");
      if (!state) toast.error("State/Province cannot be empty");
      if (!zip) toast.error("ZIP/Postal Code cannot be empty");
      if (!country) toast.error("Country cannot be empty");
      if (!phone) toast.error("Phone Number cannot be empty");
      if (!email) toast.error("Email Address cannot be empty");
      return; // Exit function
    }

    const createStripeSession = async () => {
      const stripe = await stripePromise;
      const {data:{user}}= await supabase.auth.getUser();
      const checkoutSession = await axios.post("/api/checkout-sessions",{
        items:cartProducts,
        email:user?.email
      })
    }

    createStripeSession();

  }

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
              <label htmlFor="fullName" className="block font-medium mb-1">Full Name <span className="text-[#FF0000]">*</span></label>
              <input type="text"
              value={fullName} onChange={handleAddressChange} 
               id="fullName" name="fullName" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="address1" className="block font-medium mb-1">Address Line 1 <span className="text-[#FF0000]">*</span></label>
              <input
              value={address} onChange={handleFullNameChange} 
               type="text" id="address1" name="address1" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="city" className="block font-medium mb-1">City <span className="text-[#FF0000]">*</span></label>
              <input
              value={city} onChange={handleCityChange} 
               type="text" id="city" name="city" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="state" className="block font-medium mb-1">State/Province <span className="text-[#FF0000]">*</span></label>
              <input
              value={state} onChange={handleStateChange} 
               type="text" id="state" name="state" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="zip" className="block font-medium mb-1">ZIP/Postal Code <span className="text-[#FF0000]">*</span></label>
              <input
              value={zip} onChange={handleZipChange} 
               type="text" id="zip" name="zip" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="country" className="block font-medium mb-1">Country <span className="text-[#FF0000]">*</span></label>
              <input
              value={country} onChange={handleCountryChange}
               type="text" id="country" name="country" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="phone" className="block font-medium mb-1">Phone Number <span className="text-[#FF0000]">*</span></label>
              <input
              value={phone} onChange={handlePhoneChange}
               type="text" id="phone" name="phone" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="email" className="block font-medium mb-1">Email Address <span className="text-[#FF0000]">*</span></label>
              <input
              value={email} onChange={handleEmailChange}
               type="email" id="email" name="email" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="note" className="block font-medium mb-1">Note </label>
              <textarea
              value={note} onChange={handleNoteChange}
               id="note" name="note" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"></textarea>
              
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
          onClick={handleCheckout}
        className="mt-2 block bg-[#ffd814] hover:bg-[#ffe714e9] transition-all ease-in-out p-2 rounded-full w-[100%] text-sm font-bold">Pay Now</button>

        </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
