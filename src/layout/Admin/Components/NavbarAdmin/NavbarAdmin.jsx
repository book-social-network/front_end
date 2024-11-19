import React, { useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import { BsBook } from 'react-icons/bs';
import { MdGroups, MdOutlinePerson, MdCategory } from 'react-icons/md';
import { IoLogOutOutline } from 'react-icons/io5';
import '../../../../css/navbarAdmin.css';

const NavbarAdmin = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: <AiOutlineHome className="icon" /> },
    { name: 'Books', icon: <BsBook className="icon" /> },
    { name: 'Authors', icon: <MdOutlinePerson className="icon" /> },
    { name: 'Types of Book', icon: <MdCategory className="icon" /> },
    { name: 'Groups', icon: <MdGroups className="icon" /> },
    { name: 'Users', icon: <FiUsers className="icon" /> },
  ];

  const handleLogout = () => {
    console.log('Logged out');
  };

  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={activeItem === item.name ? 'active' : ''}
            onClick={() => setActiveItem(item.name)}
          >
            {item.icon}
            <span>{item.name}</span>
          </li>
        ))}
        {/* Mục Logout */}
        <li
          className="logout"
          onClick={handleLogout}
          style={{
            marginTop: 'auto',
            borderTop: '1px solid #ddd',
            paddingTop: '10px',
          }}
        >
          <IoLogOutOutline className="icon" />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default NavbarAdmin;
