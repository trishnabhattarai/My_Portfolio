import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Code2, GitBranch, FileCode } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface AboutProps {
  setActiveSection: (section: string) => void;
}

const skills = [
  { name: 'AI/Machine Learning', level: 90 },
  { name: 'Web Development', level: 85 },
  { name: 'Java', level: 80 },
  { name: 'Python', level: 85 },
  { name: 'React JS', level: 80 },
  { name: 'HTML', level: 85 },
  { name: 'CSS', level: 85 }
];

const tools = [
  { name: 'Visual Studio Code', icon: Code2 },
  { name: 'IntelliJ IDEA Community', icon: FileCode },
  { name: 'GitHub', icon: GitBranch }
];

const certificates = [
  {
    title: 'IT Institute OJT Certificate',
    duration: '3 months post-10th board',
    role: 'Junior IT Assistant',
    responsibilities: 'Computer training, MS Word, Excel basics'
  },
  {
    title: 'Nepal Telecom OJT Certificate',
    url: 'https://www.ntc.net.np/',
    duration: '6 months post-12th board',
    role: 'Data Entry Operator & Customer Service'
  },
  {
    title: 'Broadway Infosys Python Certificate',
    url: 'https://broadwayinfosys.com/',
    duration: '25-hour Python course completion'
  }
];

const About: React.FC<AboutProps> = ({ setActiveSection }) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
  });

  React.useEffect(() => {
    if (inView) {
      setActiveSection('about');
    }
  }, [inView, setActiveSection]);

  return (
    <section 
      id="about"
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
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            <div>
              <h3 className="text-xl font-semibold mb-6">Skills</h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Professional Tools</h3>
              <div className="grid grid-cols-2 gap-4">
                {tools.map((tool) => {
                  const IconComponent = tool.icon;
                  return (
                    <div key={tool.name} className="flex items-center space-x-2 p-2 rounded-lg bg-secondary/5">
                      <IconComponent className="w-5 h-5 text-primary" />
                      <span>{tool.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-semibold mb-4">Professional Summary</h3>
              <p className="text-secondary">
                Passionate AI Engineer and Web Developer with a strong foundation in Java development.
                Combining theoretical knowledge with practical experience in building innovative solutions.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Education</h3>
              
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="border-l-2 border-primary pl-4"
                >
                  <h4 className="font-semibold text-primary">Currently Pursuing</h4>
                  <a 
                    href="https://iimscollege.edu.np/virtual-tour/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center"
                  >
                    <p className="text-lg font-medium group-hover:text-primary transition-colors">
                      Bachelor of Computer Science (Hons) with AI Specialization
                    </p>
                    <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <p className="text-secondary">IIMS College</p>
                  <p className="text-secondary text-sm">Affiliated to: Taylor's University, Malaysia</p>
                  <div className="flex items-center text-secondary text-sm mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>Kamal Pokhari, Kathmandu</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="border-l-2 border-primary pl-4"
                >
                  <h4 className="font-semibold">Diploma (Grade 9-12)</h4>
                  <a 
                    href="https://www.facebook.com/p/Shree-Susanskrit-Secondary-School-100057233959255/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center"
                  >
                    <p className="text-lg group-hover:text-primary transition-colors">
                      Shree Susanskrit Secondary School and College
                    </p>
                    <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <p className="text-secondary">Duration: 4 years</p>
                  <p className="text-secondary">Grade 10 GPA: 3.57 | Grade 12 GPA: 3.37</p>
                  <div className="flex items-center text-secondary text-sm mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>Devkota Chowk, Bhairahawa</span>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Experience</h3>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="border-l-2 border-primary pl-4"
              >
                <h4 className="font-semibold">Data Entry Operator</h4>
                <a 
                  href="https://www.iimdirect.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center"
                >
                  <p className="text-lg group-hover:text-primary transition-colors">
                    IIMI Image Management Pvt. Ltd
                  </p>
                  <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <p className="text-secondary">Freelance Position | September 2024-present</p>
              </motion.div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Certificates</h3>
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border-l-2 border-primary pl-4"
                >
                  <h4 className="font-semibold">
                    {cert.url ? (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center hover:text-primary transition-colors"
                      >
                        {cert.title}
                        <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      cert.title
                    )}
                  </h4>
                  <p className="text-secondary">{cert.duration}</p>
                  {cert.role && <p className="text-secondary">Role: {cert.role}</p>}
                  {cert.responsibilities && (
                    <p className="text-secondary text-sm">
                      Responsibilities: {cert.responsibilities}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;