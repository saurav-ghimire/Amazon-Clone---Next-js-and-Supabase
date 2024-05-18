import ShopingCart from "@/app/components/ShoppingCart";

function CartPage() {
  return ( 
    <div className="py-10 md:px-0 w-[80%] mx-auto">
      <h2  className="text-2xl font-extrabold
      ">Shopping Cart</h2>
      <div>
        <ShopingCart />
      </div>
    </div>
   );
}

export default CartPage;