/* eslint-disable react/no-unescaped-entities */
"use client";

import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white py-24 px-6 border-t border-neutral-200 dark:border-neutral-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div>
          <h2 className="text-[10vw] leading-none font-black tracking-tighter text-neutral-200 dark:text-neutral-800 select-none">
            LET'S TALK
          </h2>
        </div>
        
        <div className="flex flex-col gap-6">
          <div className="flex gap-4">
            <a href="#" className="p-4 rounded-full bg-neutral-200 dark:bg-neutral-900 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="p-4 rounded-full bg-neutral-200 dark:bg-neutral-900 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="p-4 rounded-full bg-neutral-200 dark:bg-neutral-900 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className="p-4 rounded-full bg-neutral-200 dark:bg-neutral-900 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300">
              <Mail className="w-6 h-6" />
            </a>
          </div>
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} MethminPulsara. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
