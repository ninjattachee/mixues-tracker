import Link from 'next/link'
import React from 'react'
import { BiSolidBug } from "react-icons/bi";

interface NavLink {
    href: string;
    label: string;
}

const navLinks: NavLink[] = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" }
];

const NavBar = () => {

    return (
        <nav className='flex space-x-6 border-b-2 mb-2 px-4 py-2'>
            <Link href="/">
                <BiSolidBug size={22} color="grey" />
            </Link>
            <ul className='flex space-x-4'>
                {navLinks.map((link) => (
                    <Link key={link.href} className='text-zinc-500 hover:text-zinc-800 transition-colors duration-200' href={link.href}>
                        {link.label}
                    </Link>
                ))}
            </ul>
        </nav>
    )
}

export default NavBar
