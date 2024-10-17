import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { IoArrowBackSharp, IoArrowForwardSharp } from 'react-icons/io5';

import sliderCSS from './slider.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import FakeDataBooks from '../../../../FakeDataBooks';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';

export default function Slider({height}) {

    // ====== fake-data-books ====== //

    const books = useMemo(() => FakeDataBooks.slice(0, 6), []);

    const [currentBook, setCurrentBook] = useState(books[0]);

    const handleNextBook = useCallback(() => {

        const nextId = (books.indexOf(currentBook) + 1) % books.length;
        setCurrentBook(books[nextId]);

    } , [books, currentBook]);

    const handlePrevBook = useCallback(() => {

        const prevId = (books.indexOf(currentBook) - 1 + books.length) % books.length;
        setCurrentBook(books[prevId]);

    } , [books, currentBook]);

    useEffect(() => {

        books.forEach(book => {

            const img = new Image();
            img.src = book.imageURL;

        });

        const interval = setInterval(handleNextBook, 8000);

        return () => clearInterval(interval);

    }, [books , handleNextBook]);

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

    return <React.Fragment>

        <div style={{height : `calc(100svh - ${contHeight}px)`}} className={sliderCSS.container}>

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

                            <h3>{currentBook.bookTitle}</h3>

                            <p>{currentBook.bookDescription}</p>

                            <Link to={'/books'}>
                                Show more
                                <IoIosArrowForward />
                            </Link>

                        </motion.div>

                        <motion.div variants={toTopVariants} className={sliderCSS.box_img}>

                            <img src={currentBook.imageURL} alt={currentBook.bookTitle} />

                        </motion.div>

                    </motion.div>

                </AnimatePresence>

            </div>

            <motion.div onClick={handleNextBook} whileTap={{scale : 0.90}} className={sliderCSS.arrow}>
                <IoArrowForwardSharp />
            </motion.div>

        </div>

    </React.Fragment>

}
