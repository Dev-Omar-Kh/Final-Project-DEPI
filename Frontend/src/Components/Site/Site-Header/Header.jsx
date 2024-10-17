import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Search from './Search-Bar/Search';


import { FaFacebookF , FaYoutube , FaInstagram , FaLinkedinIn , FaRegUser} from "react-icons/fa";
import { MdOutlineShoppingBag , MdOutlineMessage } from "react-icons/md";
import { IoSearchSharp , IoHome } from "react-icons/io5";
import { PiBooksFill } from "react-icons/pi";
import { BiSolidOffer } from "react-icons/bi";
import { GrArticle } from "react-icons/gr";

import headerCSS from './header.module.css';
import './active.css';

export default function Header({height}) {

    // ====== handel-height-nav-on-phone-view ====== //

    const [containerHeight, setContainerHeight] = useState(0);
    const [topHeaderHeight, setTopHeaderHeight] = useState(0);

    useEffect(() => {

        const headerCont = document.getElementById('headerCont');
        const navBar = document.getElementById('navBar');

        const handleScreenWidth = () => {

            if (headerCont) {

                const headerHeight = headerCont.offsetHeight;

                setContainerHeight(headerHeight - topHeaderHeight);
                height(headerHeight);

                if (navBar) {

                    if (window.innerWidth <= 770) {
                        navBar.style.top = `${containerHeight}px`;
                        navBar.style.height = `calc(100vh - ${containerHeight}px)`;
                    } else {
                        navBar.style.top = '';
                        navBar.style.height = '';
                    }

                }

            }

        };

        handleScreenWidth();
        window.addEventListener('resize', handleScreenWidth);

        return () => {

            window.removeEventListener('resize', handleScreenWidth);

        };

    } , [containerHeight , height , topHeaderHeight]);

    // ====== nav-for-phone-&-manage-scroll ====== //

    const [scrollValueY, setScrollValueY] = useState(0);

    useEffect(() => {

        const navPh = document.getElementById('nav_ph');
        const navBar = document.getElementById('navBar');
        const topHeader = document.getElementById('topHeader');
        const headerCont = document.getElementById('headerCont');

        navPh.onclick = () => {

            navPh.classList.toggle(headerCSS.change);
            navBar.classList.toggle(headerCSS.display_nav);

        }

        navBar.onclick = () => {

            navPh.classList.toggle(headerCSS.change);
            navBar.classList.toggle(headerCSS.display_nav);

        }

        topHeader.onclick = () => {

            navPh.classList.remove(headerCSS.change);
            navBar.classList.remove(headerCSS.display_nav);

        }

        const handleHeaderTop = () => {

            const scrollY = window.scrollY;

            if(scrollY > scrollValueY){

                setTopHeaderHeight(topHeader.offsetHeight + 2);

                headerCont.style.top = - topHeaderHeight + 'px';

            }
            else if(scrollY < scrollValueY){

                setTopHeaderHeight(0);

                headerCont.style.top = '0px';

            }

            setScrollValueY(scrollY);

        }

        window.addEventListener('scroll' , handleHeaderTop);

        return () => {

            window.removeEventListener('scroll' , handleHeaderTop);

        }

    } , [scrollValueY , topHeaderHeight]);

    // ====== display-search-icon ====== //

    const [viewSearch, setViewSearch] = useState(false);

    return <React.Fragment>

        <AnimatePresence>
            {viewSearch && <Search display={setViewSearch} />}
        </AnimatePresence>

        <div id='headerCont' className={headerCSS.container}>

            <div id='topHeader' className={headerCSS.top_header}>

                <div className={headerCSS.social_icons}>

                    <a 
                        href="https://www.facebook.com/depi.gov.egy" 
                        rel="noreferrer" target='_blank' title='Facebook'
                    >
                        <FaFacebookF />
                    </a>
                    <a 
                        href="https://www.youtube.com/@depi.gov.eg." 
                        rel="noreferrer" target='_blank' title='Youtube'
                    >
                        <FaYoutube />
                    </a>
                    <a 
                        href="https://www.instagram.com/depi.gov.eg?igshid=MWI0aGl5bTBpdWZkcQ" 
                        rel="noreferrer" target='_blank' title='Instagram'
                    >
                        <FaInstagram />
                    </a>
                    <a 
                        href="https://www.linkedin.com/company/digital-egypt-pioneers-initiative-depi/" 
                        rel="noreferrer" target='_blank' title='LinkedIn'
                    >
                        <FaLinkedinIn />
                    </a>

                </div>

                <span className={headerCSS.line}></span>

                <div className={headerCSS.user_info}>

                    <Link to={'/register'} className={headerCSS.user_info_box}>

                        <FaRegUser className={headerCSS.info_icon} />
                        <p>Account</p>

                    </Link>

                    <div className={headerCSS.user_info_box}>

                        <MdOutlineShoppingBag className={headerCSS.info_icon} />
                        <p>Cart</p>

                    </div>

                    <div onClick={() => setViewSearch(true)} className={headerCSS.user_info_box}>

                        <IoSearchSharp className={headerCSS.info_icon} />
                        <p>Search</p>

                    </div>

                </div>

            </div>

            <header className={headerCSS.header}>

                <Link to={'/'} className={headerCSS.logo}>

                    <img src={require('../../../Images/logo.png')} alt="" />

                </Link>

                <div id='nav_ph' className={headerCSS.nav_ph}>

                    <span className={headerCSS.nav_span}></span>
                    <span className={headerCSS.nav_span}></span>
                    <span className={headerCSS.nav_span}></span>

                </div>

                <nav id='navBar' className={headerCSS.nav}>

                    <ul>

                        <NavLink to={'/'} className={'site_header'}>
                            <IoHome />
                            <li>Home</li>
                        </NavLink>

                        <NavLink to={'/books'} className={'site_header'}>
                            <PiBooksFill />
                            <li>Books</li>
                        </NavLink>

                        <NavLink to={'/offers'} className={'site_header'}>
                            <BiSolidOffer />
                            <li>Offers</li>
                        </NavLink>

                        <NavLink to={'/newsletter'} className={'site_header'}>
                            <GrArticle />
                            <li>Newsletter</li>
                        </NavLink>

                        <NavLink to={'/suggestBook'} className={'site_header'}>
                            <MdOutlineMessage />
                            <li>Suggest</li>
                        </NavLink>

                    </ul>

                </nav>

            </header>

        </div>

    </React.Fragment>

}