import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { IoMdArrowRoundForward } from 'react-icons/io';

import bestProCSS from './best_pro.module.css';
import errorHandleCSS from '../../../../Styles/db_tables.module.css';
import { useSelector } from 'react-redux';
import { ThreeCircles } from 'react-loader-spinner';
import { BiErrorAlt } from 'react-icons/bi';

export default function BestProduct() {

    // ====== best-book-data ====== //

    // ====== books-data ====== //

    const [filteredData, setFilteredData] = useState(null);

    const {bookLoading , bookError , bookData} = useSelector((store) => store.api);

    useEffect(() => {

        if(bookData?.data){
            setFilteredData(bookData.data.slice(bookData.data.length - 2 , bookData.data.length - 1));
        }

    }, [bookData]);

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

    if(!filteredData){

        return <React.Fragment>

            <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <ThreeCircles
                    visible={true} height="50" width="50" color="var(--active-color)"
                    ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                />
            </div>

        </React.Fragment>

    }

    return <React.Fragment>

        {bookLoading ? <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <ThreeCircles
                visible={true} height="50" width="50" color="var(--active-color)"
                ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
            />
        </div> : (bookError ? <div className={errorHandleCSS.empty_doc}>
            <BiErrorAlt />
            <h3>Error on fetch books</h3>
        </div> : <motion.div 
            variants={parentVariants} 
            initial='hidden' whileInView='visible' viewport={{once: true , amount: 0.3}}
            className={bestProCSS.container}
        >

            <motion.div variants={toTopVariants} className={bestProCSS.img_cont}>

                <img src={filteredData[0].image} alt="" />

            </motion.div>

            <motion.div variants={toBottomVariants} className={bestProCSS.det_cont}>

                <h3>Best Selling Book</h3>

                <p className={bestProCSS.book_author}>{filteredData[0].author}</p>

                <p className={bestProCSS.book_name}>{filteredData[0].title}</p>

                {filteredData[0].description &&
                    <p className={bestProCSS.book_des}>
                        {filteredData[0].description.split(' ').slice(0 , 20).join(' ') + '...'}
                    </p>
                }

                <p className={bestProCSS.book_price}>{filteredData[0].price} <span>EGP</span></p>

                <Link to={`/single_book/${filteredData[0]._id}`} className={bestProCSS.action}>
                    <p>View book details</p>
                    <IoMdArrowRoundForward />
                </Link>

            </motion.div>

        </motion.div>)}

    </React.Fragment>

}
