import React from 'react'
import { Link, NavLink } from 'react-router-dom';

import { FaUsersViewfinder } from "react-icons/fa6";

import sideCSS from './sidebar.module.css';
import './active.css'
import { PiBooksFill } from 'react-icons/pi';
import { GrArticle } from 'react-icons/gr';
// import { MdOutlineMessage, MdOutlineShoppingBag } from 'react-icons/md';

export default function SideBar({display}) {

    return <React.Fragment>

        <div className={sideCSS.container}>

            <Link to={'/admin'} className={sideCSS.logo}>
                <img src={require('../../../Images/logo.png')} alt="" />
            </Link>

            <nav className={sideCSS.nav}>

                <ul>

                    <NavLink to={'users'} onClick={() => display(false)} className='side_bar_links'>
                        <FaUsersViewfinder className={sideCSS.side_bar_icon} />
                        <li>Users</li>
                    </NavLink>

                    <NavLink to={'books'} onClick={() => display(false)} className='side_bar_links'>
                        <PiBooksFill className={sideCSS.side_bar_icon} />
                        <li>Books</li>
                    </NavLink>

                    <NavLink to={'news'} onClick={() => display(false)} className='side_bar_links'>
                        <GrArticle className={sideCSS.side_bar_icon} />
                        <li>News</li>
                    </NavLink>

                    {/* <NavLink to={'orders'} onClick={() => display(false)} className='side_bar_links'>
                        <MdOutlineShoppingBag className={sideCSS.side_bar_icon} />
                        <li>Orders</li>
                    </NavLink>

                    <NavLink to={'suggestion'} onClick={() => display(false)} className='side_bar_links'>
                        <MdOutlineMessage className={sideCSS.side_bar_icon} />
                        <li>Suggestions</li>
                    </NavLink> */}

                </ul>

            </nav>

        </div>

    </React.Fragment>

}
