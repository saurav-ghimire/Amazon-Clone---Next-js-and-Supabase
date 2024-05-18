import Image from "next/image";
import Rating from "./Rating";
import AddToCart from "./AddtoCart";

function SingleProduct({ details }: { details: any }) {

  return (
    <div className="py-10 px-5 md:px-0">
      <div className="w-full md:w-[90%] m-auto flex flex-col md:flex-row md:gap-8">
        <div className="md:w-[35%] flex items-center justify-center bg-gray-100">
          <Image src={details?.image} height={400} width={250} alt={details?.title} className="mix-blend-multiply p-4" />
        </div>
        <div className="md:w-[50%] mt-4 md:mt-0">
          <h2 className="font-bold text-lg">{details?.title}</h2>
          <p className="mt-2 md:mt-4">{details?.description}</p>
          <Rating averageRating={details?.['rating/rate']} />
          <h2 className="font-bold text-2xl mt-2 md:mt-4">${details?.price}</h2>
        </div>
        <div className="w-full md:w-[15%] mt-4 md:mt-0">
          <AddToCart details={details} />
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
