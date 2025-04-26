import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Menu, X, Instagram, Twitter, Facebook } from 'lucide-react';
import Header from './components/Header';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import ChatBot from './components/ChatBot';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('light-mode');
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-12 h-12 bg-primary"
        />
      </div>
    );
  }

  return (
    <div className="bg-background text-text min-h-screen">
      <Navigation 
        isOpen={isMenuOpen} 
        setIsOpen={setIsMenuOpen} 
        activeSection={activeSection}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      
      <main className="relative">
        <Header setActiveSection={setActiveSection} />
        <About setActiveSection={setActiveSection} />
        <Portfolio setActiveSection={setActiveSection} />
        <Blog setActiveSection={setActiveSection} />
        <Contact setActiveSection={setActiveSection} />
      </main>

      <footer className="bg-background/90 backdrop-blur-sm py-6 mt-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary mb-4 md:mb-0">© 2024 Trishna Bhattarai. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="https://github.com/trishnabhattarai" target="_blank" rel="noopener noreferrer" 
               className="text-secondary hover:text-primary transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/trishna-bhattarai/" target="_blank" rel="noopener noreferrer"
               className="text-secondary hover:text-primary transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:trishnabhattarai36@gmail.com"
               className="text-secondary hover:text-primary transition-colors">
              <Mail className="w-6 h-6" />
            </a>
            <a href="https://www.instagram.com/bhattarai.trishna24680/" target="_blank" rel="noopener noreferrer"
               className="text-secondary hover:text-primary transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="https://x.com/TrishnaBha25131" target="_blank" rel="noopener noreferrer"
               className="text-secondary hover:text-primary transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="https://www.facebook.com/trishna.bhattarai.3" target="_blank" rel="noopener noreferrer"
               className="text-secondary hover:text-primary transition-colors">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="https://www.fiverr.com/trishnabhattara/buying?source=avatar_menu_profile" target="_blank" rel="noopener noreferrer"
               className="text-secondary hover:text-primary transition-colors">
              <svg 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-6 h-6"
              >
                <path d="M23 9.71V9h-3.79c-.43 0-.79-.36-.79-.79V4.5h-.71v3.71c0 .83.67 1.5 1.5 1.5h2.29v6.71c0 1.93-1.57 3.5-3.5 3.5h-2v.71h2c2.32 0 4.21-1.89 4.21-4.21V9.71H23zM16.5 4.5h-2.79c-.43 0-.79-.36-.79-.79V0h-.71v3.71c0 .83.67 1.5 1.5 1.5h2.29v6.71c0 1.93-1.57 3.5-3.5 3.5h-2v.71h2c2.32 0 4.21-1.89 4.21-4.21V4.5H16.5zM8.5 0h-2C4.01 0 2 2.01 2 4.5v11.79C2 18.99 4.01 21 6.5 21h2v-.71h-2c-2.07 0-3.75-1.68-3.75-3.75V4.5c0-2.07 1.68-3.75 3.75-3.75h2V0z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
}

export default App;