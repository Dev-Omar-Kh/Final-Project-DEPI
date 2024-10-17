import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FakeDataBooks from './../../../../FakeDataBooks';

import { IoMdArrowRoundForward } from 'react-icons/io';

import bestProCSS from './best_pro.module.css';

export default function BestProduct() {

    // ====== best-book-data ====== //

    const bestBook = FakeDataBooks.slice(2 , 3);
    const data = bestBook[0];

    // ====== framer-motion ====== //

    const parentVariants = {

        hidden : {opacity: 0},
        visible: {opacity : 1 , transition: {duration: 0.3 , when: 'beforeChildren' , staggerChildren : 0.1}}

    }

    const toBottomVariants = {

        hidden : {opacity: 0 , y: -20},
        visible : {opacity: 1 , y: 0 , transition: {duration : 0.3}} ,

    }

    const toTopVariants = {

        hidden : {opacity: 0 , y: 20},
        visible : {opacity: 1 , y: 0 , transition: {duration : 0.3}} ,

    }

    return <React.Fragment>

        <motion.div 
            variants={parentVariants} 
            initial='hidden' whileInView='visible' viewport={{once: true , amount: 0.3}}
            className={bestProCSS.container}
        >

            <motion.div variants={toTopVariants} className={bestProCSS.img_cont}>

                <img src={data.imageURL} alt="" />

            </motion.div>

            <motion.div variants={toBottomVariants} className={bestProCSS.det_cont}>

                <h3>Best Selling Book</h3>

                <p className={bestProCSS.book_author}>{data.authorName}</p>

                <p className={bestProCSS.book_name}>{data.bookTitle}</p>

                <p className={bestProCSS.book_des}>{data.bookDescription.split(' ').slice(0 , 20).join(' ') + '...'}</p>

                <p className={bestProCSS.book_price}>{10000} <span>EGP</span></p>

                <Link to={`/single_book/${data._id}`} className={bestProCSS.action}>
                    <p>View book details</p>
                    <IoMdArrowRoundForward />
                </Link>

            </motion.div>

        </motion.div>

    </React.Fragment>

}
