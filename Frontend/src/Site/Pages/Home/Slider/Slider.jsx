import React, { useCallback, useEffect, useState } from 'react';

import { IoArrowBackSharp, IoArrowForwardSharp } from 'react-icons/io5';

import sliderCSS from './slider.module.css';
import errorHandleCSS from '../../../../Styles/db_tables.module.css';
import { AnimatePresence, motion } from 'framer-motion';
// import FakeDataBooks from '../../../../FakeDataBooks';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { ThreeCircles } from 'react-loader-spinner';
import { BiErrorAlt } from 'react-icons/bi';

export default function Slider({height}) {

    // ====== fake-data-books ====== //

    const {bookLoading , bookError , bookData} = useSelector((store) => store.api);

    const [currentBook, setCurrentBook] = useState(null);

    useEffect(() => {
        if (bookData?.data) {
            setCurrentBook(bookData.data[0]);
        }
    }, [bookData]);


    const handleNextBook = useCallback(() => {

        if (Array.isArray(bookData?.data) && bookData.data.length > 0 && currentBook) {
            const nextId = (bookData.data.indexOf(currentBook) + 1) % bookData.data.length;
            setCurrentBook(bookData.data[nextId]);
        }

    } , [bookData, currentBook]);

    const handlePrevBook = useCallback(() => {

        if (Array.isArray(bookData?.data) && bookData.data.length > 0 && currentBook) {
            const prevId = (bookData.data.indexOf(currentBook) - 1 + bookData.data.length) % bookData.data.length;
            setCurrentBook(bookData.data[prevId]);
        }

    } , [bookData, currentBook]);

    useEffect(() => {

        const interval = setInterval(handleNextBook, 8000);

        return () => clearInterval(interval);

    }, [bookData , handleNextBook]);

    // ====== container-height ====== //

    const [contHeight, setContHeight] = useState(0);

    useEffect(() => {

        if(height){
            setContHeight(height);
        }

    } , [height]);

    // ====== framer-motion ====== //

    const parentVariants = {

        hidden : {opacity: 0},
        visible: {opacity : 1 , transition: {duration: 0.3}},
        exit : {opacity: 0 , transition: {duration : 0.3}}

    };

    const toBottomVariants = {

        hidden : {opacity: 0 , y: -40},
        visible : {opacity: 1 , y: 0 , transition: {duration : 0.3}} ,
        exit : {opacity: 0 , y: -40 , transition: {duration : 0.3}}

    }

    const toTopVariants = {

        hidden : {opacity: 0 , y: 40},
        visible : {opacity: 1 , y: 0 , transition: {duration : 0.3}} ,
        exit : {opacity: 0 , y: 40 , transition: {duration : 0.3}}

    }

    if(!currentBook){

        return <React.Fragment>

            <div style={{
                width: '100%', height : `calc(100svh - ${contHeight}px)`, 
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                <ThreeCircles
                    visible={true} height="50" width="50" color="var(--active-color)"
                    ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                />
            </div>

        </React.Fragment>

    }

    return <React.Fragment>

        {bookLoading ? <div style={{
                width: '100%', height : `calc(100svh - ${contHeight}px)`, 
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
            <ThreeCircles
                visible={true} height="50" width="50" color="var(--active-color)"
                ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
            />
        </div> : (bookError ? <div className={errorHandleCSS.empty_doc}>
            <BiErrorAlt />
            <h3>Error on fetch books</h3>
        </div> : <div style={{height : `calc(100svh - ${contHeight}px)`}} className={sliderCSS.container}>

            <motion.div onClick={handlePrevBook} whileTap={{scale : 0.90}} className={sliderCSS.arrow}>
                <IoArrowBackSharp />
            </motion.div>

            <div className={sliderCSS.slider_cont}>

                <AnimatePresence mode="wait">

                    <motion.div 
                        key={currentBook._id}
                        variants={parentVariants} initial='hidden' animate='visible' exit={'exit'}  
                        className={sliderCSS.slider_box}
                    >

                        <motion.div variants={toBottomVariants} className={sliderCSS.box_content}>

                            <h3>{currentBook.title}</h3>

                            <p>{currentBook.description}</p>

                            <Link to={'/books'}>
                                Show more
                                <IoIosArrowForward />
                            </Link>

                        </motion.div>

                        <motion.div variants={toTopVariants} className={sliderCSS.box_img}>

                            <img src={currentBook.image} alt={currentBook.title} />

                        </motion.div>

                    </motion.div>

                </AnimatePresence>

            </div>

            <motion.div onClick={handleNextBook} whileTap={{scale : 0.90}} className={sliderCSS.arrow}>
                <IoArrowForwardSharp />
            </motion.div>

        </div>)}

    </React.Fragment>

}
