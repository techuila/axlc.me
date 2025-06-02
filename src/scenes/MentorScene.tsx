import { motion } from 'framer-motion';
import { Award, Target, TrendingUp, Users } from 'lucide-react';
import React from 'react';

import { AnimatedTimeline } from '@/partials/AnimatedTimeline';
import { TextOverlay } from '@/partials/TextOverlay';

export const MentorScene: React.FC = () => {
  const timelineData = [
    {
      id: 'viyahe-monark',
      date: 'March 2022 - Present',
      title: 'Platform Software Engineer',
      company: 'Viyahe x Monark',
      location: 'Remote',
      description:
        'Lead platform development creating and managing AWS-based services using Python and TypeScript. Established comprehensive coding standards and maintained CI/CD pipelines through AWS CodePipeline, ensuring seamless backend service deployments. Research and implement cost-effective solutions while supporting desktop application development for trials.gg using Electron.',
      technologies: [
        'Python',
        'TypeScript',
        'AWS',
        'CodePipeline',
        'Electron',
        'CI/CD',
        'Backend Services',
        'Cost Optimization',
      ],
    },
    {
      id: 'phlivemusic',
      date: 'March 2024 - May 2024',
      title: 'DevOps Consultant',
      company: 'PH Live Music LTD',
      location: 'Remote',
      description:
        'Architected and implemented complete AWS infrastructure for both frontend and backend systems. Established CI/CD pipelines and comprehensive documentation for all DevOps processes. Enhanced development workflow by resolving TypeScript integration issues and implemented robust security measures for web platform protection.',
      technologies: [
        'AWS',
        'Infrastructure',
        'CI/CD',
        'TypeScript',
        'Security',
        'Documentation',
        'DevOps',
        'Frontend/Backend',
      ],
    },
    {
      id: 'novare-consultant',
      date: 'May 2023 - October 2023',
      title: 'Consultant',
      company: 'MDI Novare',
      location: 'Remote',
      description:
        'Designed and developed robust backend features leveraging Amazon Web Services infrastructure. Created comprehensive integration testing frameworks for all new features, ensuring software reliability and robustness. Managed production deployments and conducted knowledge transfer sessions while mentoring development team members on best practices and emerging technologies.',
      technologies: [
        'AWS',
        'Backend Development',
        'Integration Testing',
        'Production Deployment',
        'Mentoring',
        'Knowledge Transfer',
        'Software Architecture',
        'Team Leadership',
      ],
    },
    {
      id: 'novare-senior',
      date: 'September 2021 - January 2023',
      title: 'Senior Software Engineer',
      company: 'MDI Novare',
      location: 'Remote',
      description:
        'Implemented responsive user interfaces using React.js while refactoring legacy codebases to meet modern coding standards. Collaborated with support teams to investigate and resolve critical issues, ensuring optimal user experience. Enhanced backend utilities and AWS infrastructure using JavaScript to improve system performance and reliability.',
      technologies: [
        'React.js',
        'JavaScript',
        'AWS',
        'Code Refactoring',
        'Frontend Development',
        'Backend Utilities',
        'Issue Resolution',
        'Legacy Modernization',
      ],
    },
    {
      id: 'exco-deputy',
      date: 'April 2021 - March 2022',
      title: 'Deputy Head Software Developer',
      company: 'Exco IT Services',
      location: 'Zamboanga, Philippines',
      description:
        'Established and enforced coding standards across development teams while serving as technical mentor for junior developers. Provided comprehensive training and guidance on best practices, emerging technologies, and project-specific knowledge. Led technical initiatives focusing on optimization, internationalization, and full-stack development excellence.',
      technologies: [
        'Team Leadership',
        'Coding Standards',
        'Mentoring',
        'Full-Stack Development',
        'Optimization',
        'Internationalization',
        'Training',
        'Best Practices',
      ],
    },
    {
      id: 'exco-developer',
      date: 'August 2019 - March 2022',
      title: 'Software Developer',
      company: 'Exco IT Services',
      location: 'Zamboanga, Philippines',
      description:
        'Built scalable web applications using React.js, Node.js, and GraphQL technologies. Designed and developed WordPress landing pages while maintaining both development and production server environments. Configured and managed CI/CD pipelines across multiple projects using GitLab, automating deployment processes and ensuring reliable software delivery.',
      technologies: [
        'React.js',
        'Node.js',
        'GraphQL',
        'WordPress',
        'CI/CD',
        'GitLab',
        'Server Management',
        'Web Development',
      ],
    },
  ];

  const achievements = [
    {
      icon: <Users className="size-6" />,
      title: 'Team Leadership',
      description: 'Leading developers across multiple projects',
      color: 'from-blue-500 to-cyan-400',
    },
    {
      icon: <Award className="size-6" />,
      title: 'Technical Excellence',
      description: 'Comprehensive testing and quality assurance',
      color: 'from-green-500 to-emerald-400',
    },
    {
      icon: <Target className="size-6" />,
      title: 'Project Success',
      description: 'Consistent delivery of complex solutions',
      color: 'from-purple-500 to-pink-400',
    },
    {
      icon: <TrendingUp className="size-6" />,
      title: 'Performance Impact',
      description: 'Streamlining deployment and automation',
      color: 'from-orange-500 to-red-400',
    },
  ];

  return (
    <section className="scene-section flex items-center">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Left side - Text content */}
          <div className="space-y-8">
            <TextOverlay
              title="Mentor & Leader"
              subtitle="Empowering Teams, Driving Innovation"
              description="Passionate about growing teams and mentoring developers. As a technical leader, I've guided teams to deliver complex projects while fostering a culture of continuous learning, innovation, and engineering excellence."
              position="left"
            />

            {/* Achievement cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card-hover rounded-xl p-4"
                >
                  <div
                    className={`size-12 rounded-lg bg-gradient-to-br ${achievement.color} mb-3 flex items-center justify-center`}
                  >
                    <div className="text-white">{achievement.icon}</div>
                  </div>
                  <h4 className="mb-1 font-semibold text-slate-200">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-slate-400">
                    {achievement.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right side - Animated Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:pl-8"
          >
            <div className="mb-8">
              <h3 className="mb-2 text-center text-2xl font-bold text-blue-400 lg:text-left">
                Professional Journey
              </h3>
              <p className="text-slate-300">
                My career progression and key milestones
              </p>
            </div>
            <AnimatedTimeline items={timelineData} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
