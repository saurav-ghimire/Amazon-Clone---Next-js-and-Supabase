"use client"
import SingleProduct from "@/app/components/SingleProduct";
import { useSupabase } from "@/lib/hooks/useSupabase";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function ProductSinglePage() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { getSingleProduct, singleData } = useSupabase();

  useEffect(() => {
    setLoading(true);
    getSingleProduct(Number(id))
      .then(() => setLoading(false));
  }, [id]);

  const isDataEmptyOrLoading = singleData.length === 0 || loading;

  return (
    <div>
      {isDataEmptyOrLoading ? (
        <div>Loading ...</div>
      ) : (
        <div>
          <SingleProduct details={singleData[0]} />
        </div>
      )}
    </div>
  );
}

export default ProductSinglePage;
