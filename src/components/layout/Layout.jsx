import React from 'react';
import Header from '../nav/Header';
import Footer from '../nav/Footer';
import Banner from '../nav/Banner';

const Layout = ({ children }) => {
  return (
    <div className='w-full'>
      <Banner />
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
