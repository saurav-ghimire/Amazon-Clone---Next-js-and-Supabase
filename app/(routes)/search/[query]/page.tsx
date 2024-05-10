"use client"


import { useSupabase } from "@/lib/hooks/useSupabase";
import { useParams } from "next/navigation";
import { useEffect } from "react";


function Search() {
  const {query} = useParams();
  const {getProducts, product, getFilteredProducts, filterProduct } = useSupabase();
  let q = query as string;
  useEffect(() => {
    getFilteredProducts(q);
  },[]);
  
  console.log(filterProduct)
  
  return ( 
    <div>
      {query}
    </div>
   );
}

export default Search;