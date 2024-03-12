import  Navbar  from "./NavBar";
import React, { ReactNode } from 'react';
import  "./Layout.css"


type LayoutProps = {
    children: ReactNode;
  };

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container">
        {children}
      </main>
    </div>
  );
}