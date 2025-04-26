import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogProps {
  setActiveSection: (section: string) => void;
}

const blogPosts = [
  {
    title: 'Getting Started with AI Development',
    excerpt: 'Learn the fundamentals of AI development and how to begin your journey in this exciting field.',
    date: '2024-03-15',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80'
  },
  {
    title: 'Modern Web Development Practices',
    excerpt: 'Explore the latest trends and best practices in web development for 2024.',
    date: '2024-03-10',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80'
  }
];

const Blog: React.FC<BlogProps> = ({ setActiveSection }) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
  });

  React.useEffect(() => {
    if (inView) {
      setActiveSection('blog');
    }
  }, [inView, setActiveSection]);

  return (
    <section
      id="blog"
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
          Blog
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-secondary/5 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-secondary mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-secondary mb-4">{post.excerpt}</p>
                <button className="text-primary flex items-center hover:text-primary/80 transition-colors">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;