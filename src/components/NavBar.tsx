
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import CTAButton from "./CTAButton";
import Logo from "./Logo";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Calculator", href: "#calculator" },
    { name: "Impact", href: "#impact" },
    { name: "Stories", href: "#stories" },
    { name: "Pledge", href: "#pledge" },
  ];

  return (
    <header
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex gap-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="font-medium text-gray-700 hover:text-eco-primary transition-colors duration-200"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <CTAButton size="sm">Join Movement</CTAButton>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
