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
            <a
              href="#"
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-emerald-100 dark:hover:bg-emerald-800 transition text-black dark:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4l0 -8" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M16.5 7.5v.01" /></svg>
            </a>

            {/* Twitter */}
            <a
              href="#"
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-emerald-100 dark:hover:bg-emerald-800 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 11v5" /><path d="M8 8v.01" /><path d="M12 16v-5" /><path d="M16 16v-3a2 2 0 1 0 -4 0" /><path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10" /></svg>
            </a>

            {/* GitHub */}
            <a
              href="#"
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-emerald-100 dark:hover:bg-emerald-800 transition"
            >
              💻
            </a>

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