import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black w-full h-[45px] flex justify-center items-center lg:px-5 border-t border-gray-400 space-x-2">
    <Link href={"/"} className="lg:pl-8 text-xl font-normal capitalize text-white">arcana</Link>
    <p className="pt-1 text-sm text-gray-500 capitalize">
      copyright &copy;2024 <span className='hidden lg:inline'>| All rights reserved</span>
    </p>
  </footer>
  );
};

export default Footer;
