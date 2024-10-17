import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import FakeNews from './News';

import { GrArticle } from 'react-icons/gr';
import { IoHome } from 'react-icons/io5';

import newsCSS from './news.module.css';

export default function Newsletter() {

    // ====== display-news-box-for-phone ====== //

    const [displayBook, setDisplayBook] = useState(false);

    // ====== framer-motion ====== //

    const ParentVariants = {

        hidden: {opacity: 0},
        visible: {opacity: 1 , transition: {duration: 0.3}}

    }

    const leftVariants = {

        hidden: {opacity: 0},
        visible: {opacity: 1 , transition: {duration: 0.3}}

    }

    // console.log(FakeNews[0].description.split(' '));

    return <React.Fragment>

        <motion.div variants={ParentVariants} initial='hidden' animate='visible' className={newsCSS.container}>

            <span 
                onClick={() => setDisplayBook(false)} 
                className={`${newsCSS.bg_ph_cont} ${displayBook ? newsCSS.display_bg_ph_cont : ''}`}
            ></span>

            <motion.div variants={leftVariants} className={`${newsCSS.news_cont} ${displayBook ? newsCSS.display_news_cont : ''}`}>

                <div className={newsCSS.cont_title}>

                    <GrArticle className={newsCSS.cont_icon} />
                    News box

                </div>

                <div className={newsCSS.news_cards_cont}>

                    {FakeNews.map(news => <NavLink to={news._id} key={news._id} onClick={() => setDisplayBook(false)} className={newsCSS.news_card}>
                        <div className={newsCSS.card_head}>
                            <p className={newsCSS.card_title}>
                                {news.title.split(' ').slice(0, 5).join(' ') + (news.title.split(' ').length > 4 ? '...' :'')}
                            </p>
                            <p className={newsCSS.card_date}>{news.date}</p>
                        </div>
                        <p className={newsCSS.card_des}>
                            {news.description.split(" ").filter(word => word.trim() !== '').slice(0, 5).join(' ') + '...'}
                        </p>
                    </NavLink>)}

                </div>

                <motion.div whileTap={{scale: 0.95}} className={newsCSS.return_home}>

                    <Link to={'/'}><IoHome /> Go to home</Link>

                </motion.div>

            </motion.div>

            {/* <motion.div variants={rightVariants} className={newsCSS.news_det}>

                <div className={newsCSS.news_det_title}>

                    <div className={newsCSS.news_title_det}>
                        <p className={newsCSS.title_det_name}>Omar Khaled Mohamed Said</p>
                        <p className={newsCSS.title_det_date}>10-18-2024</p>
                    </div>

                    <motion.div whileTap={{scale: 0.8}} onClick={() => setDisplayBook(true)} className={newsCSS.burger_phone}>
                        <FaListUl />
                    </motion.div>

                </div>

                <div className={newsCSS.news_det_message}>

                    <div className={newsCSS.news_det_message_cont}>

                        <p>
                            Hello Everyone
                            <br />
                            <br />
                            A new book titled "House of Sky" 
                            by renowned author Sarah J. Maas has just been released in the Fantasy category. 
                            The story follows Bryce Quinlan and Hunt Athalar 
                            as they try to return to normal life after saving Crescent City. 
                            With the Asteri keeping their word to leave them alone, Bryce and Hunt are hoping for 
                            a chance to relax and figure out their future. However, as rebels rise against the Asteri's power, 
                            Bryce and Hunt are faced with a critical choice: stay silent or fight for justice. 
                            Get your copy now with a 5% discount. Price: 642 EGP.
                            <br />
                            <br />
                            With the Asteri keeping their word to leave them alone, Bryce and Hunt are hoping for 
                            a chance to relax and figure out their future. However, as rebels rise against the Asteri's power, 
                            Bryce and Hunt are faced with a critical choice: stay silent or fight for justice. 
                            Get your copy now with a 5% discount. Price: 642 EGP.
                            <br />
                            <br />
                            The story follows Bryce Quinlan and Hunt Athalar 
                            as they try to return to normal life after saving Crescent City. 
                            With the Asteri keeping their word to leave them alone.
                            <br />
                            <br />
                            <a href="http://localhost:3000/single_book/651a50f946a92da7981902f9" target='_blank' rel="noreferrer">
                                Gos to Shop
                            </a>
                        </p>

                    </div>

                </div>

            </motion.div> */}

            <Outlet context={setDisplayBook} />

        </motion.div>

    </React.Fragment>

}
