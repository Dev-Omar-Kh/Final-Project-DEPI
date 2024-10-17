import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa6';

import footerCSS from './footer.module.css';

export default function Footer() {

    // ====== framer-motion ====== //

    const parentVariants = {

        hidden: {opacity: 0 , scale: 0.8},
        visible: {opacity: 1 , scale: 1 , transition: {duration: 0.3}}

    }

    return <React.Fragment>

        <motion.div 
            variants={parentVariants}
            initial='hidden' whileInView={'visible'} viewport={{once: true , amount: 0.2}}
            className={footerCSS.container}
        >

            <div className={footerCSS.main_side}>

                <Link>
                    <img src={require('../../../Images/logo.png')} alt="" />
                </Link>

                <p>
                    Welcome to our online bookstore, 
                    where book lovers can explore an extensive collection of titles across various genres. 
                    We offer great deals and fast shipping, 
                    ensuring your favorite reads arrive at your doorstep quickly. 
                    Join our community of readers and embark on your next literary adventure with us today!
                </p>

            </div>

            <div className={footerCSS.links_side}>

                <div className={footerCSS.links_card}>

                    <p>About Us</p>

                    <a href="https://www.linkedin.com/in/omar-khaled-developer2004/" target='_blank' rel='noreferrer'>
                        Omar Khaled
                    </a>
                    <a href="https://www.linkedin.com/in/mohamedhisham4u/" target='_blank' rel='noreferrer'>
                        Mohamed Hisham
                    </a>
                    <a href="https://www.linkedin.com/in/omar-khaled-developer2004/" target='_blank' rel='noreferrer'>
                        Mahmoud Hisham
                    </a>
                    <a href="https://www.linkedin.com/in/omar-khaled-developer2004/" target='_blank' rel='noreferrer'>
                        Ahmed Hisham
                    </a>

                </div>

                <div className={footerCSS.links_card}>

                    <p>Discover</p>

                    <Link>Home</Link>
                    <Link>Books</Link>
                    <Link>Offers</Link>
                    <Link>Newsletter</Link>

                </div>

                <div className={footerCSS.links_card}>

                    <p>My Account</p>

                    <Link>Log In</Link>
                    <Link>View Cart</Link>
                    <Link>My Wishlist</Link>
                    <Link>My Orders</Link>

                </div>

            </div>

            <div className={footerCSS.rights}>

                <p>© 2024 All rights reserved. Book Store Web App, powered by DEPI_M2D. ©</p>

                <div className={footerCSS.social_icons}>

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

            </div>

        </motion.div>

    </React.Fragment>

}
