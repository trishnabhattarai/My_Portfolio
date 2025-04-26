import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sun, Moon } from 'lucide-react';

interface NavigationProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeSection: string;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isOpen, setIsOpen, activeSection, isDarkMode, toggleTheme }) => {
  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-text p-2 focus:outline-none md:hidden"
            >
              <div className="w-6 h-0.5 bg-current mb-1.5" />
              <div className="w-6 h-0.5 bg-current mb-1.5" />
              <div className="w-6 h-0.5 bg-current" />
            </motion.button>

            <div className="hidden md:flex space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-lg transition-colors ${
                    activeSection === item.id ? 'text-primary' : 'text-secondary hover:text-text'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-secondary/10 hover:bg-secondary/20 transition-colors"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-text" />
              ) : (
                <Moon className="w-5 h-5 text-text" />
              )}
            </motion.button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full">
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-text p-2"
              >
                <X className="w-6 h-6" />
              </motion.button>

              <div className="flex flex-col space-y-8">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-2xl transition-colors ${
                      activeSection === item.id ? 'text-primary' : 'text-secondary hover:text-text'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;