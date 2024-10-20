import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

import { GrArticle } from 'react-icons/gr';
import { IoHome } from 'react-icons/io5';

import newsCSS from './news.module.css';
import errorHandleCSS from '../../../Styles/db_tables.module.css';
import './active.css';
import { Axios, GetNews } from '../../../API/Api';
import { useQuery } from 'react-query';
import { ThreeCircles } from 'react-loader-spinner';
import { BiErrorAlt } from 'react-icons/bi';

export default function Newsletter() {

    // ====== get-all-books ====== //

    const getAllNewsSite = async() => {

        return await Axios.get(`${GetNews}` , {withCredentials: true});

    }

    const {data , isLoading , isError} = useQuery('getAllNewsSite' , getAllNewsSite);

    const news = data?.data.data;

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

                {isLoading ? <div style={{
                    width: '100%', height: '100%' , display: 'flex', alignItems: 'center' , justifyContent: 'center'
                }}>
                    <ThreeCircles
                        visible={true} height="50" width="50" color="var(--active-color)"
                        ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                    />
                </div> : (isError ? <div className={errorHandleCSS.empty_doc}>

                    <BiErrorAlt />
                    <h3>Can't get news</h3>

                </div> : <div className={newsCSS.news_cards_cont}>

                    {news.map(news => <NavLink to={news._id} key={news._id} 
                        onClick={() => setDisplayBook(false)} 
                        id='news' className={newsCSS.news_card}
                    >
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

                </div>)}

                <motion.div whileTap={{scale: 0.95}} className={newsCSS.return_home}>

                    <Link to={'/'}><IoHome /> Go to home</Link>

                </motion.div>

            </motion.div>

            <Outlet context={setDisplayBook} />

        </motion.div>

    </React.Fragment>

}
