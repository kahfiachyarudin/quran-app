import { Outlet } from "react-router";

export default function Footer() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Outlet />
      <footer className="mt-12 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Al-Bayan. All rights reserved.
      </footer>
    </div>
  );
}