"use client"
import SingleProduct from "@/app/components/SingleProduct";
import { useSupabase } from "@/lib/hooks/useSupabase";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function ProductSinglePage() {
  const [loading, setLoading] = useState(true)
  const {id} = useParams();
  const {getSingleProduct, singleData} = useSupabase();
  useEffect(() => {
    setLoading(true); // Set loading to true when component mounts or when id changes
    getSingleProduct(Number(id))
      .then(() => setLoading(false)); // Set loading to false when data is fetched
  }, [id]);
  
  const isDataEmptyOrLoading = singleData.length === 0 || loading;

  
  return (
    <div>
      {
        isDataEmptyOrLoading !== true ? <SingleProduct details={singleData[0]} /> : "Loading"
      }
    </div>
   );
}

export default ProductSinglePage;