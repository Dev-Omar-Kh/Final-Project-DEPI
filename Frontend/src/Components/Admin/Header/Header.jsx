import React from 'react';
import Search from './Search';

import { FaListUl } from 'react-icons/fa6';

import headerCSS from './header.module.css';
import { motion } from 'framer-motion';

export default function Header({display}) {

    return <React.Fragment>

        <div className={headerCSS.container}>

            <div className={headerCSS.search}>
                <Search />
            </div>

            <motion.span whileTap={{scale : 0.8}} onClick={() => display(true)} className={headerCSS.nav_ph}>
                <FaListUl />
            </motion.span>

        </div>

    </React.Fragment>

}
