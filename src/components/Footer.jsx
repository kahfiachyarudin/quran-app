export default function Footer() {
  return (
    <footer className="relative bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 transition-colors duration-500 overflow-hidden">
      
      {/* Background Glow Decor */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-center">
          
          {/* BRAND SECTION */}
          <div className="text-center md:text-left space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
                Al-Bayan<span className="text-blue-600">.</span>
              </h2>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed mx-auto md:mx-0">
              Menghadirkan pengalaman membaca Al-Qur'an digital yang bersih, modern, dan mudah diakses di mana saja.
            </p>
          </div>

          {/* QUICK LINKS / DECORATION (Optional but looks professional) */}
          <div className="hidden lg:flex justify-center">
            <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 dark:text-slate-700 mb-2">
                Created with Heart
              </p>
              <div className="h-1 w-12 bg-blue-600 mx-auto rounded-full"></div>
            </div>
          </div>

          {/* SOCIAL MEDIA SECTION */}
          <div className="flex flex-col items-center md:items-end gap-6">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600">
              Connect With Developer
            </p>
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/sk3choo/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] transition-all duration-500 shadow-sm"
                title="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-white transition-colors"><path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"/><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"/><path d="M16.5 7.5v.01"/></svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/muhammad-kahfi-537941377/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:bg-[#0077b5] transition-all duration-500 shadow-sm"
                title="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-white transition-colors"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/kahfiachyarudin"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:bg-slate-900 dark:hover:bg-white transition-all duration-500 shadow-sm"
                title="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-white dark:group-hover:text-slate-900 transition-colors"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-px w-full bg-slate-100 dark:bg-slate-900 my-10"></div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[11px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} — Made by <span className="text-slate-900 dark:text-slate-200">Kahfi Achyarudin</span>
          </div>
          
          <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em]">
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">Terms</a>
            <div className="flex items-center gap-2 text-blue-600">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              V1.0.2
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}