import { ReactNode } from 'react';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';

export default function RootLayout({
                                     children,
                                   }: {
  children: ReactNode
}) {
  return (
    <div className='h-screen flex flex-col'>
      <Header />
      <main className='flex-1'>
        {children}
      </main>
      <Footer />
    </div>
  );
}