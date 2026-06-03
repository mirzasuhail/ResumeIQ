import React from 'react';
import { Mail, Phone, Github, Linkedin, Globe, User, ArrowUpRight } from 'lucide-react';

export default function CandidateInfo({ candidate }) {
  const { name, email, phone, links = [] } = candidate;

  const githubLink = links.find(l => l.type === 'github')?.url || '';
  const linkedinLink = links.find(l => l.type === 'linkedin')?.url || '';
  const portfolioLink = links.find(l => l.type === 'portfolio')?.url || '';

  const getFormatUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https://${url}`;
  };

  return (
    <div className="glass-panel p-6 w-full">
      <h3 className="font-semibold text-lg text-white font-sans border-b border-white/[0.06] pb-3 flex items-center space-x-2 mb-5">
        <User className="h-5 w-5 text-accent-cyan" />
        <span>Candidate Profile Details</span>
      </h3>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Name and Avatar */}
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-accent-cyan via-accent-blue to-accent-violet flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-cyan-950/20 flex-shrink-0">
            {name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'C'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">{name || 'Candidate Name'}</h2>
            <p className="text-xs text-dark-500 mt-0.5">Parsed Candidate</p>
          </div>
        </div>

        {/* Contact Coordinates */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full md:w-auto">
          {/* Email Card */}
          <div className="p-3 bg-white/[0.01] border border-white/[0.04] rounded-xl flex items-center space-x-3 hover:border-white/[0.08] transition-all">
            <div className="p-2 bg-accent-blue/10 rounded-lg text-accent-blue">
              <Mail className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-dark-500 uppercase font-bold tracking-wider">Email Address</p>
              <p className="text-xs font-medium text-gray-200 truncate mt-0.5 max-w-[160px]">
                {email ? (
                  <a href={`mailto:${email}`} className="hover:underline hover:text-accent-cyan transition-colors">{email}</a>
                ) : (
                  <span className="text-dark-500 italic">Not found</span>
                )}
              </p>
            </div>
          </div>

          {/* Phone Card */}
          <div className="p-3 bg-white/[0.01] border border-white/[0.04] rounded-xl flex items-center space-x-3 hover:border-white/[0.08] transition-all">
            <div className="p-2 bg-accent-cyan/10 rounded-lg text-accent-cyan">
              <Phone className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] text-dark-500 uppercase font-bold tracking-wider">Phone number</p>
              <p className="text-xs font-medium text-gray-200 mt-0.5">
                {phone ? (
                  <a href={`tel:${phone}`} className="hover:underline hover:text-accent-cyan transition-colors">{phone}</a>
                ) : (
                  <span className="text-dark-500 italic">Not found</span>
                )}
              </p>
            </div>
          </div>

          {/* Links Card */}
          <div className="p-3 bg-white/[0.01] border border-white/[0.04] rounded-xl flex items-center space-x-3 hover:border-white/[0.08] transition-all">
            <div className="p-2 bg-accent-violet/10 rounded-lg text-accent-violet">
              <Globe className="h-4 w-4" />
            </div>
            <div className="flex items-center space-x-2">
              {githubLink && (
                <a
                  href={getFormatUrl(githubLink)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 text-gray-400 hover:text-white hover:bg-white/[0.05] rounded-md transition-colors"
                  title="GitHub Profile"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {linkedinLink && (
                <a
                  href={getFormatUrl(linkedinLink)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 text-gray-400 hover:text-white hover:bg-white/[0.05] rounded-md transition-colors"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              {portfolioLink && (
                <a
                  href={getFormatUrl(portfolioLink)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 text-gray-400 hover:text-white hover:bg-white/[0.05] rounded-md transition-colors"
                  title="Portfolio Website"
                >
                  <Globe className="h-4 w-4" />
                </a>
              )}
              {!githubLink && !linkedinLink && !portfolioLink && (
                <div>
                  <p className="text-[10px] text-dark-500 uppercase font-bold tracking-wider">Social Links</p>
                  <span className="text-xs text-dark-500 italic">None found</span>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
