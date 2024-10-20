import React from 'react';

import loadingCSS from './loading.module.css';
import { ThreeCircles } from 'react-loader-spinner';
import { motion } from 'framer-motion';

export default function Loading() {

    // ====== animation ====== //

    const parentVariants = {

        hidden : {opacity : 0},
        visible : {opacity : 1},
        transition : {duration : 0.2}

    }

    return <React.Fragment>

        <motion.div 
            className={loadingCSS.container}
            variants={parentVariants}
            initial='hidden' animate='visible' transition='transition' exit='hidden'
        >

            <ThreeCircles
                visible={true} height="50" width="50" color="var(--first-color)"
                ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
            />

        </motion.div>

    </React.Fragment>

}
