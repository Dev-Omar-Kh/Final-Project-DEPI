import React, { useState } from 'react';
import { motion } from 'framer-motion'

import { AiOutlineFileSearch } from "react-icons/ai";
import { FaCircleXmark } from "react-icons/fa6";


import searchCSS from './search.module.css';
import errorHandleCSS from '.././../../../Styles/db_tables.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThreeCircles } from 'react-loader-spinner';
import { BiErrorAlt } from 'react-icons/bi';

export default function Search({display}) {

    // ====== get-searched-book ====== //

    const {bookLoading , bookError , bookData} = useSelector((store) => store.api);

    const [searchedBook, setSearchedBook] = useState([]);

    const stopSend = (e) => {
        e.preventDefault();
    };

    const searchForABook = (e) => {

        const searchTerm = e.target.value.toLowerCase();

        if (searchTerm === "") {
            setSearchedBook([]);
        } 

        else if (Array.isArray(bookData.data)) {

            const filteredBooks = bookData.data.filter((book) =>
                book.title.toLowerCase().includes(searchTerm)
            );

            setSearchedBook(filteredBooks);

        }

    };

    // ====== framer-motion ====== //

    const parentVariants = {

        hidden : {opacity: 0},
        visible : {opacity : 1 , transition : {duration : 0.3 , when : 'beforeChildren' , staggerChildren : 0.2}},
        exit : {opacity : 0 , transition : {duration : 0.3}}

    }

    const childVariants = {

        hidden : {opacity : 0 , y : 20},
        visible : {opacity : 1 , y : 0 , transition : {duration : 0.3}},
        exit : {opacity : 0 , y : 20 , transition : {duration : 0.3}}

    }

    const searchedBoxVariants = {

        hidden : {opacity : 0 , y: 20},
        visible : {opacity : 1 , y: 0 , transition : {duration : 0.3}},
        exit : {opacity : 0 , y: 20 , transition : {duration : 0.3}}

    }

    return <React.Fragment>

        <motion.div variants={parentVariants} initial="hidden" animate="visible" exit={"exit"} className={searchCSS.container}>

            <div onClick={() => display(false)} className={searchCSS.close_page}>
                <FaCircleXmark />
            </div>

            <motion.div variants={childVariants} className={searchCSS.title}>
                <AiOutlineFileSearch />
                <p>Search</p>
            </motion.div>

            <motion.form onSubmit={stopSend} variants={childVariants} className={searchCSS.form}>

                <div className={searchCSS.search_cont}>

                    <input onChange={searchForABook} type="text" placeholder='Find a book...' />

                    {
                        bookLoading ? 
                        <div style={{
                            width: '100%',  height: '40px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <ThreeCircles
                                visible={true} height="20" width="20" color="var(--active-color)"
                                ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                            />
                        </div>
                        :(
                            bookError ? <div className={errorHandleCSS.empty_doc}>
                                <BiErrorAlt />
                                <h3>Error on filtering books</h3>
                            </div> : 
                            searchedBook.length > 0 && <motion.div variants={searchedBoxVariants} className={searchCSS.searched_box}>

                                {searchedBook.map(book => <Link 
                                    to={`/single_book/${book._id}`} 
                                    onClick={() => display(false)}
                                    key={book._id}
                                >
                                    {book.title}
                                </Link>)}

                            </motion.div>
                        ) 
                    }

                </div>

                <motion.button whileTap={{scale : 0.95}} type='submit'>Search</motion.button>

            </motion.form>

        </motion.div>

    </React.Fragment>

}
