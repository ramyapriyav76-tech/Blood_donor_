import React from 'react';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer class="bg-white dark:bg-darkbg-card border-t border-slate-200 dark:border-darkbg-border transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Pitch */}
          <div class="col-span-1 md:col-span-2">
            <Link to="/" class="flex items-center gap-2 mb-4">
              <div class="h-8 w-8 rounded-full bg-brand-pure flex items-center justify-center">
                <Heart class="h-5 w-5 text-white fill-white" />
              </div>
              <span class="font-extrabold text-xl tracking-tight text-brand-pure">
                Lifeline
              </span>
            </Link>
            <p class="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Lifeline is a next-generation real-time blood donor registry. We connect voluntary blood donors with hospitals and searchers in times of medical emergency. Every drop counts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">Quick Links</h3>
            <ul class="space-y-2.5">
              {['About', 'Find Donor', 'Become Donor', 'Blood Requests', 'Contact'].map((item) => {
                const path = '/' + item.toLowerCase().replace(' ', '-');
                return (
                  <li key={item}>
                    <Link to={path} class="text-sm text-slate-600 hover:text-brand-pure dark:text-slate-400 dark:hover:text-brand-pure transition-colors duration-150">
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">Contact Info</h3>
            <ul class="space-y-3">
              <li class="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                <Phone class="h-4 w-4 text-brand-pure shrink-0" />
                <span>+1 (555) 019-2834</span>
              </li>
              <li class="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                <Mail class="h-4 w-4 text-brand-pure shrink-0" />
                <span class="break-all">emergency@lifelineportal.org</span>
              </li>
              <li class="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                <MapPin class="h-4 w-4 text-brand-pure shrink-0" />
                <span>Medical District, Suite 50, Bangalore, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-slate-200 dark:border-darkbg-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-xs text-slate-400 dark:text-slate-500">
            &copy; {new Date().getFullYear()} Lifeline Blood Donor Portal. All rights reserved. Created for portfolio and educational demonstration.
          </p>
          <div class="flex gap-4">
            <a href="#" class="text-xs text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300">Privacy Policy</a>
            <a href="#" class="text-xs text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
