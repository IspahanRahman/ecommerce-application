import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'
import Admin from './svg-components/Admin';
import Dashboard from './svg-components/Dashboard';
import Product from './svg-components/Product';
import Order from './svg-components/Order';
import Setting from './svg-components/Setting';

const Nav = () => {
  const inactiveLink = 'flex gap-1 p-1';
  const activeLink = inactiveLink+' bg-white text-blue-900 rounded-l-lg';
  const router = useRouter();
  const {pathname} =router;
  return (
    <aside className='text-white p-4 pr-0'>
      <Link href='/' className='flex gap-1 mb-4 mr-4'>
        <Admin/>
        <span className=''>Ecommerce-Admin</span>
      </Link>
      <nav className='flex flex-col gap-2'>
        <Link href='/' className={pathname==='/'?activeLink:inactiveLink}>
          <Dashboard/>
          Dashboard
        </Link>
        <Link href='/products' className={pathname.includes('/products')?activeLink:inactiveLink}>
          <Product/>
          Products
        </Link>
        <Link href='/orders' className={pathname.includes('/orders')?activeLink:inactiveLink}>
          <Order/>
          Orders
        </Link>
        <Link href='/settings' className={pathname.includes('/settings')?activeLink:inactiveLink}>
          <Setting/>
          Settings
        </Link>
      </nav>
    </aside>
  )
}

export default Nav