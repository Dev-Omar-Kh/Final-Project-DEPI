import React from 'react';
import FakeDataBooks from './../../../../FakeDataBooks';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { IoMdArrowRoundForward } from 'react-icons/io';

import commonCSS from '../../../../Styles/home_common.module.css';
import Products from '../../../../Components/Site/Products/Products';
import Titles from '../Titles-Home/Titles';

export default function Featured() {

    // ====== framer-motion ====== //

    const linkVariants = {

        hidden: {opacity: 0 , y: 40},
        visible: {opacity: 1 , y: 0 , transition: {duration: 0.3}},
        exit: {opacity: 0 , y: 40 , transition: {duration: 0.3}}

    }

    // ====== send-books-data ====== //

    const featuredBooks =  FakeDataBooks.slice(6 , 10);

    return <React.Fragment>

        <div className={commonCSS.container}>

            <Titles title={'Featured Books'} />

            <Products data={featuredBooks} />

            <motion.div
                variants={linkVariants}
                initial='hidden' whileInView={'visible'} viewport={{once: true , amount: 1}}
                className={commonCSS.link}
            >

                <Link to={'/books'}>
                    <p>View all books</p>
                    <IoMdArrowRoundForward />
                </Link>

            </motion.div>

        </div>

    </React.Fragment>

}
