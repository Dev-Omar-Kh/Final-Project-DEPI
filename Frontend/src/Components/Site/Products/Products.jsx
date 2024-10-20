import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import { IoCartOutline } from 'react-icons/io5';

import productsCSS from '../../../Styles/products.module.css';
import { AnimatePresence , motion } from 'framer-motion';
import { Axios, CartAdd } from '../../../API/Api';
import Status from '../../Common/Status/Status';
import Loading from '../../Common/Page-Loading/Loading';

const Products = React.memo(function Products({ data, category }) {

    // ====== add-to-card ====== //

    const [errMsg, setErrMsg] = useState(null);
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(false)
    const [successMsg, setSuccessMsg] = useState(null);

    const addToCard = async(bookId) => {

        setErrMsg(null);
        setSuccessMsg(null);
        setLoading(true);

        try {

            const {data} = await Axios.post(`${CartAdd}` , {bookId} , {withCredentials: true});

            if(data.success){
                setSuccessMsg(data.message);
            }

        } catch (error) {
            setErrMsg(error.response.data.message);
        }finally{
            setLoading(false);
        }

    }

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

        {successMsg ? <Status icon='success' isVisible={visible} visibility={setVisible} data={successMsg} /> : ''}
        {errMsg ? <Status icon='error' isVisible={visible} visibility={setVisible} data={errMsg} /> : ''}

        <AnimatePresence>
            {loading && <Loading />}
        </AnimatePresence>

        <AnimatePresence>

            <motion.div 
                className={productsCSS.container}
                variants={parentVariants} 
                key={category ?  category : 'container'}
                initial='hidden' whileInView='visible' exit='exit' viewport={{ once: true, amount: 0.01 }} 
                style={{justifyContent: data.length > 5 ? 'start' : 'center'}}
            >

                {data.map(book => <motion.div variants={childVariants} key={book?._id} className={productsCSS.pro_card}>

                        <div className={productsCSS.actions}>

                            <span onClick={() => addToCard(book?._id)} className={productsCSS.action_icon}><IoCartOutline /></span>

                        </div>

                        <Link to={`/single_book/${book?._id}`}>
                        
                            <div className={productsCSS.pro_img}>

                                <img className={productsCSS.pro_img_img} src={book?.image} alt={book?.title} loading='lazy' />

                            </div>

                            <div className={productsCSS.pro_det}>

                                <div className={productsCSS.main_det}>

                                    <h3 className={productsCSS.h3}>{book?.title}</h3>
                                    <p className={productsCSS.author}>"{book?.author}"</p>

                                </div>

                                {book?.description &&
                                    <p className={productsCSS.some_about}>
                                        {book?.description.split(' ').slice(0 , 10).join(' ') + '...'}
                                    </p>
                                }

                                <div className={productsCSS.prices_box}>
                                    {book?.offer && <p className={productsCSS.price}>
                                        {(book?.price - (book?.price * (book?.offer / 100))).toFixed(2)}
                                        <span>EGP</span>
                                    </p>}
                                    
                                    <p className={`${productsCSS.price} ${book?.offer ? productsCSS.old_price : ''}`}>
                                        {book?.price.toFixed(2)} 
                                        <span style={{color : book?.offer ? 'var(--hash-opacity)' : 'var(--active-color)'}}>EGP</span>
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