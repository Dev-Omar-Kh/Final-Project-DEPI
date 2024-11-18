import React from 'react';
import { motion } from 'framer-motion';

import { LuBadgeDollarSign } from 'react-icons/lu';
import { TbTruckDelivery } from 'react-icons/tb';
import { GrArticle } from 'react-icons/gr';
import { IoClose } from 'react-icons/io5';

import orderTable from '../Check-Out/check.module.css';
import orderDetailsCSS from './orders.module.css';

export default function OrderDetails({num , data , close}) {

    // ====== framer-motion ====== //

    const parentVariants = {

        hidden: {opacity: 0},
        visible: {opacity: 1 , transition: {duration: 0.3 , staggerChildren : 0.3}}

    }

    const childVariants = {

        hidden: {opacity: 0 , y: 40},
        visible: {opacity: 1 , y : 0 , transition: {duration: 0.3}}

    }

    return <React.Fragment>

        <motion.div 
            variants={parentVariants} initial='hidden' animate='visible' exit={'hidden'} 
            className={orderDetailsCSS.order_det_cont}
        >

            <div onClick={() => close(false)} className={orderDetailsCSS.close_order_det}>
                <IoClose />
            </div>

            <motion.div variants={childVariants} className={orderDetailsCSS.order_bill_cont}>

                <div className={orderTable.bill_title}>

                    <GrArticle />
                    <span>Order - <span className={orderDetailsCSS.order_num}>{num}</span> </span>

                </div>

                {data.cartItems.map(book => <div key={book._id} className={orderTable.order_row}>

                    <p className={orderTable.row_title}>{book.bookId.title}</p>
                    <p className={orderTable.row_title}>{book.quantity} PC</p>
                    <p className={orderTable.row_title}>
                        {((book.bookId.price - (book.bookId.price * ((book.bookId.offer || 0) / 100))).toFixed(2))} EGP
                    </p>
                    <p className={orderTable.row_title}>
                        {
                            ((book.quantity * (book.bookId.price - (book.bookId.price * ((book.bookId.offer || 0) / 100))))
                            .toFixed(2))
                        } EGP
                    </p>

                </div>)}

                <div className={orderTable.order_row}>

                    <div className={orderTable.bill_total}>

                        <TbTruckDelivery />
                        <p>100.00 EGP</p>

                    </div>

                    <div className={orderTable.bill_total}>

                        <LuBadgeDollarSign />
                        <p>{data?.totalAmount} EGP</p>

                    </div>

                </div>

            </motion.div>

        </motion.div>

    </React.Fragment>

}
