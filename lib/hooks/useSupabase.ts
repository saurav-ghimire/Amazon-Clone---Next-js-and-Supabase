import { useState } from "react";
import { supabase } from "../supabase/database";

export const useSupabase =  () => {
  
  const [product, setProducts] = useState<any>([]);
  const [filterProduct, setFilterProduct] = useState<any>([]);

  const getProducts = async () => {
    let { data, error } = await supabase
      .from('Products')
      .select('*')
      if(data){
        setProducts(<any>data)
      }
        if(error){
          console.log(error)
        }
      }

      const getFilteredProducts = async (query:string) => {
        let { data, error } = await supabase.from('Products').select('*').or(`title.ilike.%${query}%, description.ilike.%${query}%, category.ilike.%${query}%` )

          if(data){
            setFilterProduct(data)
          }
            if(error){
              console.log(error)
            }
          }

    return {getProducts, product, filterProduct, getFilteredProducts}
}