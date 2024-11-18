import React, { useState } from 'react';

import ordersCardCSS from './orders.module.css';
import { FaUser } from 'react-icons/fa';
import { MdAlternateEmail, MdPhone } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import OrderDetails from './OrderDetails';

export default function OrderCard({data , num}) {

    // console.log(data);

    // ====== handle-date ====== //

    const dateArray = data.createdAt.split('T')[0];
    const handleDate = dateArray.split('-').reverse().join(' - ');

    // ====== display-data ====== //

    const [displayDetails, setDisplayDetails] = useState(false);

    // ====== framer-motion ====== //

    const childVariants = {

        hidden: {opacity: 0 , y: 40},
        visible: {opacity: 1 , y: 0},

    }

    return <React.Fragment>

        <AnimatePresence>

            {displayDetails && <OrderDetails num={num} data={data} close={setDisplayDetails} />}

        </AnimatePresence>

        <motion.div variants={childVariants} initial='hidden' whileInView='visible' className={ordersCardCSS.card}>

            <div className={ordersCardCSS.card_head}>

                <p>{num}</p>
                
                <div className={ordersCardCSS.date}>{handleDate}</div>

            </div>

            <div className={ordersCardCSS.card_details}>

                <div className={ordersCardCSS.cd_box}>
                    <FaUser />
                    <p>{data.fullName}</p>
                </div>

                <div className={ordersCardCSS.cd_box}>
                    <MdAlternateEmail />
                    <p>{data.email}</p>
                </div>

                <div className={ordersCardCSS.cd_box}>
                    <MdPhone />
                    <p>{data.phone}</p>
                </div>

            </div>

            <div className={ordersCardCSS.order_details}>

                <p>Purchased Books : <span>{data.cartItems.length} Book</span></p>

                <p>Total Price : <span>{data.totalAmount.toFixed(2)} EGP</span></p>

            </div>

            <div className={ordersCardCSS.more}>

                <motion.button onClick={() => setDisplayDetails(true)} whileTap={{scale: 0.95}}>Order Details</motion.button>

            </div>

        </motion.div>

    </React.Fragment>

}
