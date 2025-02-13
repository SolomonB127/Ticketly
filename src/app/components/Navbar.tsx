"use client"
import { ArrowRightIcon, Menu, Ticket } from "lucide-react"
import Link from 'next/link'
import React, { useState } from 'react'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    }

    return (
        <header className="sticky top-0 z-50 border-b border-gray-400 shadow-lg backdrop-blur-md text-white bg-[#0E464F]">
            <nav aria-label="Main Navigation">
                <div className='mx-auto flex max-w-7xl items-center justify-between p-4'>
                    {/* Logo */}
                    <Link href="/" aria-label="Go to Homepage" className="flex">
                        <Ticket/>
                        <h1 className="font-black">Ticketly</h1>
                    </Link>

                    {/* Mobile Menu Icon */}
                    <button
                        className="cursor-pointer md:hidden"
                        aria-label="Open Mobile Menu"
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                        onClick={toggleMenu}
                    >
                        <Menu />
                    </button>

                    {/* Desktop Navigation */}
                    <ul className="text-l ml-20 hidden items-center space-x-8 font-semibold md:flex">
                        <li>
                            <Link href="#events" aria-label="Navigate to Our Events section">Events</Link>
                        </li>
                        <li>
                            <Link href="/tickets" aria-label="Navigate to Tickets page">
                                <button className="flex bg-white text-black font-black rounded-md p-2">My Tickets <ArrowRightIcon /></button>
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Mobile Menu */}
                <div
                    id="mobile-menu"
                    className={`fixed left-0 top-0 h-screen w-full flex-col justify-center bg-[#0E464F] text-xl transition-transform duration-500 ${isMenuOpen ? "flex animate-open-menu" : "hidden"}`}
                    aria-hidden={!isMenuOpen}
                >
                    <nav aria-label="Mobile Navigation" className="flex flex-col items-center py-16 font-bold">
                        {/* Close Icon */}
                        <button
                            onClick={toggleMenu}
                            className="absolute right-6 top-6 text-4xl"
                            aria-label="Close Mobile Menu"
                        >
                            &times;
                        </button>

                        {/* Links */}
                        <ul className="mt-8 flex flex-col items-center space-y-6">
                            <li>
                                <Link href="#events" aria-label="Navigate to Our Events section" onClick={toggleMenu}>Events</Link>
                            </li>
                            <li>
                                <Link href="/tickets" aria-label="Navigate to Tickets page" onClick={toggleMenu}>
                                    <button className="flex bg-white text-black font-black rounded-md p-2">My Tickets <ArrowRightIcon /></button>
                                </Link>
                        </li>
                        </ul>
                    </nav>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
