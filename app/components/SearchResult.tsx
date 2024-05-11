import { useParams } from "next/navigation";
import ProductCart from "./ProductCard";



function SearchResult({data}:{data:any}) {
  const {query} = useParams();
  
  return ( <>
  <div className="w-[80%] m-auto">
      <div className="mt-10">
        <div>
          <h2 className="font-bold text-2xl">Results - {data.length} Products for {query}</h2>
          <p>Check each product page for other buying options.</p>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-4 md:gap-20 mt-10">
            {
              data.map((data:any) => (
                <div key={data.id}>
                    <ProductCart product={data} />
                </div>
              ))
            }
        </div>
      </div>
  </div>
  </> );
}

export default SearchResult;