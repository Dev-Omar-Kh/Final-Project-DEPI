import React from 'react';

import { PiSealWarning } from 'react-icons/pi';

import warnCSS from './warning.module.css';
import { motion } from 'framer-motion';
import { ThreeCircles } from 'react-loader-spinner';

export default function Warning({cancel , data , setDeleteData , deleteData}) {

    // ====== framer-motion ====== //

    const parentVariants = {

        hidden : {opacity : 0},
        visible: {opacity : 1 , transition : {duration : 0.3 , when : 'beforeChildren'}},
        exit : {opacity : 0 , transition : {duration : 0.3}}

    }

    const childVariants = {

        hidden : {opacity : 0 , y : 20},
        visible : {opacity : 1 , y : 0 , transition : {duration : 0.3}},
        exit : {opacity : 0 , y : 20 , transition : {duration : 0.3}}

    }

    return <React.Fragment>

        <motion.div variants={parentVariants} initial='hidden' animate='visible' exit={'exit'} className={warnCSS.container}>

            <motion.div variants={childVariants} className={warnCSS.warn_msg}>

                <div className={warnCSS.title}>
                    <PiSealWarning className={warnCSS.title_icon} />
                    <p>Warning</p>
                </div>

                <div className={warnCSS.msg_text}>

                    <p>Are you sure you want to delete " <span>{data.username || data.title}</span> " ?</p>

                </div>

                <div className={warnCSS.actions}>

                    <motion.button 
                        onClick={() => setDeleteData(data._id)}
                        whileTap={{scale : 0.90}} className={warnCSS.delete}
                        style={{cursor: deleteData ? 'not-allowed' : 'pointer'}}
                    >
                        {deleteData ? 
                            <ThreeCircles
                                visible={true} height="20" width="20" color="var(--first-color)"
                                ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                            /> : 'Delete'
                        }
                    </motion.button>
                    <motion.button 
                        onClick={() => cancel(false)}
                        whileTap={{scale : 0.90}} className={warnCSS.cancel}
                        disabled={deleteData}
                    >Cancel</motion.button>

                </div>

            </motion.div>

        </motion.div>

    </React.Fragment>

}
