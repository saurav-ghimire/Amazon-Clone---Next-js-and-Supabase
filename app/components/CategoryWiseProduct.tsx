import Image from "next/image";
import Rating from "./Rating";
import "./styles.css";
import Link from "next/link";


function CategoryWiseProduct({products}:{products:any}) {
  return ( 
    <div className="cursor-pointer productSection">
      <div className="relative bg-gray-100 h-[250px] flex items-center justify-center rounded-md overflow-hidden ">
        <div className="absolute inset-0 flex items-center justify-center">
        <Link href={`/product/${products.id}`}>
          <Image
            className="mix-blend-multiply p-4"
            layout="fill"
            objectFit="contain"
            src={products?.image}
            alt={products.title}
          />
          </Link>
          <button className="customAddToCart absolute z-10 block bg-[#ffd814] hover:bg-[#ffe714e9] transition-all ease-in-out p-2 px-5 rounded-full w-auto text-sm font-bold">Add to Cart</button>
        </div>
      </div>
      <div className="py-2">
      <Link href={`/product/${products.id}`}>
        <h2 className="font-bold truncate w-100">{products.title}</h2>
        <p>{products.description.substring(0, 40)}...</p>
        <div className="flex items-center gap-2">
        <Rating averageRating={products["rating/rate"]}  />
        <p className="text-[#007185]">{products['rating/count']} Rating</p>
        </div>
        <p className="font-bold text-2xl mt-2">${products.price}</p>
        </Link>
      </div>
    </div>
   );
}

export default CategoryWiseProduct;