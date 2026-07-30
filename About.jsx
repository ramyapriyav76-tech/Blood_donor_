import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

const About = () => {
  const [lastDate, setLastDate] = useState('');
  const [calcResult, setCalcResult] = useState(null);

  const calculateEligibility = (e) => {
    e.preventDefault();
    if (!lastDate) return;

    const donationDate = new Date(lastDate);
    const nextDate = new Date(donationDate);
    nextDate.setDate(donationDate.getDate() + 90);

    const today = new Date();
    const diffTime = nextDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setCalcResult({
      date: nextDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      daysRemaining: diffDays > 0 ? diffDays : 0,
      eligible: diffDays <= 0,
    });
  };

  const compatibilityTable = [
    { type: 'O-', giveTo: 'Everyone (Universal)', receiveFrom: 'O-' },
    { type: 'O+', giveTo: 'O+, A+, B+, AB+', receiveFrom: 'O+, O-' },
    { type: 'A-', giveTo: 'A-, A+, AB-, AB+', receiveFrom: 'A-, O-' },
    { type: 'A+', giveTo: 'A+, AB+', receiveFrom: 'A+, A-, O+, O-' },
    { type: 'B-', giveTo: 'B-, B+, AB-, AB+', receiveFrom: 'B-, O-' },
    { type: 'B+', giveTo: 'B+, AB+', receiveFrom: 'B+, B-, O+, O-' },
    { type: 'AB-', giveTo: 'AB-, AB+', receiveFrom: 'AB-, A-, B-, O-' },
    { type: 'AB+', giveTo: 'AB+ only (Universal Receiver)', receiveFrom: 'Everyone' },
  ];

  return (
    <div class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-16">
      {/* Intro Banner */}
      <section class="text-center max-w-3xl mx-auto space-y-4">
        <h1 class="text-4xl font-extrabold text-slate-800 dark:text-slate-100 sm:text-5xl">
          About Blood Donation & Compatibility
        </h1>
        <p class="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium">
          Understanding compatibility and timing is essential for maximizing the impact of blood donations.
        </p>
      </section>

      {/* Grid: Eligibility calculator & Blood compatibility */}
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Interactive Eligibility Calculator */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          class="lg:col-span-5 glass-card p-8 rounded-3xl space-y-6"
        >
          <div class="flex items-center gap-2">
            <Activity class="h-6 w-6 text-brand-pure" />
            <h2 class="font-extrabold text-2xl text-slate-800 dark:text-slate-100">
              Next Eligible Date Calculator
            </h2>
          </div>
          <p class="text-sm text-slate-500 dark:text-slate-400">
            A standard 90-day waiting window is required between whole blood donations to ensure red cell recovery.
          </p>

          <form onSubmit={calculateEligibility} class="space-y-4">
            <div>
              <label class="form-label" htmlFor="lastDonation">Date of Last Donation</label>
              <input
                type="date"
                id="lastDonation"
                value={lastDate}
                onChange={(e) => setLastDate(e.target.value)}
                class="form-input"
                required
              />
            </div>
            <button type="submit" class="btn-primary w-full py-3">
              Calculate Eligibility
            </button>
          </form>

          {calcResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              class={`p-4 rounded-xl border ${
                calcResult.eligible
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-800/40 dark:text-emerald-300'
                  : 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950/20 dark:border-amber-800/40 dark:text-amber-300'
              }`}
            >
              <div class="flex items-center gap-2 font-bold mb-1">
                {calcResult.eligible ? <CheckCircle2 class="h-5 w-5" /> : <AlertCircle class="h-5 w-5" />}
                <span>{calcResult.eligible ? 'You are Eligible!' : 'Waiting Period Active'}</span>
              </div>
              <p class="text-sm">
                Next eligible donation date is: <strong>{calcResult.date}</strong>
              </p>
              {!calcResult.eligible && (
                <p class="text-xs mt-2 italic font-semibold">
                  Wait time remaining: {calcResult.daysRemaining} days.
                </p>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Compatibility Table */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          class="lg:col-span-7 glass-card rounded-3xl overflow-hidden shadow-lg"
        >
          <div class="p-6 border-b border-slate-200 dark:border-darkbg-border flex items-center gap-2.5">
            <Sparkles class="h-6 w-6 text-brand-pure" />
            <h2 class="font-extrabold text-2xl text-slate-800 dark:text-slate-100">
              Blood Group Compatibility Matrix
            </h2>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-slate-200 dark:divide-darkbg-border text-sm">
              <thead class="bg-slate-50 dark:bg-darkbg-base">
                <tr>
                  <th class="px-6 py-4 text-left font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Group</th>
                  <th class="px-6 py-4 text-left font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Can Give To</th>
                  <th class="px-6 py-4 text-left font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Can Receive From</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 dark:divide-darkbg-border bg-white dark:bg-darkbg-card">
                {compatibilityTable.map((row) => (
                  <tr key={row.type} class="hover:bg-slate-50 dark:hover:bg-darkbg-base/30">
                    <td class="px-6 py-4 whitespace-nowrap font-extrabold text-brand-pure text-base">{row.type}</td>
                    <td class="px-6 py-4 text-slate-600 dark:text-slate-300 font-medium">{row.giveTo}</td>
                    <td class="px-6 py-4 text-slate-600 dark:text-slate-300 font-medium">{row.receiveFrom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>

      {/* Guidelines Section */}
      <section class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
        <div class="glass-card p-8 rounded-2xl border-l-4 border-l-emerald-500">
          <h3 class="font-bold text-xl text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
            <CheckCircle2 class="text-emerald-500 h-5 w-5" /> Who Can Donate?
          </h3>
          <ul class="space-y-3 text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed list-disc list-inside">
            <li>Aged between 18 and 65 years.</li>
            <li>Weigh at least 50 kg (110 lbs).</li>
            <li>In good general health at the time of donation.</li>
            <li>Normal pulse rate, body temperature, and blood pressure.</li>
            <li>Minimum hemoglobin levels of 12.5 g/dL.</li>
          </ul>
        </div>

        <div class="glass-card p-8 rounded-2xl border-l-4 border-l-rose-500">
          <h3 class="font-bold text-xl text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
            <AlertCircle class="text-rose-500 h-5 w-5" /> Who Cannot Donate?
          </h3>
          <ul class="space-y-3 text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed list-disc list-inside">
            <li>Have cold, flu, sore throat, or active infections.</li>
            <li>Had dental extractions or minor surgeries in the last 72 hours.</li>
            <li>Tattoo or body piercing done within the last 6 months.</li>
            <li>Pregnancy or breast-feeding status.</li>
            <li>Chronic conditions like active heart disease or hepatitis.</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default About;
