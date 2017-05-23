import React from 'react'
import logo from '../images/logo.png'
import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar({ menus = [] }) {
    return (
        <div className="Navbar">
            <div className="Navbar--Content">
                <Link to="/">
                    <img className="Navbar--Logo" src={logo} alt="logo" />
                </Link>
                <div className="Navbar-Menus">
                    {menus.map(menu => (
                        <ul key={menu.name}>
                            {menu.items.map(item => (
                                <li key={item.id}>
                                    <Link to={item.object_slug}>
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>

            </div>
        </div>
    )
}
