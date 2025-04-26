import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface PortfolioProps {
  setActiveSection: (section: string) => void;
}

const projects = [
  {
    title: 'Ecommerce Website',
    description: 'A full-featured ecommerce platform built with React and Node.js',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80',
    category: 'web',
    url: 'https://github.com/trishnabhattarai/E-Commerce-Website'
  },
  {
    title: 'License Management System',
    description: 'An automated system for managing software licenses using Java',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
    category: 'java',
    url: 'https://github.com/trishnabhattarai/License-Management-System'
  }
];

const Portfolio: React.FC<PortfolioProps> = ({ setActiveSection }) => {
  const [filter, setFilter] = useState('all');
  const { ref, inView } = useInView({
    threshold: 0.3,
  });

  React.useEffect(() => {
    if (inView) {
      setActiveSection('portfolio');
    }
  }, [inView, setActiveSection]);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section 
      id="portfolio"
      ref={ref}
      className="py-20 bg-background"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-12 text-center"
        >
          Portfolio
        </motion.h2>

        <div className="flex justify-center mb-12 space-x-4">
          {['all', 'web', 'java'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full transition-colors ${
                filter === category 
                  ? 'bg-primary text-text' 
                  : 'bg-secondary/20 text-secondary hover:bg-secondary/30'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg cursor-pointer"
              onClick={() => project.url && window.open(project.url, '_blank', 'noopener noreferrer')}
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-secondary">{project.description}</p>
                  {project.url && (
                    <p className="text-primary mt-2 text-sm">Click to view project →</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;