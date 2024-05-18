// components/Footer.js
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        {/* Top section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
          <div>
            <h5 className="font-bold mb-4">Get to Know Us</h5>
            <ul>
              <li className="mb-2"><Link href="#"  className="hover:underline">About Us</Link></li>
              <li className="mb-2"><Link href="#"  className="hover:underline">Careers</Link></li>
              <li className="mb-2"><Link href="#"  className="hover:underline">Press Releases</Link></li>
              <li className="mb-2"><Link href="#"  className="hover:underline">Amazon Cares</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4">Make Money with Us</h5>
            <ul>
              <li className="mb-2"><Link href="#"  className="hover:underline">Sell on Amazon</Link></li>
              <li className="mb-2"><Link href="#"  className="hover:underline">Sell Under Amazon Accelerator</Link></li>
              <li className="mb-2"><Link href="#"  className="hover:underline">Amazon Global Selling</Link></li>
              <li className="mb-2"><Link href="#"  className="hover:underline">Become an Affiliate</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4">Amazon Payment Products</h5>
            <ul>
              <li className="mb-2"><Link href="#"  className="hover:underline">Amazon Business Card</Link></li>
              <li className="mb-2"><Link href="#"  className="hover:underline">Shop with Points</Link></li>
              <li className="mb-2"><Link href="#"  className="hover:underline">Reload Your Balance</Link></li>
              <li className="mb-2"><Link href="#"  className="hover:underline">Amazon Currency Converter</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4">Let Us Help You</h5>
            <ul>
              <li className="mb-2"><Link href="#"  className="hover:underline">Amazon and COVID-19</Link></li>
              <li className="mb-2"><Link href="#"  className="hover:underline">Your Account</Link></li>
              <li className="mb-2"><Link href="#"  className="hover:underline">Your Orders</Link></li>
              <li className="mb-2"><Link href="#"  className="hover:underline">Shipping Rates & Policies</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4">Contact Us</h5>
            <ul>
              <li className="mb-2"><Link href="#"  className="hover:underline">Contact Us</Link></li>
              <li className="mb-2"><Link href="#"  className="hover:underline">FAQs</Link></li>
              <li className="mb-2"><Link href="#"  className="hover:underline">Help</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-gray-700 pt-6 text-center text-sm">
          <p className="mb-2">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
          <ul className="flex justify-center space-x-4">
            <li><Link href="#"  className="hover:underline">Privacy Notice</Link></li>
            <li><Link href="#"  className="hover:underline">Conditions of Use</Link></li>
            <li><Link href="#"  className="hover:underline">Cookies Notice</Link></li>
            <li><Link href="#"  className="hover:underline">Interest-Based Ads</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
