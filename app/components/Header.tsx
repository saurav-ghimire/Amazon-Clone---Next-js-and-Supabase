import Image from "next/image";
import { BiCart } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";


function Header() {
  return ( 
    <div className="bg-[#131921] text-white py-2">
      <div className="flex items-center justify-between w-[90%] m-auto">
        <div className="w-[15%]">
          <Image alt="Logo" src={'/amazon-logo-2.webp'} width={150} height={150} />
        </div>
        <div className="w-[60%] flex items-center">
          <input className="w-full p-2 rounded-l-md text-black outline-none" type="text" placeholder="Search Amazon" />
          <div className="bg-[#FEBD69] p-2 rounded-r-md">
            <IoSearch size={24} className="text-black" />
          </div>
        </div>
        <div className="flex items-center justify-around w-[20%]">
            <div className="cursor-pointer">
              <h2 className="text-xs">Hello, Saurav</h2>
              <h2 className="font-bold text-sm">Account & List</h2>
            </div>
            <div>
              <h2 className="text-xs">Return</h2>
              <h2 className="font-bold text-sm">& Orders</h2>
            </div>
            <div className="cursor-pointer">
              <p className="relative top-3 left-5">0</p>
              <div className="flex">
                <div>
                  <BiCart size={"40px"} />
                </div>
                <h2 className="mt-4 font-bold	">Cart</h2>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Header;