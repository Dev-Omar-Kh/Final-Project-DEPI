import React from 'react';

import orderDetAdminCSS from './orders.module.css';
import { BiDetail } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

export default function OrderDetAdmin({details , display}) {

    // ====== update-order-status ====== //

    const updateStatus = async(status , msg) => {

        // console.log(status + ' , ' + msg);

    }

    // ====== framer-motion ====== //

    const parentVariants = {

        hidden: {opacity: 0},
        visible: {opacity: 1 , transition: {duration: 0.3 , staggerChildren: 0.1}}

    }

    const childVariants = {

        hidden: {opacity: 0 , y: 40},
        visible: {opacity: 1 , y: 0 , transition: {duration: 0.3}}

    }

    return <React.Fragment>

        <motion.div 
            variants={parentVariants} initial='hidden' animate='visible' exit={'hidden'} 
            className={orderDetAdminCSS.order_det_cont}
        >

            <button onClick={() => display(false)} className={orderDetAdminCSS.close_det_admin}>
                <IoClose />
            </button>

            <motion.div variants={childVariants} className={orderDetAdminCSS.order_det_box}>

                <div className={orderDetAdminCSS.order_title}>

                    <BiDetail />
                    <p>Order Details</p>

                </div>

                <div className={orderDetAdminCSS.order_box_det_scroll}>

                    <div className={orderDetAdminCSS.order_box_det}>

                        <div className={orderDetAdminCSS.order_box_det_row}>
                            <p>Name : </p>
                            <span>{details.fullName}</span>
                        </div>

                        <div className={orderDetAdminCSS.order_box_det_row}>
                            <p>Email : </p>
                            <span>{details.email}</span>
                        </div>

                        <div className={orderDetAdminCSS.order_box_det_row}>
                            <p>Phone : </p>
                            <span>{details.phone}</span>
                        </div>

                        <div className={orderDetAdminCSS.order_box_det_row}>
                            <p>Address : </p>
                            <span>{details.address}</span>
                        </div>

                        <div className={orderDetAdminCSS.order_box_det_row}>
                            <p>Total Price : </p>
                            <span>{details.totalAmount.toFixed(2)} EGP</span>
                        </div>

                        <div className={orderDetAdminCSS.order_box_det_the_order}>

                            <p className={orderDetAdminCSS.books_ordered_title}>Order :</p>

                            <div className={orderDetAdminCSS.books_ordered}>

                                {details.cartItems.map(book => <p key={book._id}>
                                    <span>• </span> {book.bookId.title} <span>x {book.quantity}</span>
                                </p>)}

                            </div>

                        </div>

                        <div className={orderDetAdminCSS.order_box_det_the_order}>
                            <p className={orderDetAdminCSS.books_ordered_title}>Message :</p>
                            <p className={orderDetAdminCSS.order_message}>
                                {details.message}
                            </p>
                        </div>

                    </div>

                </div>

                <div className={orderDetAdminCSS.order_det_actions}>

                    <motion.button 
                        onClick={() => updateStatus('Confirmed' , "Request approved, you'll be connected soon")} 
                        whileTap={{scale: 0.85}} className={orderDetAdminCSS.confirm}
                    >
                        Confirm
                    </motion.button>

                    <motion.button 
                        onClick={() => updateStatus('Rejected' , "Request rejected, details will be sent soon")} 
                        whileTap={{scale: 0.85}} className={orderDetAdminCSS.reject}
                    >
                        Reject
                    </motion.button>

                    <motion.button whileTap={{scale: 0.85}} className={orderDetAdminCSS.delete_order}>
                        Delete
                    </motion.button>

                </div>

            </motion.div>

        </motion.div>

    </React.Fragment>

}
