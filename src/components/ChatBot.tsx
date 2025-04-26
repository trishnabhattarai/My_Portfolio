import React, { useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Predefined questions and answers
const qaPairs = [
  {
    questions: ["What services do you offer?", "What services are available?", "What do you provide?"],
    answer: "I offer web development, AI/ML solutions, and Java development services. Check out my portfolio section for examples of my work!"
  },
  {
    questions: ["What is your experience?", "What's your background?", "Tell me about your work history"],
    answer: "I'm an AI Engineer and Web Developer with experience in Java development. I'm currently pursuing a Bachelor's in Computer Science with AI Specialization at IIMS College."
  },
  {
    "question": "What is Trishna Bhattarai currently pursuing academically?",
    "answer": "Trishna is currently pursuing a Bachelor of Computer Science (Hons) with AI Specialization at IIMS College, affiliated with Taylor's University, Malaysia."
  },
  {
    "question": "What are Trishna's key technical skills?",
    "answer": "Trishna specializes in AI/Machine Learning, Web Development, Java, Python, React JS, HTML, and CSS."
  },
  {
    "question": "Does Trishna have any experience with professional tools?",
    "answer": "Yes, Trishna is proficient with Visual Studio Code, IntelliJ IDEA Community, and GitHub."
  },
  {
    "question": "What work experience does Trishna have?",
    "answer": "Trishna is currently working as a freelance Data Entry Operator at IIMI Image Management Pvt. Ltd since September 2024."
  },
  {
    "question": "Has Trishna received any certifications?",
    "answer": "Yes, Trishna holds an IT Institute OJT Certificate, a Nepal Telecom OJT Certificate, and a Broadway Infosys Python Certificate."
  },
  {
    "question": "What are some of the projects Trishna has worked on?",
    "answer": "Trishna has built a full-featured Ecommerce Website using React and Node.js and developed a License Management System using Java."
  },
  {
    "question": "Does Trishna have any blogging or writing experience?",
    "answer": "Yes, Trishna has written blogs like 'Getting Started with AI Development' and 'Modern Web Development Practices' on her portfolio."
  },
  {
    "question": "How can someone get in touch with Trishna Bhattarai?",
    "answer": "You can contact Trishna via email at trishnabhattarai36@gmail.com or reach out to her in Kamal Pokhari, Kathmandu."
  },
  {
    "question": "What kind of job environment is Trishna looking for?",
    "answer": "Trishna values opportunities to work on AI and web development projects, collaborative work culture, and continuous learning opportunities."
  },
  {
    "question": "Is Trishna open to freelance or full-time opportunities?",
    "answer": "Yes, Trishna is open to both freelance and full-time job opportunities, especially roles related to AI development, web development, and software engineering."
  }
];

// Synonym mappings for better matching
const synonyms: Record<string, string[]> = {
  'offer': ['provide', 'give', 'deliver', 'available', 'present'],
  'services': ['work', 'solutions', 'offerings', 'assistance'],
  'experience': ['background', 'history', 'expertise', 'work experience'],
  'tell': ['share', 'describe', 'explain', 'introduce', 'walk through'],
  'skills': ['abilities', 'expertise', 'proficiencies', 'strengths'],
  'education': ['academic background', 'studies', 'qualification'],
  'certifications': ['certificates', 'credentials', 'courses completed'],
  'projects': ['works', 'portfolio items', 'creations'],
  'technologies': ['tools', 'tech stack', 'frameworks', 'languages'],
  'tools': ['softwares', 'applications', 'development tools']
};

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hi! How can I help you today?", isUser: false }
  ]);
  const [input, setInput] = useState('');

  // Normalize text by converting to lowercase and removing punctuation
  const normalizeText = (text: string): string => {
    return text.toLowerCase().replace(/[.,?!]/g, '');
  };

  // Replace words with their base synonyms
  const replaceSynonyms = (text: string): string => {
    const words = text.split(' ');
    return words.map(word => {
      for (const [base, synonymList] of Object.entries(synonyms)) {
        if (synonymList && synonymList.includes(word)) {
          return base;
        }
      }
      return word;
    }).join(' ');
  };

  // Calculate similarity between two strings
  const calculateSimilarity = (str1: string, str2: string): number => {
    const set1 = new Set(str1.split(' '));
    const set2 = new Set(str2.split(' '));
    
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    
    return intersection.size / union.size;
  };

  // Find the best matching question and return its answer
  const findBestMatch = (userQuestion: string): string => {
    const normalizedInput = replaceSynonyms(normalizeText(userQuestion));
    
    let bestMatch = {
      similarity: 0,
      answer: "I'm not sure about that. Could you please rephrase your question?"
    };

    qaPairs.forEach(qa => {
      if (Array.isArray(qa.questions)) {
        qa.questions.forEach(question => {
          const normalizedQuestion = replaceSynonyms(normalizeText(question));
          const similarity = calculateSimilarity(normalizedInput, normalizedQuestion);
          
          if (similarity > bestMatch.similarity && similarity > 0.3) { // Threshold for matching
            bestMatch = {
              similarity,
              answer: qa.answer
            };
          }
        });
      } else if (qa.question) {
        // Handle single question format
        const normalizedQuestion = replaceSynonyms(normalizeText(qa.question));
        const similarity = calculateSimilarity(normalizedInput, normalizedQuestion);
        
        if (similarity > bestMatch.similarity && similarity > 0.3) {
          bestMatch = {
            similarity,
            answer: qa.answer
          };
        }
      }
    });

    return bestMatch.answer;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setInput('');

    // Get bot response based on user input
    const botResponse = findBestMatch(userMessage);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: botResponse,
        isUser: false
      }]);
    }, 1000);
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-24 right-6 w-72 bg-background border border-secondary/20 rounded-lg shadow-xl z-50"
          >
            <div className="p-3 border-b border-secondary/20 flex justify-between items-center">
              <h3 className="font-semibold">Chat Support</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-secondary hover:text-text transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-72 p-4 overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-primary text-white'
                        : 'bg-secondary/20 text-text'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="p-3 border-t border-secondary/20">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-white dark:bg-secondary/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-black dark:text-black placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;