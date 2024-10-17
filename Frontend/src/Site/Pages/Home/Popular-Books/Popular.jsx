import React, { useEffect, useState } from 'react';

import commonCSS from '../../../../Styles/home_common.module.css';
import popularCSS from './popular.module.css';
import FakeDataBooks from '../../../../FakeDataBooks';
import Products from '../../../../Components/Site/Products/Products';
import { IoMdArrowRoundForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Titles from '../Titles-Home/Titles';
import { motion } from 'framer-motion';


export default function Popular() {

    // ====== get-categories ====== //

    const categories = FakeDataBooks.map(book => book.category);

    const uniqueCategories = [...new Set(categories)];

    // ====== get-single-category ====== //

    const [category, setCategory] = useState(null);
    const [booksData, setBooksData] = useState(FakeDataBooks);

    useEffect(() => {

        if(category){
            setBooksData(FakeDataBooks.filter(book => book.category === category));
        }
        else{
            setBooksData(FakeDataBooks);
        }

    } , [category]);

    // ====== framer-motion ====== //

    const linkVariants = {

        hidden: {opacity: 0 , y: 40},
        visible: {opacity: 1 , y: 0 , transition: {duration: 0.3}},
        exit: {opacity: 0 , y: 40 , transition: {duration: 0.3}}

    }

    const cateVariants = {

        hidden: {opacity: 0 , scale: 0.95},
        visible: {opacity: 1 , scale: 1 , transition: {duration: 0.3}},
        exit: {opacity: 0 , scale: 0.95, transition: {duration: 0.3}}

    }

    return <React.Fragment>

        <div className={commonCSS.container}>

            <Titles title={'Popular Books'} />

            <motion.div 
                variants={cateVariants} 
                initial='hidden' whileInView={'visible'} viewport={{once: true , amount: 0.5}}
                className={popularCSS.categories_cont}
            >

                <div className={popularCSS.cate_box}>

                    <button 
                        onClick={() => setCategory(null)} 
                        className={`${popularCSS.cate} ${category === null ? popularCSS.active : ''}`}
                    >
                        All Books
                    </button>

                    {uniqueCategories.map((cate , idx) => {
                        return <button 
                            key={idx}
                            onClick={() => setCategory(cate)} 
                            className={`${popularCSS.cate} ${cate === category ? popularCSS.active : ''}`}
                        >
                            {cate}
                        </button>
                    })}

                </div>

            </motion.div>

            <Products category={category} data={booksData} />

            {booksData.length > 5 && <motion.div
                variants={linkVariants}
                initial='hidden' whileInView={'visible'} viewport={{once: true , amount: 1}}
                className={commonCSS.link}
            >

                <Link to={'/books'}>
                    <p>View more books</p>
                    <IoMdArrowRoundForward />
                </Link>

            </motion.div>}

        </div>

    </React.Fragment>

}
