import About from '@/components/about/about';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import { verifySession } from '@/helpers/verifySession';
import React from 'react';

const AboutPage = async () => {
    const session = await verifySession();
  
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <div className="relative">
        <About />
        <div className="absolute top-0 left-0 w-full">
          <Header isAuth={session.isAuth} />
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default AboutPage;
