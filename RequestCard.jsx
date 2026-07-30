import React from 'react';
import { Phone, MapPin, Calendar, Activity, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const RequestCard = ({ request, onUpdateStatus, currentUserId }) => {
  const { _id, requester, patientName, age, bloodGroup, unitsNeeded, hospital, state, district, city, contactPhone, status, requiredDate, additionalNotes } = request;

  const getStatusColor = (s) => {
    switch (s) {
      case 'Pending': return 'bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-300';
      case 'Fulfilled': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300';
      case 'Cancelled': return 'bg-slate-100 text-slate-700 dark:bg-darkbg-border dark:text-slate-400';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isOwner = requester === currentUserId || requester?._id === currentUserId;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      class="glass-card p-6 rounded-2xl glow-hover relative overflow-hidden flex flex-col justify-between"
    >
      {/* Required Blood Group Ribbon */}
      <div class="absolute top-0 right-0 bg-red-600 text-white px-5 py-2.5 rounded-bl-2xl font-extrabold text-xl shadow-md flex items-center gap-1.5 animate-pulse">
        <Activity class="h-4.5 w-4.5" />
        {bloodGroup}
      </div>

      <div>
        <div class="flex items-center gap-2 mb-3">
          <span class={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(status)}`}>
            {status}
          </span>
          <span class="text-xs text-slate-400 dark:text-slate-500">
            {unitsNeeded} {unitsNeeded > 1 ? 'Units' : 'Unit'} Needed
          </span>
        </div>

        <h3 class="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1">{patientName}</h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">Patient Age: {age} yrs</p>

        <div class="space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <div class="flex items-start gap-2.5">
            <MapPin class="h-4.5 w-4.5 text-brand-pure shrink-0 mt-0.5" />
            <span>{hospital}, {city}, {state}</span>
          </div>
          <div class="flex items-center gap-2.5">
            <Calendar class="h-4.5 w-4.5 text-brand-pure shrink-0" />
            <span>Needed by: <strong class="text-red-600 dark:text-red-400">{formatDate(requiredDate)}</strong></span>
          </div>
          {additionalNotes && (
            <div class="flex items-start gap-2.5 bg-slate-50 dark:bg-darkbg-base p-3 rounded-lg border border-slate-100 dark:border-darkbg-border mt-3">
              <Info class="h-4.5 w-4.5 text-brand-pure shrink-0 mt-0.5" />
              <p class="text-xs italic leading-relaxed">{additionalNotes}</p>
            </div>
          )}
        </div>
      </div>

      <div class="mt-6 pt-4 border-t border-slate-100 dark:border-darkbg-border flex flex-col gap-2">
        <div class="flex gap-2">
          <a
            href={`tel:${contactPhone}`}
            class="btn-primary flex-1 py-2 text-sm flex items-center justify-center gap-2"
          >
            <Phone class="h-4 w-4" />
            Call Requester
          </a>
        </div>

        {isOwner && onUpdateStatus && status === 'Pending' && (
          <div class="grid grid-cols-2 gap-2 mt-1">
            <button
              onClick={() => onUpdateStatus(_id, 'Fulfilled')}
              class="px-2 py-1.5 rounded-lg border border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white dark:text-emerald-400 dark:hover:bg-emerald-500 dark:hover:text-white text-xs font-semibold transition-colors duration-150"
            >
              Mark Fulfilled
            </button>
            <button
              onClick={() => onUpdateStatus(_id, 'Cancelled')}
              class="px-2 py-1.5 rounded-lg border border-slate-300 text-slate-500 hover:bg-slate-200 dark:border-darkbg-border dark:text-slate-400 dark:hover:bg-slate-700 text-xs font-semibold transition-colors duration-150"
            >
              Cancel Request
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RequestCard;
