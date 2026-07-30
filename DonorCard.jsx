import React from 'react';
import { Phone, Mail, MapPin, Calendar, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const DonorCard = ({ donor }) => {
  const { user, bloodGroup, phone, state, district, city, address, status, lastDonationDate } = donor;

  const getBloodBadgeColor = (bg) => {
    const redGroup = ['A+', 'B+', 'O+', 'AB+'];
    if (redGroup.includes(bg)) {
      return 'bg-red-500 text-white';
    }
    return 'bg-brand-pure text-white';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never / Ready to donate';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      class="glass-card p-6 rounded-2xl glow-hover relative overflow-hidden flex flex-col justify-between"
    >
      {/* Blood Group Badge top-right */}
      <div class={`absolute top-0 right-0 px-5 py-2.5 rounded-bl-2xl font-extrabold text-xl ${getBloodBadgeColor(bloodGroup)} shadow-md`}>
        {bloodGroup}
      </div>

      <div class="flex items-start gap-4">
        {user?.profilePic ? (
          <img
            src={user.profilePic}
            alt={user.name}
            class="h-12 w-12 rounded-full object-cover border-2 border-brand-100 dark:border-darkbg-border"
          />
        ) : (
          <div class="h-12 w-12 rounded-full bg-brand-50 dark:bg-brand-950/20 flex items-center justify-center border-2 border-brand-200 dark:border-darkbg-border">
            <Heart class="h-6 w-6 text-brand-pure fill-brand-200 dark:fill-brand-900" />
          </div>
        )}

        <div class="flex-1 min-w-0 pr-8">
          <h3 class="font-bold text-lg text-slate-800 dark:text-slate-100 truncate">{user?.name || 'Anonymous Donor'}</h3>
          <div class="flex items-center gap-1.5 mt-0.5">
            <span class={`h-2 w-2 rounded-full ${status === 'Available' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
            <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{status}</span>
          </div>
        </div>
      </div>

      <div class="space-y-3.5 my-5 text-sm text-slate-600 dark:text-slate-300">
        <div class="flex items-start gap-2.5">
          <MapPin class="h-4.5 w-4.5 text-brand-pure shrink-0 mt-0.5" />
          <span class="truncate">{city}, {district}, {state}</span>
        </div>
        <div class="flex items-center gap-2.5">
          <Calendar class="h-4.5 w-4.5 text-brand-pure shrink-0" />
          <span>Last Donated: {formatDate(lastDonationDate)}</span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-darkbg-border">
        <a
          href={`tel:${phone}`}
          class="btn-secondary px-3 py-2 text-xs flex items-center justify-center gap-1.5 border-slate-200/80 dark:border-darkbg-border hover:border-brand-pure hover:text-brand-pure dark:hover:border-brand-pure dark:hover:text-brand-pure"
        >
          <Phone class="h-3.5 w-3.5" />
          Call
        </a>
        <a
          href={`mailto:${user?.email}`}
          class="btn-primary px-3 py-2 text-xs flex items-center justify-center gap-1.5"
        >
          <Mail class="h-3.5 w-3.5" />
          Email
        </a>
      </div>
    </motion.div>
  );
};

export default DonorCard;
