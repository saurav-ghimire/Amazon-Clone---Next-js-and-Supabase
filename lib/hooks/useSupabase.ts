import { useState } from "react";
import { supabase } from "../supabase/database";

export const useSupabase =  () => {
  
  const [product, setProducts] = useState<any>([]);
  const [filterProduct, setFilterProduct] = useState<any>([]);
  const [singleData, setSingleData] = useState<any>([]);
  const [mens, setMens] = useState<any>([]);
  const [womens, setWomens] = useState<any>([]);

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

          const getSingleProduct = async (id:Number) => {
            let { data, error } = await supabase.from('Products').select('*').eq('id',id)
    
              if(data){
                setSingleData(data)
              }
                if(error){
                  console.log(error)
                }
              }
        
          const mensProduct = async () => {
            let { data, error } = await supabase.from('Products').select('*').ilike('category',`men's clothing`)
              if(data){
                setMens(data)
              }
                if(error){
                  console.log(error)
                }
              }

        const womensProduct = async () => {
          let { data, error } = await supabase.from('Products').select('*').ilike('category',`women's clothing`)
            if(data){
              setWomens(data)
            }
              if(error){
                console.log(error)
              }
            }

    return {
      getProducts,
      product,
      filterProduct,
      getFilteredProducts,
      getSingleProduct,
      singleData,
      mensProduct,
      mens,
      womensProduct,
      womens
    }
}