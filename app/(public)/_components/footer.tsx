'use client';

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[#1b1b1b] text-[#f3f3f3] py-8"
    >
      <div className="w-[90%] max-w-275 mx-auto flex flex-col items-center gap-4 text-center">
        
        {/* Brand */}
        <p className="text-xl font-semibold font-montserrat">
          <span className="text-[#ccc]">nurser</span>
          <span className="text-[#4caf50]">E</span>
        </p>

        {/* Links */}
        <ul className="flex gap-4 list-none p-0">
          <li>
            <a
              href="#about"
              className="text-[#ccc] text-[0.95rem] hover:text-[#a5d6a7] transition-colors duration-300 font-montserrat"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#shop"
              className="text-[#ccc] text-[0.95rem] hover:text-[#a5d6a7] transition-colors duration-300 font-montserrat"
            >
              Shop
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-[#ccc] text-[0.95rem] hover:text-[#a5d6a7] transition-colors duration-300 font-montserrat"
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Copyright */}
        <p className="text-[0.8rem] text-[#777] font-montserrat">
          © {new Date().getFullYear()} nurserE. All rights reserved.
        </p>
      </div>
    </footer>
  );
}