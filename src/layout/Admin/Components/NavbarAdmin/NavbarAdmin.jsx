import React, { useState } from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { MdGroups, MdOutlinePerson, MdCategory } from 'react-icons/md'
import { IoLogOutOutline } from 'react-icons/io5'
import { BsFilePost } from 'react-icons/bs'
import { ImUsers } from "react-icons/im";
import { PiBooksFill } from "react-icons/pi";
import '../../../../css/navbarAdmin.css'

const NavbarAdmin = ({ onSelect }) => {
  const [activeItem, setActiveItem] = useState('Dashboard')

  const menuItems = [
    { name: 'Dashboard', icon: <AiOutlineHome className="icon" /> },
    { name: 'Books', icon: <PiBooksFill className="icon" /> },
    { name: 'Authors', icon: <MdOutlinePerson className="icon" /> },
    { name: 'Types of Book', icon: <MdCategory className="icon" /> },
    { name: 'Groups', icon: <MdGroups className="icon" /> },
    { name: 'Users', icon: <ImUsers className="icon" /> },
    { name: 'Posts', icon: <BsFilePost className="icon" /> },
  ]

  const handleClick = (itemName) => {
    setActiveItem(itemName)
    onSelect(itemName) // Gọi hàm truyền từ HomePageAdmin
  }

  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={activeItem === item.name ? 'active' : ''}
            onClick={() => handleClick(item.name)}
          >
            {item.icon}
            <span>{item.name}</span>
          </li>
        ))}
        <li
          className="logout"
          onClick={() => console.log('Logged out')}
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
  )
}

export default NavbarAdmin
