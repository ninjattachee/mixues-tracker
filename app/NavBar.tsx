'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { BiSolidBug } from "react-icons/bi";
import classnames from 'classnames';
import { Box } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';

interface NavLink {
    href: string;
    label: string;
}

const navLinks: NavLink[] = [
    { href: "/", label: "Dashboard" },
    { href: "/issues/list", label: "Issues" },
];

const NavBar = () => {
    const pathname = usePathname();
    const { status, data: session } = useSession();

    return (
        <nav className='flex space-x-6 border-b-2 mb-2 px-4 py-2'>
            <Link href="/">
                <BiSolidBug size={22} color="grey" />
            </Link>
            <ul className='flex space-x-4'>
                {navLinks.map((link) => (
                    <li key={link.href}>
                        <Link
                            key={link.href}
                            className={classnames(
                                'hover:text-zinc-800 transition-colors duration-200',
                                {
                                    'text-zinc-900': pathname === link.href,
                                    'text-zinc-500': pathname !== link.href
                                }
                            )}
                            href={link.href}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
            <Box>
                {
                    status === 'loading' ? 'Loading...' :
                        status === 'unauthenticated' ? <Link href="/api/auth/signin">Login</Link> :
                            <Link href="/api/auth/signout">Logout</Link>
                }
            </Box>
        </nav>
    )
}

export default NavBar
