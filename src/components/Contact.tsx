import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';

interface ContactProps {
  setActiveSection: (section: string) => void;
}

const Contact: React.FC<ContactProps> = ({ setActiveSection }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.3,
  });

  React.useEffect(() => {
    if (inView) {
      setActiveSection('contact');
    }
  }, [inView, setActiveSection]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        'service_pfpmzzu',
        'template_ege3czb',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'trishnabhattarai36@gmail.com'
        },
        'aczGw_IhYa2cmCMC1'
      );

      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact"
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
          Contact Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-semibold mb-4 text-text">Get in Touch</h3>
              <p className="text-secondary">
                I'm always open to new opportunities and collaborations.
                Feel free to reach out!
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-primary" />
              <span className="text-secondary">trishnabhattarai36@gmail.com</span>
            </div>

            <div className="flex items-center space-x-4">
              <MapPin className="w-6 h-6 text-primary" />
              <span className="text-secondary">Kamal Pokhari, Kathmandu</span>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-secondary mb-2">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-gray-100 dark:bg-secondary/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary text-black"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-secondary mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-gray-100 dark:bg-secondary/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary text-black"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-secondary mb-2">Message</label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-gray-100 dark:bg-secondary/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary h-32 text-black"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-text py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              <Send className="w-5 h-5" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;