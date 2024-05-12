"use client"
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { useSupabase } from "@/lib/hooks/useSupabase";
import { decrementQuantity, getCart, incrementQuantity, removeFromCart } from "@/store/cartSlice";
import Image from "next/image";
import { toast } from "react-toastify";

// Define types for cart item and product
type CartItem = {
  id: any;
  quantity: any;
};

type Product = {
  id: any;
  title: string;
  price: any;
  quantity: any;
  image: any;
};

function ShopingCart() {
  const dispatch = useAppDispatch();
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

  const handleRemove = (id: any) => {
    dispatch(removeFromCart({ id: id }));
    toast.success("Removed from cart")
    setCartProducts(prevCartProducts => prevCartProducts.filter(product => product.id !== id));
  };

  const handleIncrement = (id: any) => {
    dispatch(incrementQuantity({ id: id }));
  };
  
  const handleDecrement = (id: any) => {
    dispatch(decrementQuantity({ id: id }));
  };
  
  return (
    <div className="flex gap-10 items-start">
      <div className="w-[77%] mt-4">
        {cartItems.length === 0 ? (
          <p>No products in cart</p>
        ) : (
          cartProducts.map((cartProduct: Product) => (
            <div key={cartProduct.id} className="border-b border-gray-200 pb-6 mb-4">
              <div className="flex gap-4 items-center">
                <div className="w-20 h-20 relative overflow-hidden">
                  <Image src={cartProduct.image} layout="fill" objectFit="contain" alt="cart Items" />
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">{cartProduct.title}</h2>
                  <p className="text-gray-600 mt-1">Quantity: 
                  <div className="flex items-center mt-1">
          <button
            onClick={() => handleDecrement(cartProduct.id)}
            className="px-3 py-1 bg-gray-200 rounded-md"
          >
            -
          </button>
          <span className="px-3 py-1 bg-gray-100 rounded-md">{cartProduct.quantity}</span>
          <button
            onClick={() => handleIncrement(cartProduct.id)}
            className="px-3 py-1 bg-gray-200 rounded-md"
          >
            +
          </button>
        </div>
                  </p>
                  <p className="text-yellow-600 text-sm mt-1">In Stock</p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-xl font-semibold">${cartProduct.price * cartProduct.quantity}</p>
                  <button
                    onClick={() => handleRemove(cartProduct.id)}
                    className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-semibold"
                  >
                    Remove
                  </button> 
                </div>
              </div>
            </div>
          ))
        )}
        
      </div>
      <div className="w-[23%] bg-gray-100 px-3 py-5 rounded-lg">
        <h3 className="font-bold">Subtotal ({cartProducts.length} items): ${subtotal.toFixed(2)}</h3>
        <button className="mt-2 block bg-[#ffd814] hover:bg-[#ffe714e9] transition-all ease-in-out p-2 rounded-full w-[100%] text-sm font-bold">Proceed to checkout</button>
      </div>
    </div>
  );
}

export default ShopingCart;
