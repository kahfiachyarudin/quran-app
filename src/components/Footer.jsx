export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-16">
      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* BRAND */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-emerald-600">
              Al-Bayan
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Al-Qur'an Digital untuk kemudahan membaca dan memahami.
            </p>
          </div>

          {/* SOCIAL MEDIA */}
          <div className="flex gap-4">
            
            {/* Instagram */}
           <div className="flex items-center gap-4">
  {/* Instagram */}
  <a
    href="https://www.instagram.com/sk3choo/"
    target="_blank"
    rel="noopener noreferrer"
    className="group p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md"
    title="Instagram sk3choo"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
      className="text-slate-600 dark:text-slate-300 group-hover:text-white transition-colors duration-300"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4l0 -8" />
      <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
      <path d="M16.5 7.5v.01" />
    </svg>
  </a>

  {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/in/muhammad-kahfi-537941377/"
    target="_blank"
    rel="noopener noreferrer"
    className="group p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#0077b5] transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md"
    title="LinkedIn Muhammad Kahfi"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
      className="text-slate-600 dark:text-slate-300 group-hover:text-white transition-colors duration-300"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M8 11v5" />
      <path d="M8 8v.01" />
      <path d="M12 16v-5" />
      <path d="M16 16v-3a2 2 0 1 0 -4 0" />
      <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10" />
    </svg>
  </a>

  {/* GitHub */}
  <a
    href="https://github.com/kahfiachyarudin"
    target="_blank"
    rel="noopener noreferrer"
    className="group p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#333] dark:hover:bg-[#f0f6fc] transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md"
    title="GitHub kahfiachyarudin"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
      className="text-slate-600 dark:text-slate-300 group-hover:text-white dark:group-hover:text-black transition-colors duration-300"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
    </svg>
  </a>
</div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

        {/* BOTTOM */}
        <div className="text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-medium text-gray-500 dark:text-gray-300">
            Al-Bayan
          </span>
          . All rights reserved.
        </div>

      </div>
    </footer>
  );
}