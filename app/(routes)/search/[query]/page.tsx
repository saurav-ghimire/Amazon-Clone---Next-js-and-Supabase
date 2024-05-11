"use client"


import SearchResult from "@/app/components/SearchResult";
import { useSupabase } from "@/lib/hooks/useSupabase";
import { useParams } from "next/navigation";
import { useEffect } from "react";


function Search() {
  const {query} = useParams();
  const {getProducts, product, getFilteredProducts, filterProduct } = useSupabase();
  
  useEffect(() => {
    getFilteredProducts(query.toString());
  },[]);

  
  return ( 
    <div>
      <SearchResult />
    </div>
   );
}

export default Search;