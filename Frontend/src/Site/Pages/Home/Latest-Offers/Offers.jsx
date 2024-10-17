import React from 'react';
import Products from '../../../../Components/Site/Products/Products';
import { Link } from 'react-router-dom';
import FakeDataBooks from '../../../../FakeDataBooks';

import { IoMdArrowRoundForward } from 'react-icons/io';

import commonCSS from '../../../../Styles/home_common.module.css'
import Titles from '../Titles-Home/Titles';
import { motion } from 'framer-motion';

export default function Offers() {

    // ====== framer-motion ====== //

    const linkVariants = {

        hidden: {opacity: 0 , y: 40},
        visible: {opacity: 1 , y: 0 , transition: {duration: 0.3}},
        exit: {opacity: 0 , y: 40 , transition: {duration: 0.3}}

    }

    const data = FakeDataBooks.filter(book => book.offer)

    return <React.Fragment>

        <div className={commonCSS.container}>

            <Titles title={'Latest Offers'} />

            <Products data={data} />

            <motion.div
                variants={linkVariants}
                initial='hidden' whileInView={'visible'} viewport={{once: true , amount: 1}}
                className={commonCSS.link}
            >

                <Link>
                    <p>View more offers</p>
                    <IoMdArrowRoundForward />
                </Link>

            </motion.div>

        </div>

    </React.Fragment>

}
