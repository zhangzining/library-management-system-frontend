'use client';

import {DocumentDuplicateIcon, HomeIcon, InboxIcon, UserGroupIcon,} from '@heroicons/react/24/outline';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import clsx from 'clsx';
import {useAdminAuth, useAppSelector} from "@/app/lib/hooks";
import {selectUserInfo} from "@/app/lib/features/userInfoSlice";

const links = [
  { name: '报表',
    href: '/management',
    icon: HomeIcon,
    permission: 'ADMIN'
  },
  {
    name: '图书管理',
    href: '/management/books',
    icon: DocumentDuplicateIcon,
    permission: 'BOOK_MANAGE'
  },
  {
    name: '借阅管理',
    href: '/management/borrow',
    icon: InboxIcon,
    permission: 'LENDING_MANAGE'
  },
  {
    name: '用户管理',
    href: '/management/users',
    icon: UserGroupIcon,
    permission: 'ADMIN_USER_MANAGE'
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  const roles = useAppSelector(selectUserInfo).roles || []

  return (
    <>
      {links.map((link) => {
        if (!roles.includes(link.permission)){
          return null
        }

        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
