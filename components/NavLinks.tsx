'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
    { name: 'FrontStage', href: '/frontstage' },
    { name: 'CenterStage', href: '/centerstage' },
    { name: 'BackStage', href: '/backstage' },
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                return (
                    <Link
                        key={link.name}
                        className={
                            clsx(
                                'font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600', {
                                'text-blue-500': pathname === link.href,
                                'text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500': pathname !== link.href,
                            }
                            )
                        }
                        href={link.href}
                        aria-current={pathname === link.href}
                    >
                        {link.name}
                    </Link>
                );
            })}
        </>
    );
}
