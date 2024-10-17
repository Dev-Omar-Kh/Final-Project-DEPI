import React from 'react';
import { motion } from 'framer-motion'

import { AiOutlineFileSearch } from "react-icons/ai";
import { FaCircleXmark } from "react-icons/fa6";


import searchCSS from './search.module.css';

export default function Search({display}) {

    // ====== framer-motion ====== //

    const parentVariants = {

        hidden : {opacity: 0},
        visible : {opacity : 1 , transition : {duration : 0.3 , when : 'beforeChildren' , staggerChildren : 0.2}},
        exit : {opacity : 0 , transition : {duration : 0.3 , when : 'afterChildren' , staggerChildren : 0.2 , staggerDirection : -1}}

    }

    const childVariants = {

        hidden : {opacity : 0 , y : 20},
        visible : {opacity : 1 , y : 0 , transition : {duration : 0.3}},
        exit : {opacity : 0 , y : 20 , transition : {duration : 0.3}}

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

            <motion.form variants={childVariants} className={searchCSS.form}>

                <input type="text" placeholder='Find a book...' />

                <motion.button whileTap={{scale : 0.95}} type='submit'>Search</motion.button>

            </motion.form>

        </motion.div>

    </React.Fragment>

}
