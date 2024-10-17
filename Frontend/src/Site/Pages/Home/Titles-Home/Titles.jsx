import React from 'react'
import { motion } from 'framer-motion';

import commonCSS from '../../../../Styles/home_common.module.css';

export default function Titles({title}) {

    // ====== framer-motion ====== //

    const parentVariants = {

        hidden : {opacity: 0 , scale: 0.5},
        visible : {opacity: 1 , scale: 1 , transition: {duration: 0.3 , type : 'spring'}}

    }

    return <React.Fragment>

        <motion.div 
            variants={parentVariants} 
            initial='hidden' whileInView='visible' viewport={{ once: true, amount: 1 }} 
            className={commonCSS.title}
        >

            <span className={commonCSS.line}></span>

            <h3>{title}</h3>

            <span className={commonCSS.line}></span>

        </motion.div>

    </React.Fragment>

}
