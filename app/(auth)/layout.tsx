import React from 'react'; 

interface PageLayoutProps {
    children: React.ReactNode;
    formType: 'login' | 'signup';
}

export default function PageLayout({ children, formType }: PageLayoutProps) {
    return (
        <main className='bg-[url(/bg-login.jpg)] bg-cover bg-center h-screen flex items-center justify-center'>
                {children}
        </main>
    );
}