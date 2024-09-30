// pages/index.tsx
"use client";
import React from 'react';
import Link from 'next/link';
import MemberTable from '../components/page/MemberTable'
import Header from '../components/Header'

const Home = () => {
  return (
    <div className="mt-12 min-h-screen bg-gray-100 flex items-center justify-center">
      <Header>
        {undefined}
      </Header>
      <MemberTable />
    </div>
  );
};

export default Home;
