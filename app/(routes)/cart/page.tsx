import ShopingCart from "@/app/components/ShoppingCart";

function CartPage() {
  return ( 
    <div className="w-[80%] mx-auto mt-10">
      <h2  className="text-2xl font-extrabold
      ">Shopping Cart</h2>
      <div>
        <ShopingCart />
      </div>
    </div>
   );
}

export default CartPage;