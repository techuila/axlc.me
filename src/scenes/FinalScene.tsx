import { motion } from 'framer-motion';
import {
  Calendar,
  CheckCircle,
  Github,
  Linkedin,
  MessageCircle,
  Send,
} from 'lucide-react';
import { useState } from 'react';

import { StackOverflowIcon } from '@/partials/ui/Icons';

export const FinalScene: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Construct email body with proper line breaks
    const subject = `Portfolio Contact from ${formData.name}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${
      formData.email
    }%0D%0A%0D%0AMessage:%0D%0A${formData.message.replace(/\n/g, '%0D%0A')}`;
    const mailtoLink = `mailto:axlcuyugan05@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success message
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="scene-section flex items-center justify-center py-16">
      <div className="container mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="gradient-text mb-6 text-4xl font-bold md:text-5xl">
            Let's Build Together
          </h2>
          <div className="mx-auto mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
          <p className="mx-auto mb-12 max-w-2xl text-xl text-slate-300">
            I'm always interested in collaborating on innovative projects and
            exploring new opportunities. Let's connect and create something
            amazing.
          </p>

          {/* Quick contact links */}
          <div className="mb-16 flex flex-wrap justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/techuila"
              target="_blank"
              rel="noopener noreferrer"
              className="glass group flex items-center rounded-lg border border-slate-700 px-6 py-3 shadow-md transition-all hover:shadow-lg"
            >
              <Github
                className="mr-3 text-slate-400 transition-colors group-hover:text-blue-400"
                size={20}
              />
              <span className="text-slate-300 transition-colors group-hover:text-slate-100">
                GitHub
              </span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.linkedin.com/in/axlcuyugan/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass group flex items-center rounded-lg border border-slate-700 px-6 py-3 shadow-md transition-all hover:shadow-lg"
            >
              <Linkedin
                className="mr-3 text-slate-400 transition-colors group-hover:text-blue-400"
                size={20}
              />
              <span className="text-slate-300 transition-colors group-hover:text-slate-100">
                LinkedIn
              </span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://stackoverflow.com/users/4778651/techuila"
              target="_blank"
              rel="noopener noreferrer"
              className="glass group flex items-center rounded-lg border border-slate-700 px-6 py-3 shadow-md transition-all hover:shadow-lg"
            >
              <StackOverflowIcon
                className="mr-3 text-slate-400 transition-colors group-hover:text-orange-400"
                size={20}
              />
              <span className="text-slate-300 transition-colors group-hover:text-slate-100">
                Stack Overflow
              </span>
            </motion.a>
          </div>
        </motion.div>

        {/* Unique contact section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-2"
        >
          {/* Left side - Contact form */}
          <div className="card-hover rounded-2xl p-8">
            <h3 className="mb-6 flex items-center text-2xl font-bold text-purple-400">
              <MessageCircle className="mr-3" />
              Send a Message
            </h3>

            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-4 flex items-center rounded-lg border border-green-500/30 bg-green-500/20 p-4 text-green-400"
              >
                <CheckCircle className="mr-2" size={20} />
                Message prepared! Check your email client to send.
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-400">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-200 placeholder:text-slate-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-400">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-200 placeholder:text-slate-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-400">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full resize-none rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-slate-200 placeholder:text-slate-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Tell me about your project or idea..."
                ></textarea>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-2 font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Send Message</span>
                  <Send size={18} />
                </span>
              </motion.button>
            </form>
          </div>

          {/* Right side - Alternative contact methods */}
          <div className="space-y-6">
            {/* Schedule a call */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="card-hover group cursor-pointer rounded-2xl p-8"
            >
              <div className="flex items-start space-x-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400">
                  <Calendar className="size-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="mb-2 text-xl font-semibold text-blue-400 transition-colors group-hover:text-blue-300">
                    Schedule a Call
                  </h4>
                  <p className="mb-4 text-slate-400">
                    Book a 30-minute call to discuss your project in detail. I'm
                    available for consultations and technical discussions.
                  </p>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-1 text-blue-400 transition-colors hover:text-blue-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(
                        'https://calendly.com/axlcuyugan05/30min',
                        '_blank'
                      );
                    }}
                  >
                    <span>Book a time</span>
                    <span>→</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Quick response promise */}
            <div className="card-hover rounded-2xl p-8">
              <h4 className="mb-4 text-xl font-semibold text-green-400">
                Quick Response Promise
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="size-2 rounded-full bg-green-400"></div>
                  <p className="text-slate-400">
                    Email responses within 24 hours
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="size-2 rounded-full bg-green-400"></div>
                  <p className="text-slate-400">
                    Available for urgent projects
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="size-2 rounded-full bg-green-400"></div>
                  <p className="text-slate-400">
                    Open to remote collaboration worldwide
                  </p>
                </div>
              </div>
            </div>

            {/* Preferred communication */}
            <div className="card-hover rounded-2xl p-6">
              <p className="text-center text-sm text-slate-400">
                💡 <span className="text-slate-300">Pro tip:</span> For the
                fastest response, send me a message via the form or email
                directly at{' '}
                <a
                  href="mailto:axlcuyugan05@gmail.com"
                  className="text-purple-400 transition-colors hover:text-purple-300"
                >
                  axlcuyugan05@gmail.com
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
