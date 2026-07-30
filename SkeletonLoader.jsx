import React from 'react';

export const CardSkeleton = () => {
  return (
    <div class="glass-card p-6 rounded-2xl flex flex-col gap-4 animate-pulse">
      <div class="flex items-center gap-4">
        <div class="h-12 w-12 rounded-full bg-slate-200 dark:bg-darkbg-border"></div>
        <div class="flex-1 space-y-2">
          <div class="h-4 bg-slate-200 dark:bg-darkbg-border rounded w-3/4"></div>
          <div class="h-3 bg-slate-200 dark:bg-darkbg-border rounded w-1/2"></div>
        </div>
      </div>
      <div class="space-y-2 pt-2">
        <div class="h-3 bg-slate-200 dark:bg-darkbg-border rounded w-full"></div>
        <div class="h-3 bg-slate-200 dark:bg-darkbg-border rounded w-5/6"></div>
      </div>
      <div class="h-10 bg-slate-200 dark:bg-darkbg-border rounded-lg mt-2"></div>
    </div>
  );
};

export const TableSkeleton = ({ rows = 5 }) => {
  return (
    <div class="w-full bg-white dark:bg-darkbg-card border border-slate-200 dark:border-darkbg-border rounded-xl p-4 space-y-3 animate-pulse">
      <div class="flex justify-between border-b border-slate-200 dark:border-darkbg-border pb-3">
        <div class="h-4 bg-slate-200 dark:bg-darkbg-border rounded w-1/4"></div>
        <div class="h-4 bg-slate-200 dark:bg-darkbg-border rounded w-1/4"></div>
        <div class="h-4 bg-slate-200 dark:bg-darkbg-border rounded w-1/4"></div>
      </div>
      {Array(rows).fill(0).map((_, i) => (
        <div key={i} class="flex justify-between items-center py-2">
          <div class="h-3 bg-slate-200 dark:bg-darkbg-border rounded w-1/5"></div>
          <div class="h-3 bg-slate-200 dark:bg-darkbg-border rounded w-1/4"></div>
          <div class="h-3 bg-slate-200 dark:bg-darkbg-border rounded w-1/6"></div>
        </div>
      ))}
    </div>
  );
};

export const StatsSkeleton = () => {
  return (
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
      {Array(4).fill(0).map((_, i) => (
        <div key={i} class="glass-card p-6 rounded-2xl flex flex-col gap-2">
          <div class="h-4 bg-slate-200 dark:bg-darkbg-border rounded w-1/2"></div>
          <div class="h-8 bg-slate-200 dark:bg-darkbg-border rounded w-1/3 mt-2"></div>
        </div>
      ))}
    </div>
  );
};
