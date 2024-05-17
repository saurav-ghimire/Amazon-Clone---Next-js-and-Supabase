'use client'
// pages/success.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Optional: Add any additional logic you want to execute when the page loads
  }, []);

  const handleContinueShopping = () => {
    router.push('/'); // Redirect to the homepage or any other page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12">
      <div className="bg-white p-8 rounded-md shadow-md text-center">
        <div className="mb-4 flex justify-center">
          <svg
            height="100px"
            width="100px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 17.837 17.837"
            xmlSpace="preserve"
            fill="#00ff2a"
            stroke="#00ff2a"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <path
                  style={{ fill: '#00ff2a' }}
                  d="M16.145,2.571c-0.272-0.273-0.718-0.273-0.99,0L6.92,10.804l-4.241-4.27
                  c-0.272-0.274-0.715-0.274-0.989,0L0.204,8.019c-0.272,0.271-0.272,0.717,0,0.99l6.217,6.258c0.272,0.271,0.715,0.271,0.99,0
                  L17.63,5.047c0.276-0.273,0.276-0.72,0-0.994L16.145,2.571z"
                ></path>
              </g>
            </g>
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-4">Thank You for Your Purchase!</h1>
        <p className="text-gray-700 mb-6">Your order has been successfully placed.</p>
        <button
          onClick={handleContinueShopping}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
