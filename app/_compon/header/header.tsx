'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import style from './header.module.scss';
const NAVLINK = [
  {
    href: '/popular',
    key: 'Популярне',
  },
  {
    href: '/books',
    key: 'Книги',
  },
  {
    href: '/search',
    key: 'Пошук',
  },
];

const Header = () => {
  const pathname = usePathname();
  return (
    <header>
      <nav>
        <ul className={style.navigation}>
          {NAVLINK.map(navigation => {
            const isActive = pathname === navigation.href;
            return (
              <li key={navigation.key}>
                <Link href={navigation.href}>
                  <h3 className={isActive ? style.link : style.isActive}>
                    {navigation.key}
                  </h3>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
