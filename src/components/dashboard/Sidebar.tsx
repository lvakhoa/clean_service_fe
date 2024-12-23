'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ADMIN_ENDPOINTS,
  CUSTOMER_ENDPOINTS,
  HELPER_ENDPOINTS,
} from '@/configs/endpoints';

type NavItemProps = {
  icon: string;
  activeIcon: string;
  label: string;
  href?: string;
  items?: Omit<NavItemProps, 'isActive'>[];
  isActive: boolean;
};

const NavItem: React.FC<NavItemProps> = ({
  icon,
  activeIcon,
  label,
  isActive,
  href,
  items,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleOpenDropdown = () => setOpenDropdown(!openDropdown);

  return href ? (
    <Link
      href={href}
      className={`flex gap-5 items-center px-5 py-4 w-48 max-w-full min-h-[50px] ${
        isActive ? 'text-white bg-blue-500 rounded-lg' : ''
      }`}
    >
      <img
        loading="lazy"
        src={isActive ? activeIcon : icon}
        alt=""
        className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
      />
      <div className="self-stretch my-auto">{label}</div>
    </Link>
  ) : (
    <div className="flex flex-col w-48 max-w-full min-h-[50px]">
      <button
        className={`flex justify-between items-center pl-5 pr-2 py-4 ${
          isActive || openDropdown ? 'text-white bg-blue-500 rounded-lg' : ''
        }`}
        onClick={handleOpenDropdown}
      >
        <div className="flex gap-5">
          <img
            loading="lazy"
            src={isActive || openDropdown ? activeIcon : icon}
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
          />
          <div className="self-stretch my-auto">{label}</div>
        </div>
        <img
          loading="lazy"
          src={
            isActive || openDropdown
              ? '/images/Dashboard/Sidebar/Active/Dropdown.svg'
              : '/images/Dashboard/Sidebar/InActive/Dropdown.svg'
          }
          alt=""
          className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
        />
      </button>
      {openDropdown && (
        <div style={{ marginLeft: 4 }} className="flex flex-col gap-2 px-5">
          {items &&
            items.map(
              (item) =>
                'href' in item &&
                item.href && (
                  <NavItem
                    key={item.label}
                    icon={item.icon}
                    activeIcon={item.activeIcon}
                    label={item.label}
                    href={item.href}
                    isActive={isActive}
                  />
                )
            )}
        </div>
      )}
    </div>
  );
};

type SidebarProps = {
  role?: RoleType;
};

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const pathname = usePathname();

  const adminNavItems: Omit<NavItemProps, 'isActive'>[] = [
    {
      icon: '/images/Dashboard/Sidebar/InActive/Chart.svg',
      activeIcon: '/images/Dashboard/Sidebar/Active/Chart.svg',
      label: 'Chart',
      href: ADMIN_ENDPOINTS.chart,
    },
    {
      icon: '/images/Dashboard/Sidebar/InActive/Order.svg',
      activeIcon: '/images/Dashboard/Sidebar/Active/Order.svg',
      label: 'Order',
      href: ADMIN_ENDPOINTS.order,
    },
    {
      icon: '/images/Dashboard/Sidebar/InActive/Customer.svg',
      activeIcon: '/images/Dashboard/Sidebar/Active/Customer.svg',
      label: 'Customer',
      href: ADMIN_ENDPOINTS.customer,
    },
    {
      icon: '/images/Dashboard/Sidebar/InActive/Employee.svg',
      activeIcon: '/images/Dashboard/Sidebar/Active/Employee.svg',
      label: 'Employee',
      href: ADMIN_ENDPOINTS.employee,
    },
    {
      icon: '/images/Dashboard/Sidebar/InActive/Service.svg',
      activeIcon: '/images/Dashboard/Sidebar/Active/Service.svg',
      label: 'Service',
      items: [
        {
          icon: '/images/Dashboard/Sidebar/InActive/ServiceType.svg',
          activeIcon: '/images/Dashboard/Sidebar/Active/ServiceType.svg',
          label: 'Type',
          href: ADMIN_ENDPOINTS.service_type,
        },
        {
          icon: '/images/Dashboard/Sidebar/InActive/Duration.svg',
          activeIcon: '/images/Dashboard/Sidebar/Active/Duration.svg',
          label: 'Duration ',
          href: ADMIN_ENDPOINTS.service_duration,
        },
        {
          icon: '/images/Dashboard/Sidebar/InActive/Room.svg',
          activeIcon: '/images/Dashboard/Sidebar/Active/Room.svg',
          label: 'Room ',
          href: ADMIN_ENDPOINTS.service_room,
        },
      ],
    },
    {
      icon: '/images/Dashboard/Sidebar/InActive/Feedback.svg',
      activeIcon: '/images/Dashboard/Sidebar/Active/Feedback.svg',
      label: 'Feedback',
      href: ADMIN_ENDPOINTS.feedback,
    },
    // {
    //   icon: '/images/Dashboard/Sidebar/InActive/Issue.svg',
    //   activeIcon: '/images/Dashboard/Sidebar/Active/Issue.svg',
    //   label: 'Issue',
    //   href: ADMIN_ENDPOINTS.issue,
    // },
    {
      icon: '/images/Dashboard/Sidebar/InActive/Refund.svg',
      activeIcon: '/images/Dashboard/Sidebar/Active/Refund.svg',
      label: 'Refund',
      href: CUSTOMER_ENDPOINTS.refund,
    },
  ];

  const customerNavItems: Omit<NavItemProps, 'isActive'>[] = [
    {
      icon: '/images/Dashboard/Sidebar/InActive/Personal.svg',
      activeIcon: '/images/Dashboard/Sidebar/Active/Personal.svg',
      label: 'Personal',
      href: CUSTOMER_ENDPOINTS.personal,
    },
    {
      icon: '/images/Dashboard/Sidebar/InActive/OrderHistory.svg',
      activeIcon: '/images/Dashboard/Sidebar/Active/OrderHistory.svg',
      label: 'Order History',
      href: CUSTOMER_ENDPOINTS.order_history,
    },
    {
      icon: '/images/Dashboard/Sidebar/InActive/Calendar.svg',
      activeIcon: '/images/Dashboard/Sidebar/Active/Calendar.svg',
      label: 'Calendar',
      href: CUSTOMER_ENDPOINTS.calendar,
    },
    {
      icon: '/images/Dashboard/Sidebar/InActive/Feedback.svg',
      activeIcon: '/images/Dashboard/Sidebar/Active/Feedback.svg',
      label: 'Feedback',
      href: CUSTOMER_ENDPOINTS.feedback,
    },
    {
      icon: '/images/Dashboard/Sidebar/InActive/Refund.svg',
      activeIcon: '/images/Dashboard/Sidebar/Active/Refund.svg',
      label: 'Refund',
      href: CUSTOMER_ENDPOINTS.refund,
    },
  ];

  const helperNavItems: Omit<NavItemProps, 'isActive'>[] = [
    {
      icon: '/images/Dashboard/Sidebar/InActive/Personal.svg',
      activeIcon: '/images/Dashboard/Sidebar/Active/Personal.svg',
      label: 'Personal',
      href: HELPER_ENDPOINTS.personal,
    },
    // {
    //   icon: '/images/Dashboard/Sidebar/InActive/Feedback.svg',
    //   activeIcon: '/images/Dashboard/Sidebar/Active/Feedback.svg',
    //   label: 'Feedback',
    //   href: HELPER_ENDPOINTS.feedback,
    // },
    {
      icon: '/images/Dashboard/Sidebar/InActive/JobHistory.svg',
      activeIcon: '/images/Dashboard/Sidebar/Active/JobHistory.svg',
      label: 'Job History',
      href: HELPER_ENDPOINTS.job_history,
    },
    {
      icon: '/images/Dashboard/Sidebar/InActive/Calendar.svg',
      activeIcon: '/images/Dashboard/Sidebar/Active/Calendar.svg',
      label: 'Calendar',
      href: HELPER_ENDPOINTS.calendar,
    },
  ];

  const navItems =
    role === 'Admin'
      ? adminNavItems
      : role === 'Customer'
      ? customerNavItems
      : role === 'Helper'
      ? helperNavItems
      : [];

  return (
    <aside className="fixed md:static top-0 left-0 z-40 min-h-screen w-[85%] md:w-[16%] 
          transform transition-transform duration-300 ease-in-out bg-white">
      <nav className="flex flex-col items-center px-5 pt-5 mx-auto w-full font-Averta-Bold tracking-wide whitespace-nowrap bg-white min-h-screen text-stone-600 max-md:pb-24">
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            activeIcon={item.activeIcon}
            label={item.label}
            href={item.href}
            items={item.items}
            isActive={pathname === item.href}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
