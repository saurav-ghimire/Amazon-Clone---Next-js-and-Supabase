
import Image from "next/image";
import Rating from "./Rating";


function SingleProduct({details} : {details:any}) {
  
  return ( 
    <div className="w-[80%] m-auto mt-10 flex gap-10">
        <div className="md:w-[40%] flex items-center justify-center	bg-gray-100">
          <Image src={details?.image} height={400} width={250} alt={details?.title} className="mix-blend-multiply p-4" />
        </div>
        <div className="md:w-[60%]">
          <h2 className="font-bold text-lg">{details?.title}</h2>
          <p>{details?.description}</p>
          <Rating averageRating={details?.['rating/rate']} />
          <h2 className="font-bold text-2xl">${details?.price}</h2>
        </div>
    </div>
   );
}

export default SingleProduct;