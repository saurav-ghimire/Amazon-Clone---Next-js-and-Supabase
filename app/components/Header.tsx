"use client"
import { useAppSelector } from "@/lib/hooks/redux";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { BiCart } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { getCart } from "@/store/cartSlice";
import { supabase } from "@/lib/supabase/database";

const secondMenu = ['All', 'womens clothing', 'electronics', 'jewelery', 'mens clothing'];

function Header() {
  const [query, setQuery] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleOnChange = (e: any) => {
    setQuery(e?.target.value);
  }

  const submitHandler = () => {
    router.push(`/search/${query}`);
  }

  useEffect(() => {
    const getUserData = async () => {
      const { data: user } = await supabase.auth.getUser();
      setUser(user);
    }
    getUserData();
  }, [])

  const cartItems = useAppSelector(getCart);

  return (
    <>
      <div className="bg-[#131921] text-white py-2">
        <div className="flex items-center justify-between w-[90%] mx-auto">
          <div className="w-24 md:w-[15%]">
            <Link href={'/'}>
              <Image alt="Logo" src={'/amazon-logo-2.webp'} width={150} height={150} className="w-full h-auto" />
            </Link>
          </div>
          <div className="hidden md:flex w-[60%] items-center">
            <input onChange={(e) => handleOnChange(e)} className="w-full p-2 rounded-l-md text-black outline-none" type="text" placeholder="Search Amazon" />
            <div className="bg-[#FEBD69] cursor-pointer p-2 rounded-r-md transition-all ease-linear hover:bg-[#eeaf5c]" onClick={() => submitHandler()}>
              <IoSearch size={24} className="text-black" />
            </div>
          </div>
          <div className="flex items-center justify-around w-[30%] md:w-[20%]">
            <div className="cursor-pointer">
              <h2 className="text-xs hover:underline">
                {
                  user && user.user?.identities[0]?.identity_data?.full_name ? user.user.identities[0].identity_data.full_name : <Link href={'/signin'}>SignIn</Link>
                }
              </h2>
              <h2 className="font-bold text-sm">Account & List</h2>
            </div>
            <div className="hidden md:block">
              <h2 className="text-xs">Return</h2>
              <h2 className="font-bold text-sm">& Orders</h2>
            </div>
            <div className="relative cursor-pointer">
              <p className="absolute top-0 right-0 bg-red-500 rounded-full text-xs px-1">{cartItems.length}</p>
              <Link href={'/cart'}>
                <div className="flex">
                  <BiCart size={"40px"} />
                  <h2 className="hidden md:block mt-4 font-bold">Cart</h2>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="px-2 md:hidden md:px-0 flex gap-2 justify-center mt-2">
          <input onChange={(e) => handleOnChange(e)} className="w-[90%] p-2 rounded-md text-black outline-none" type="text" placeholder="Search Amazon" />
          <div className="bg-[#FEBD69] cursor-pointer p-2 rounded-md transition-all ease-linear hover:bg-[#eeaf5c]" onClick={() => submitHandler()}>
            <IoSearch size={24} className="text-black" />
          </div>
        </div>
      </div>
      <div className="bg-[#232f3e] w-full text-white px-5 py-1 flex justify-between items-center">
        <div className="flex items-center">
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <RxHamburgerMenu size={24} />
          </button>
          <div className="hidden md:flex flex-wrap justify-start gap-2">
            {
              secondMenu.map((data, index) => (
                <Link key={index} href={`/search/${data}`} className="flex items-center gap-2 border border-transparent px-2 py-1 rounded-sm transition ease-in-out hover:border-white">
                    {data === 'All' ? <div className="hidden md:inline-block"><RxHamburgerMenu /></div> : ''}
                    {data}
                </Link>
              ))
            }
          </div>
        </div>
        <div>
          {
            user && user.user ? <Link
              onClick={async () => {
                const { error } = await supabase.auth.signOut();
                if (!error) {
                  setUser(null);
                }
              }}
              className="text-[#FEBD69] font-bold cursor-pointer" href={"/"}>Signout</Link> : ""
          }
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-[#232f3e] w-full text-white px-5 py-2">
          <div className="flex flex-wrap justify-start gap-2">
            {
              secondMenu.map((data, index) => (
                <Link key={index} href={`/search/${data}`} className="flex items-center gap-2 border border-transparent px-2 py-1 rounded-sm transition ease-in-out hover:border-white">
                  {data === 'All' ? <div className="hidden md:inline-block"><RxHamburgerMenu /></div> : ''}
                  {data}
                </Link>
              ))
            }
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
