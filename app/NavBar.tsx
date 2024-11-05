'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { BiSolidBug } from "react-icons/bi";
import classnames from 'classnames';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import { Skeleton } from '@/app/components';

interface NavLink {
    href: string;
    label: string;
}

const navLinks: NavLink[] = [
    { href: "/", label: "Dashboard" },
    { href: "/issues/list", label: "Issues" },
];

const NavBar = () => {

    return (
        <nav className='border-b mb-2 px-4 py-2'>
            <Container>
                <Flex justify="between" align="center">
                    <Flex gap="4">
                        <Link href="/">
                            <BiSolidBug size={22} color="grey" />
                        </Link>
                        <NavLinks />
                    </Flex>
                    <AuthStatus />
                </Flex>
            </Container>
        </nav>
    )
}

const NavLinks = () => {
    const pathname = usePathname();

    return (
        <ul className='flex space-x-4'>
            {navLinks.map((link) => (
                <li key={link.href}>
                    <Link
                        key={link.href}
                        className={classnames({
                            'nav-link': true,
                            '!text-zinc-900': pathname === link.href,
                        })}
                        href={link.href}
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

const AuthStatus = () => {
    const { status, data: session } = useSession();

    if (status === 'loading') return <Skeleton width="3rem" height="1rem" />

    if (status === 'unauthenticated') return <Link className='nav-link' href="/api/auth/signin">Login</Link>

    return (
        <Box>
            {
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <Avatar
                            src={session?.user?.image || undefined}
                            fallback="?"
                            radius="full"
                            size="2"
                            className='cursor-pointer'
                        />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        <DropdownMenu.Label>
                            <Text>
                                {session?.user?.email}
                            </Text>
                        </DropdownMenu.Label>
                        <DropdownMenu.Item>
                            <Link href="/api/auth/signout">Logout</Link>
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            }
        </Box>
    )

}

export default NavBar