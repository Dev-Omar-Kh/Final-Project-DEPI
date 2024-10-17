import React, { useEffect, useRef, useState } from 'react';
import { Player } from '@lordicon/react';

import sCSS from './status.module.css';
import { AnimatePresence, motion } from 'framer-motion';

const congIcon = require('../../../Images/JSON/true.json');
const wrongIcon = require('../../../Images/JSON/wrong.json');

export default function Status({icon , data , isVisible , visibility , color}) {

    // ====== display-icon ====== //

    const playerRef = useRef(null);
    const [contWidth, setContWidth] = useState(0);

    useEffect(() => {
        playerRef.current?.playFromBeginning();
    }, []);

    useEffect(() => {

        if(isVisible){

            const container = document.getElementById('container');
            setContWidth(container.offsetWidth);

        }

    } , [isVisible]);

    // ====== display-component ====== //

    useEffect(() => {

        if(data){

            const timOut = setTimeout(() => {

                visibility(false)

            } , 3500);

            return () => {

                clearTimeout(timOut);
                visibility(true);

            }

        }   

    } , [ data , visibility])

    // ====== animation ====== //

    const parentVariants = {

        hidden : {opacity : 0},
        visible : {opacity : 1},
        transition : {duration : 0.2}

    }

    const childVariants = {

        hidden : {y : 50 , opacity : 0},
        visible : {y : 0 , opacity : 1},
        transition : {duration : 0.2}

    }

    return <React.Fragment>

        <AnimatePresence>

            {isVisible &&
                <motion.div 
                    variants={parentVariants}
                    initial='hidden' animate='visible' transition='transition' exit='hidden'
                    id='container' className={sCSS.container}
                    style={color ? {backgroundColor : color} : {}}
                >

                    <motion.div variants={childVariants} className={sCSS.status_box}>

                        <p>

                            {data}

                        </p>

                        {icon === 'success' ? <Player 
                            size={contWidth > 769 ? 120 : 80} ref={playerRef} onComplete={() => playerRef.current?.playFromBeginning()} 
                            trigger="hover" icon={congIcon} 
                        /> : <Player 
                            size={contWidth > 769 ? 120 : 80} ref={playerRef} onComplete={() => playerRef.current?.playFromBeginning()} 
                            trigger="hover" icon={wrongIcon} 
                        />}

                    </motion.div>

                </motion.div>
            }

        </AnimatePresence>

    </React.Fragment>

}
