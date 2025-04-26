import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import gsap from 'gsap';

interface HeaderProps {
  setActiveSection: (section: string) => void;
}

const titles = ['AI Engineer', 'Web Developer', 'Java Developer'];

const Header: React.FC<HeaderProps> = ({ setActiveSection }) => {
  const titleRef = useRef<HTMLSpanElement>(null);
  const electricityRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const titleElement = titleRef.current;
    if (!titleElement) return;

    let currentIndex = 0;

    const updateTitle = () => {
      gsap.to(titleElement, {
        duration: 0.5,
        opacity: 0,
        y: -20,
        onComplete: () => {
          currentIndex = (currentIndex + 1) % titles.length;
          titleElement.textContent = titles[currentIndex];
          gsap.to(titleElement, {
            duration: 0.5,
            opacity: 1,
            y: 0,
          });
        },
      });
    };

    const interval = setInterval(updateTitle, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!electricityRef.current) return;

    gsap.to(electricityRef.current, {
      strokeDashoffset: 0,
      duration: 2,
      repeat: -1,
      ease: 'none',
    });
  }, []);

  const handleDownloadCV = () => {
    window.open(
      'https://drive.google.com/file/d/1BLxbrNquDt7NjSeEKklKTAXsa1O_W8rw/view?usp=sharing',
      '_blank'
    );
  };

  return (
    <motion.section
  id="home"
  className="relative h-screen flex items-center bg-background"
  onViewportEnter={() => setActiveSection('home')}
>

      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="electricity" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 20 -10"
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="displace">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center md:flex-row md:items-start md:justify-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-40 h-40 md:w-48 md:h-48 mb-6 md:mb-0"
          >
            <div className="absolute inset-0 animate-pulse">
              <svg
                viewBox="0 0 320 320"
                className="w-full h-full"
                style={{ filter: 'url(#electricity)' }}
              >
                <path
                  ref={electricityRef}
                  d="M160 10 C 210 10, 310 110, 310 160 C 310 210, 210 310, 160 310 C 110 310, 10 210, 10 160 C 10 110, 110 10, 160 10"
                  fill="none"
                  stroke="#FF3B30"
                  strokeWidth="4"
                  strokeDasharray="1000"
                  strokeDashoffset="1000"
                  className="animate-[dash_3s_linear_infinite]"
                />
              </svg>
            </div>
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/50">
              <img
                src="https://photos.app.goo.gl/2w7AyRXAe6aU9YNB7"
                alt="Trishna Bhattarai"
                className="w-full h-full object-cover"
                style={{ filter: 'url(#displace)' }}
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="text-center md:text-left md:ml-6">
            <div className="flex flex-col">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold"
              >
                Trishna Bhattarai
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl md:text-2xl text-secondary mt-[40px] mb-4 md:ml-[150px]"
              >
                <span ref={titleRef}>{titles[0]}</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-col items-center md:items-start md:ml-[150px]"
              >
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  onClick={handleDownloadCV}
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full flex items-center justify-center space-x-2 transition-colors mt-[40px] ml-[1px]"
                >
                  <span>Download CV</span>
                  <Download className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Header;
