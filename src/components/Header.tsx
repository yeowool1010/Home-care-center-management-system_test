import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Center } from '@/types/center';

const Header = () => {
  const [activeMenu, setActiveMenu] = useState<string>('기관명1');
 
  const [menuItems, serMenuItems] = useState<Center[]>([]);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const res = await fetch('/api/center');
        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }
        const data: Center[] = await res.json();
        serMenuItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    };

    fetchCenters();
  }, []);

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
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              href={{
                pathname: `/`,
                query: {
                  center: `${item.center_code}`
                }
              }}
              passHref
            >
              <button
                onClick={() => setActiveMenu(item.name)}
                className={`text-lg font-semibold transition-colors duration-300 ${
                  activeMenu === item.name ? 'text-orange-500' : 'text-black'
                } hover:text-orange-500`}
              >
                {item.name}
              </button>
            </Link>
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
