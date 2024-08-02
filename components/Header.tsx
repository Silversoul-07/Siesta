import React from 'react';
import Link from 'next/link';
// import { getSession } from '@/lib/actions';
import { Button, buttonVariants } from '@/components/ui/button';
import Image from 'next/image';
import { Input } from './ui/input';


const navItems = [
    { name: 'Explore', href: '/explore' },
    { name: 'Create', href: '/create' },

];

const userMenuItems = [
    { name: 'Profile', href: '/profile' },
    { name: 'Settings', href: '#' },
];

type HeaderProps = {
    variant?: 'landing' | null;
};

const Header: React.FC<HeaderProps> = async ({ variant = null }) => {
    let bg = 'bg-black'
    let searchVisible = true
    if (variant === 'landing') {
        bg = 'bg-transparent'
        searchVisible = false
    }
    const session = true;

    return (
        <header className={`sticky top-0 z-50 text-white py-3 border-b border-gray-400 ${bg}`}>
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo and Name */}
                <div className="flex items-center space-x-2">
                    <Image src="/favicon.ico" alt="Arcana" width={32} height={32} />
                    <a href="/" className="text-lg font-bold text-white">
                        Arcana
                    </a>
                    {/* Navigation Tabs */}
                    <nav className="hidden md:flex items-center pl-3">
                        {navItems.map((item) => (
                            <Link key={item.name} href={item.href} className={buttonVariants({ variant: "ghost", size: "sm" })}>{item.name}</Link>
                        ))}
                    </nav>
                </div>
                {/* Search Box */}
                {session && (<div className="relative flex-grow max-w-[500px] pr-10">
                    <form action={'/search'} method={'get3b'} className="flex items-center w-full">
                        {/* <MagnifyingGlassIcon className="absolute w-5 h-5 left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
                        <svg className='absolute w-5 h-5 left-3 top-1/2 transform -translate-y-1/2 text-gray-400' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                            <path fill="#616161" d="M34.6 28.1H38.6V45.1H34.6z" transform="rotate(-45.001 36.586 36.587)"></path><path fill="#616161" d="M20 4A16 16 0 1 0 20 36A16 16 0 1 0 20 4Z"></path><path fill="#37474F" d="M36.2 32.1H40.2V44.400000000000006H36.2z" transform="rotate(-45.001 38.24 38.24)"></path><path fill="#64B5F6" d="M20 7A13 13 0 1 0 20 33A13 13 0 1 0 20 7Z"></path><path fill="#BBDEFB" d="M26.9,14.2c-1.7-2-4.2-3.2-6.9-3.2s-5.2,1.2-6.9,3.2c-0.4,0.4-0.3,1.1,0.1,1.4c0.4,0.4,1.1,0.3,1.4-0.1C16,13.9,17.9,13,20,13s4,0.9,5.4,2.5c0.2,0.2,0.5,0.4,0.8,0.4c0.2,0,0.5-0.1,0.6-0.2C27.2,15.3,27.2,14.6,26.9,14.2z"></path >
                        </svg>
                        <Input
                            type="search"
                            placeholder="Search for anything..."
                            className="bg-gray-800 text-white pl-10 pr-4 py-2 w-full"
                            name='query'
                            disabled={false}
                        />
                    </form>
                </div>)}
                {/* Navigation Tabs and Session */}
                <div className="flex items-center space-x-4">
                    {session ? (
                        <div></div>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <Button variant="secondary" asChild size="sm">
                                <a href="/signup">Signup</a>
                            </Button>
                            <Button variant="secondary" asChild size="sm">
                                <a href="/login">Login</a>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>

    );
};

export default Header;