import React, { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [activeMenu, setActiveMenu] = useState<string>('기관명1');

  const menuItems = ['기관명1', '기관명2', '기관명3', '기관명4', '기관명5'];

  return (
    <header className="bg-gradient-to-r from-white via-blue-100 to-blue-200 p-4 shadow-md fixed w-full top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href={'/'}>
          <div className="flex items-center space-x-4">
            <img src="/img/Logo.svg" alt="Logo" className="h-12" />
          </div>
        </Link>


        {/* Menu */}
        <nav className="flex space-x-8">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveMenu(item)}
              className={`text-lg font-semibold transition-colors duration-300 ${
                activeMenu === item ? 'text-orange-500' : 'text-black'
              } hover:text-orange-500`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="pt-24">{children}</main>
    </>
  );
}
