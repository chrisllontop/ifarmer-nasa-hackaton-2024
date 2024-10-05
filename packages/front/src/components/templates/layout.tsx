import React from 'react';
import Navbar from '../molecules/Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
      <Navbar />
    </div>
  );
};

export default Layout;
