import React from 'react';
import { motion } from 'framer-motion';

import { BsFillSendFill } from 'react-icons/bs';

import suggestionCSS from './suggestion.module.css';

export default function Suggestion() {

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
            className={suggestionCSS.container} id='suggestion'
        >

            <motion.div variants={toTopVariants} className={suggestionCSS.title}>

                <p>Book</p>
                <span></span>
                <p>Suggestions</p>

            </motion.div>

            <motion.div variants={toBottomVariants} className={suggestionCSS.form}>

                <p>Let us know about any book you'd like to have on the site, and we'll do our best to meet your request.</p>
                <p>Keep an eye on your email to see the results of your suggestions, or you can follow the newsletter on the website.</p>

                <div className={suggestionCSS.form_card}>

                    <input type="text" placeholder='Enter the name of the book' />

                    <button type="submit"> <BsFillSendFill /> </button>

                </div>

            </motion.div>

        </motion.div>

    </React.Fragment>

}
