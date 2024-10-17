import React from 'react'
import { Link } from 'react-router-dom';

import { IoCartOutline, IoHeartOutline } from 'react-icons/io5';

import productsCSS from '../../../Styles/products.module.css';
import { AnimatePresence , motion } from 'framer-motion';

const Products = React.memo(function Products({ data, category }) {

    // ====== framer-motion ====== //

    const parentVariants = {

        hidden: {opacity: 0},
        visible: {opacity: 1 , transition: {duration: 0.3 , staggerChildren : 0.1}},
        exit: {opacity: 0 , transition: {duration: 0.3}}

    }

    const childVariants = {

        hidden: {opacity: 0 , y: 20},
        visible: {opacity: 1 , y: 0 , transition: {duration: 0.3}},
        exit: {opacity: 0 , y: 20 , transition: {duration: 0.3}}

    }

    return <React.Fragment>

        <AnimatePresence>

            <motion.div 
                variants={parentVariants} 
                key={category ?  category : 'container'}
                initial='hidden' whileInView='visible' exit='exit' viewport={{ once: true, amount: 0.01 }} 
                className={productsCSS.container}
            >

                {data.map(book => <motion.div variants={childVariants} key={book._id} className={productsCSS.pro_card}>

                        <div className={productsCSS.actions}>

                            <span className={productsCSS.action_icon}><IoCartOutline /></span>
                            <span className={productsCSS.action_icon}><IoHeartOutline /></span>

                        </div>

                        <Link to={`/single_book/${book._id}`}>
                        
                            <div className={productsCSS.pro_img}>

                                <img className={productsCSS.pro_img_img} src={book.imageURL} alt={book.bookTitle} loading='lazy' />

                            </div>

                            <div className={productsCSS.pro_det}>

                                <div className={productsCSS.main_det}>

                                    <h3 className={productsCSS.h3}>{book.bookTitle}</h3>
                                    <p className={productsCSS.author}>"{book.authorName}"</p>

                                </div>

                                <p className={productsCSS.some_about}>{book.bookDescription.split(' ').slice(0 , 10).join(' ') + '...'}</p>

                                <div className={productsCSS.prices_box}>
                                    {book.offer && <p className={productsCSS.price}>
                                        {(book.price - (book.price * (book.offer / 100))).toFixed(2)}
                                        <span>EGP</span>
                                    </p>}
                                    
                                    <p className={`${productsCSS.price} ${book.offer ? productsCSS.old_price : ''}`}>
                                        {book.price.toFixed(2)} 
                                        <span style={{color : book.offer ? 'var(--hash-opacity)' : 'var(--active-color)'}}>EGP</span>
                                    </p>
                                </div>

                            </div>
                        
                        </Link>

                    </motion.div>)}

            </motion.div>

        </AnimatePresence>

    </React.Fragment>

});

export default Products