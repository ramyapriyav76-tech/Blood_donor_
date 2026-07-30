import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Search, Users, ShieldAlert, Award, CalendarClock, ArrowRight } from 'lucide-react';

const Home = () => {
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [state, setState] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/find-donor?bloodGroup=${encodeURIComponent(bloodGroup)}&state=${encodeURIComponent(state)}`);
  };

  const stats = [
    { label: 'Active Donors', value: '18,500+', icon: Users, color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/20' },
    { label: 'Emergency Requests', value: '340+', icon: ShieldAlert, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/20' },
    { label: 'Lives Saved', value: '12,200+', icon: Heart, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' },
    { label: 'Clinics Partnered', value: '85+', icon: Award, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/20' },
  ];

  const steps = [
    { title: '1. Register Profile', desc: 'Sign up in under 2 minutes and select your blood group.' },
    { title: '2. Health Screening', desc: 'Undergo a brief health survey when presenting at center.' },
    { title: '3. Donate Blood', desc: 'Process takes 8-10 minutes. Relax with juice and cookies.' },
    { title: '4. Save a Life', desc: 'Your single donation can benefit up to three individuals!' },
  ];

  return (
    <div class="space-y-20 pb-20">
      {/* Hero Section */}
      <section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-50/50 via-slate-50 to-rose-100/30 dark:from-darkbg-base dark:via-darkbg-base dark:to-brand-950/10 px-4 transition-colors duration-300">
        {/* Floating background decorative circles */}
        <div class="absolute top-1/4 left-1/10 h-72 w-72 rounded-full bg-brand-pure/5 blur-3xl"></div>
        <div class="absolute bottom-1/4 right-1/10 h-96 w-96 rounded-full bg-rose-400/5 blur-3xl"></div>

        <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
          {/* Hero Left */}
          <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-100/80 dark:bg-brand-900/30 border border-brand-200/50 dark:border-brand-800/30"
            >
              <Heart class="h-4.5 w-4.5 text-brand-pure fill-brand-pure animate-pulse" />
              <span class="text-xs font-bold text-brand-700 dark:text-brand-300 uppercase tracking-widest">
                Urgent Blood Needs Covered
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              class="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1]"
            >
              Every Drop of Blood is a{' '}
              <span class="bg-gradient-to-r from-brand-pure to-rose-500 bg-clip-text text-transparent">
                Lifeline
              </span>{' '}
              for Someone.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              class="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed"
            >
              Find verified blood donors in your area instantly, or register as a donor to support emergency hospital requests. Completely secure, real-time, and voluntary.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link to="/find-donor" class="btn-primary w-full sm:w-auto px-8 py-3.5 text-base">
                Find Donors
                <ArrowRight class="h-5 w-5" />
              </Link>
              <Link to="/become-donor" class="btn-secondary w-full sm:w-auto px-8 py-3.5 text-base">
                Become a Donor
              </Link>
            </motion.div>
          </div>

          {/* Hero Right - Interactive Quick Search Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            class="lg:col-span-5"
          >
            <form
              onSubmit={handleSearchSubmit}
              class="glass-card p-8 rounded-3xl space-y-6 shadow-2xl relative border-brand-100/10"
            >
              <div class="h-1 bg-gradient-to-r from-brand-pure to-rose-400 absolute top-0 left-0 right-0 rounded-t-3xl"></div>
              
              <h3 class="font-extrabold text-2xl text-slate-800 dark:text-slate-100">
                Quick Search Registry
              </h3>
              <p class="text-sm text-slate-500 dark:text-slate-400 -mt-3">
                Select your required blood type to see available donors.
              </p>

              <div>
                <label class="form-label">Blood Group Needed</label>
                <div class="grid grid-cols-4 gap-2">
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                    <button
                      key={bg}
                      type="button"
                      onClick={() => setBloodGroup(bg)}
                      class={`py-2.5 rounded-xl font-bold border transition-all duration-150 ${
                        bloodGroup === bg
                          ? 'border-brand-pure bg-brand-pure/10 text-brand-pure dark:bg-brand-pure/20'
                          : 'border-slate-200 hover:border-slate-300 dark:border-darkbg-border dark:hover:border-slate-700'
                      }`}
                    >
                      {bg}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label class="form-label" htmlFor="state">State / Region</label>
                <input
                  type="text"
                  id="state"
                  placeholder="e.g. Karnataka"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  class="form-input"
                />
              </div>

              <button type="submit" class="btn-primary w-full py-3.5 text-base mt-2">
                <Search class="h-5 w-5" />
                Find Available Donors
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              class="glass-card p-6 rounded-2xl flex items-center gap-4 glow-hover"
            >
              <div class={`h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 ${stat.color}`}>
                <stat.icon class="h-7 w-7" />
              </div>
              <div>
                <h4 class="text-3xl font-extrabold text-slate-800 dark:text-slate-100">{stat.value}</h4>
                <p class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Steps Section */}
      <section class="max-w-7xl mx-auto px-4 text-center space-y-12">
        <div class="space-y-4 max-w-2xl mx-auto">
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-slate-100">
            How Blood Donation Works
          </h2>
          <p class="text-slate-500 dark:text-slate-400 font-medium">
            Helping others is an effortless process. Here are the simple steps to guide you.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              class="glass-card p-8 rounded-2xl text-left relative overflow-hidden group hover:border-brand-pure/50"
            >
              <div class="h-1.5 bg-slate-100 group-hover:bg-brand-pure absolute top-0 left-0 right-0 transition-colors duration-300"></div>
              <h3 class="font-bold text-lg text-slate-800 dark:text-slate-100 mb-2">{step.title}</h3>
              <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section class="max-w-7xl mx-auto px-4">
        <div class="bg-gradient-to-r from-brand-600 to-brand-pure rounded-3xl p-10 sm:p-16 text-white text-center space-y-6 relative overflow-hidden shadow-xl">
          {/* Decorative mesh */}
          <div class="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-slate-100 to-slate-900"></div>
          <div class="relative z-10 max-w-2xl mx-auto space-y-6">
            <CalendarClock class="h-12 w-12 mx-auto text-white fill-white/10" />
            <h2 class="text-3xl sm:text-5xl font-extrabold tracking-tight">Are You Ready to Be a Hero?</h2>
            <p class="text-brand-100 font-medium leading-relaxed">
              A single blood donor can support three individuals. Your contribution remains secure, and you determine your calendar and location availability.
            </p>
            <div class="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <Link to="/register?role=donor" class="bg-white text-brand-600 hover:bg-slate-100 font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all duration-200 w-full sm:w-auto">
                Sign Up as Donor
              </Link>
              <Link to="/requests" class="border border-white/40 hover:bg-white/10 font-bold px-8 py-3.5 rounded-xl transition-all duration-200 w-full sm:w-auto">
                View Emergency Requests
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
