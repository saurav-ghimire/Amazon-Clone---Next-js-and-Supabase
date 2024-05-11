import Image from "next/image";
import Rating from "./Rating";

function ProductCart({ product }: { product: any }) {

  return (
    <div className="cursor-pointer">
      <div className="relative bg-gray-100 h-[250px] flex items-center justify-center rounded-md overflow-hidden ">
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            className="mix-blend-multiply p-4"
            layout="fill"
            objectFit="contain"
            src={product?.image}
            alt={product.title}
          />
        </div>
      </div>
      <div className="py-2">
        <h2 className="font-bold truncate w-100">{product.title}</h2>
        <p>{product.description.substring(0, 40)}...</p>
        <div className="flex items-center gap-2">
        <Rating averageRating={product["rating/rate"]}  />
        <p className="text-[#007185]">{product['rating/count']} Rating</p>
        </div>
        <p className="font-bold text-2xl mt-2">${product.price}</p>
      </div>
    </div>
  );
}

export default ProductCart;
