import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import { ThemeProvider } from './components/ThemeProvider';


function index() {
    return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 bg-red-100">
          <Header />
          <main>
            <Hero />
            <Features />
            <CallToAction />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    );
  }
  
  export default index;
