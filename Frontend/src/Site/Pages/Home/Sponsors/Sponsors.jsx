import React, { useMemo } from 'react';

import sponsorsCSS from './sponsors.module.css';
import SponsorsData from './SponsorsData';
import { motion } from 'framer-motion';

export default function Sponsors() {

    // ====== framer-motion ====== //

    const parentVariants = {

        hidden: {opacity: 0 , y: 80},
        visible: {opacity: 1 , y: 0 , transition: {duration: 0.6}}

    }

    // ====== save-data ====== //

    const sponsors = useMemo(() => SponsorsData, []);

    return <React.Fragment>

        <motion.div 
            variants={parentVariants} 
            initial='hidden' whileInView='visible' viewport={{ once: true, amount: 0.2}} 
            className={sponsorsCSS.container}
        >

            {sponsors.map((sponsor , idx) =>  <div key={idx} className={sponsorsCSS.sponsors_card}>
                <img src={sponsor.img} alt="" />
            </div>)}

        </motion.div>

    </React.Fragment>

}
