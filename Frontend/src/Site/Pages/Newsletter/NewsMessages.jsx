import React, { useEffect, useState } from 'react';

import newsCSS from './news.module.css';
import { motion } from 'framer-motion';
import { FaListUl } from 'react-icons/fa6';
import { useOutletContext, useParams } from 'react-router-dom';
import FakeNews from './News';
import { BsDatabaseExclamation } from 'react-icons/bs';

export default function NewsMessages({noData}) {

    // ====== setDisplayBook ====== //

    const setDisplayBook = useOutletContext();

    const {id} = useParams();

    // ====== news-data ====== //

    const news = FakeNews.find(news => news._id === id);

    // ====== check-for-links ====== //

    const [formattedDescription, setFormattedDescription] = useState(null)

    useEffect(() => {

        if(id && news){
            
            const regex = /\{([^,]+),\s*(https?:\/\/[^\s]+)\}/ || /\{([^,]+) ,\s*(https?:\/\/[^\s]+)\}/;

            setFormattedDescription(news.description.replace(regex, (match, text, url) => {
                return `<a href="${url}" target="_blank" rel="noopener noreferrer">${text.trim()}</a>`;
            }));

        }

    } , [id , news]);

    // ====== framer-motion ====== //

    const rightVariants = {

        hidden: {opacity: 0},
        visible: {opacity: 1 , transition: {duration: 0.3}}

    }

    // ====== custom-styles ====== //

    const noDataCont = {

        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        fontSize: '30px',
        fontWeight: '600',
        color: 'var(--first-text-color)'

    }

    const dataLessIcon = {

        fontSize: '120px',
        color: 'var(--active-color)'

    }

    return <React.Fragment>

        <motion.div variants={rightVariants} initial='hidden' animate='visible' className={newsCSS.news_det}>

                {noData ? <div style={noDataCont}>

                    <motion.div whileTap={{scale: 0.8}} onClick={() => setDisplayBook(true)} className={newsCSS.no_data_burger}>
                        <FaListUl />
                    </motion.div>

                    <BsDatabaseExclamation style={dataLessIcon} />
                    <p>No News Yet</p>

                </div> :<>
                    <div className={newsCSS.news_det_title}>

                        <div className={newsCSS.news_title_det}>
                            <p className={newsCSS.title_det_name}>{news.title}</p>
                            <p className={newsCSS.title_det_date}>{news.date}</p>
                        </div>

                        <motion.div whileTap={{scale: 0.8}} onClick={() => setDisplayBook(true)} className={newsCSS.burger_phone}>
                            <FaListUl />
                        </motion.div>

                    </div>

                    <div className={newsCSS.news_det_message}>

                        <div dangerouslySetInnerHTML={{ __html: formattedDescription }} className={newsCSS.news_det_message_cont}></div>

                    </div>
                </>}

            </motion.div>

    </React.Fragment>

}
