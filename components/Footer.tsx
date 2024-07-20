import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black w-full h-[45px] bottom-0 left-0 right-0 flex justify-center items-center px-5 border-t border-gray-400 space-x-4">
      <h3 className="pl-8 sm:pl-0 text-2xl font-normal capitalize">arcana</h3>
      <p className="pt-1 text-sm text-gray-500 capitalize">
        copyright &copy;2024 All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
