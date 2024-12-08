// pages/index.tsx
"use client";
import React from 'react';
import Link from 'next/link';
import MemberTable from '../components/page/MemberTable'
import MemberPage from '../components/page/MemberPage'
import Header from '../components/Header'

const Home = () => {
  return (
    <div className="mt-12 min-h-screen bg-gray-100 flex items-center justify-center">
      <Header>
        {undefined}
      </Header>
      <MemberTable />
      {/* <MemberPage /> */}
    </div>
  );
};

export default Home;
