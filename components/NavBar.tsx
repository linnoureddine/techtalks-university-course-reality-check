import NavLink from "./NavLink";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="md:flex items-center justify-between w-full px-6 py-4 bg-white border-b border-gray-200 ">
      <div>
        <Link href="/" className="text-[#6155F5] text-2xl font-bold">
          Course Compass
        </Link>
      </div>
      <div className="flex gap-6">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/courses">Courses</NavLink>
        <NavLink href="/about">About</NavLink>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded px-3 py-1 text-black focus:outline-none focus:ring-2 focus:ring-[#6155F5]"
        />
        <button
          className="
          bg-[#6155F5] 
          text-white 
          px-4 py-1 
          rounded 
          hover:bg-[#503fdc] 
          transition-transform duration-200 
          hover:scale-105 
          hover:shadow-lg
        "
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
}
