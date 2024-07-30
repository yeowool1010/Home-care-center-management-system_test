// pages/index.tsx
"use client";
import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg text-center mb-6">
        <h1 className="text-4xl font-bold mb-2">지지그린 ASP 업무</h1>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        {/* <div className="mb-8">
          <img src="/path-to-your-image.png" alt="Main Logo" className="w-32 h-32" />
        </div> */}
        <div className="space-y-4">
          <Link href="/login-nursing-home">
            <div className="w-64 p-4 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition cursor-pointer m-3">요양원</div>
          </Link>
          <Link href="/login">
            <div className="w-64 p-4 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition cursor-pointer m-3">주야간보호</div>
          </Link>
          <Link href="/login-short-term-care">
            <div className="w-64 p-4 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition cursor-pointer m-3">단기보호</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
