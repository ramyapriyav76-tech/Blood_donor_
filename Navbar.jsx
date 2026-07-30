import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Heart, Sun, Moon, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setProfileDropdown(false);
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/find-donor', label: 'Find Donor' },
    { path: '/become-donor', label: 'Become Donor' },
    { path: '/requests', label: 'Blood Requests' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav class="sticky top-0 z-50 glass-nav shadow-sm select-none transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" class="flex items-center gap-2">
            <div class="h-10 w-10 rounded-full bg-brand-pure flex items-center justify-center shadow-lg shadow-brand-pure/30">
              <Heart class="h-6 w-6 text-white fill-white animate-pulse" />
            </div>
            <span class="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-brand-pure to-red-500 bg-clip-text text-transparent">
              Lifeline
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div class="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                class={({ isActive }) =>
                  `text-sm font-semibold tracking-wide transition-colors duration-200 hover:text-brand-pure ${
                    isActive
                      ? 'text-brand-pure border-b-2 border-brand-pure pb-1'
                      : 'text-slate-600 dark:text-slate-300'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Theme Switcher & Auth Section */}
          <div class="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              class="p-2.5 rounded-lg border border-slate-200/50 hover:bg-slate-100 dark:border-darkbg-border dark:hover:bg-darkbg-border transition-all duration-200"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun class="h-5 w-5 text-amber-500" /> : <Moon class="h-5 w-5 text-slate-600" />}
            </button>

            {user ? (
              <div class="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  class="flex items-center gap-2 p-1.5 rounded-full border border-slate-200/50 dark:border-darkbg-border hover:bg-slate-100 dark:hover:bg-darkbg-border transition-all duration-200"
                >
                  {user.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt="profile"
                      class="h-8 w-8 rounded-full object-cover border border-brand-pure"
                    />
                  ) : (
                    <div class="h-8 w-8 rounded-full bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center">
                      <User class="h-4 w-4 text-brand-pure" />
                    </div>
                  )}
                  <span class="text-sm font-medium pr-2 max-w-[120px] truncate">{user.name}</span>
                </button>

                {profileDropdown && (
                  <div class="absolute right-0 mt-2 w-52 rounded-xl border border-slate-200/50 dark:border-darkbg-border bg-white dark:bg-darkbg-card shadow-2xl p-1.5 flex flex-col gap-1 z-50">
                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdown(false)}
                      class="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-darkbg-border transition-colors duration-200"
                    >
                      <User class="h-4 w-4" />
                      My Profile
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={() => setProfileDropdown(false)}
                        class="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-darkbg-border transition-colors duration-200"
                      >
                        <LayoutDashboard class="h-4 w-4" />
                        Admin Panel
                      </Link>
                    )}
                    <hr class="border-slate-200 dark:border-darkbg-border my-1" />
                    <button
                      onClick={handleLogout}
                      class="flex items-center gap-2.5 w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors duration-200"
                    >
                      <LogOut class="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div class="flex items-center gap-2">
                <Link to="/login" class="btn-secondary px-4 py-2 text-sm">
                  Sign In
                </Link>
                <Link to="/register" class="btn-primary px-4 py-2 text-sm">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div class="flex md:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              class="p-2 rounded-lg border border-slate-200/50 hover:bg-slate-100 dark:border-darkbg-border dark:hover:bg-darkbg-border transition-all duration-200"
            >
              {darkMode ? <Sun class="h-5 w-5 text-amber-500" /> : <Moon class="h-5 w-5 text-slate-600" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              class="p-2 rounded-lg border border-slate-200/50 hover:bg-slate-100 dark:border-darkbg-border dark:hover:bg-darkbg-border transition-all duration-200 text-slate-600 dark:text-slate-300"
            >
              {isOpen ? <X class="h-6 w-6" /> : <Menu class="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div class="md:hidden border-t border-slate-200/50 dark:border-darkbg-border/50 bg-white dark:bg-darkbg-base px-4 py-3 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              class="px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-darkbg-border transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <hr class="border-slate-200 dark:border-darkbg-border my-1" />
          {user ? (
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-3 px-3 py-2">
                {user.profilePic ? (
                  <img src={user.profilePic} alt="profile" class="h-9 w-9 rounded-full object-cover" />
                ) : (
                  <div class="h-9 w-9 rounded-full bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center">
                    <User class="h-5 w-5 text-brand-pure" />
                  </div>
                )}
                <div>
                  <div class="text-sm font-semibold">{user.name}</div>
                  <div class="text-xs text-slate-500 dark:text-slate-400">{user.email}</div>
                </div>
              </div>
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                class="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-darkbg-border"
              >
                <User class="h-4 w-4" />
                My Profile
              </Link>
              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  class="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-darkbg-border"
                >
                  <LayoutDashboard class="h-4 w-4" />
                  Admin Panel
                </Link>
              )}
              <button
                onClick={handleLogout}
                class="flex items-center gap-2.5 w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20"
              >
                <LogOut class="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : (
            <div class="grid grid-cols-2 gap-2 pt-2">
              <Link to="/login" onClick={() => setIsOpen(false)} class="btn-secondary text-sm">
                Sign In
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)} class="btn-primary text-sm">
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
