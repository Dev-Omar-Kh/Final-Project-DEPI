import React, { useEffect, useState } from 'react';

import checkCSS from './check.module.css';
import formCSS from '../../../Styles/forms.module.css';
import commonCSS from '../../../Styles/home_common.module.css';
import { GrArticle } from 'react-icons/gr';
import { LuBadgeDollarSign } from 'react-icons/lu';
import { TbTruckDelivery } from 'react-icons/tb';
import { motion } from 'framer-motion';
import Titles from '../Home/Titles-Home/Titles';
import { useDispatch, useSelector } from 'react-redux';
import { getCardElements } from './../../../Store/CartSlice';
import { ThreeCircles } from 'react-loader-spinner';
import { useFormik } from 'formik';
import { BiErrorAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { Axios, OrderCreate } from '../../../API/Api';
import Status from '../../../Components/Common/Status/Status';

export default function CheckOut() {

    // ====== get-user-order ====== //

    const dispatch = useDispatch();

    const {cartLoading , cartError , cartData} = useSelector((store) => store.cart); 

    useEffect(() => {

        dispatch(getCardElements())

    } , [dispatch]);

    // ====== send-data-to-api ====== //

    const [errMsg, setErrMsg] = useState(null);
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(false)
    const [successMsg, setSuccessMsg] = useState(null);

    const navigate = useNavigate();

    const values= {

        fullName: '',
        email: '',
        phone: '',
        address: '',
        message: '',

    }

    const submitOrder = async(values) => {

        setErrMsg(null);
        setSuccessMsg(null);
        setLoading(true);

        try {

            const {data} = await Axios.post(`${OrderCreate}` , values , {withCredentials: true});

            if(data.success){

                setSuccessMsg(data.message);

                setTimeout(() => {
                    navigate('/orders');
                }, 3600);

            }

        } catch (error) {
            console.log(error);
            setErrMsg(error.response.data.message || 'Something is error');
        } finally{
            setLoading(false);
        }

    }

    const formikObj = useFormik({

        initialValues: values,

        onSubmit: submitOrder,

        validate: (values) => {

            const errors = {};

            if(values.fullName.length < 3){
                errors.fullName = 'Name is shorter than 3 char';
            }
            if(values.fullName.length === 0){
                errors.fullName = 'Name is required';
            }
            if(values.fullName.length > 50){
                errors.fullName = 'Name is longer than 50 char';
            }

            if (!/\S+@\S+\.\S+/.test(values.email)) {
                errors.email = 'Email is invalid';
            } else if (!values.email) {
                errors.email = 'Email is required';
            }

            if (!/^[0-9]+$/.test(values.phone)) {
                errors.phone = 'Phone is invalid';
            } else if (!values.phone) {
                errors.phone = 'Phone is required';
            }

            if(values.address.length < 3){
                errors.address = 'Address is shorter than 3 char';
            }
            if(values.address.length === 0){
                errors.address = 'Address is required';
            }
            if(values.address.length > 150){
                errors.address = 'Address is longer than 150 char';
            }

            if(values.message.length < 10){
                errors.message = 'Message is shorter than 10 char';
            }
            if(values.message.length === 0){
                errors.message = 'Message is required';
            }
            if(values.message.length > 500){
                errors.message = 'Message is longer than 500 char';
            }

            return errors;

        }

    });

    // ====== framer-motion ====== //

    const ParentVariants = {

        hidden: {opacity: 0},
        visible: {opacity: 1 , transition: {duration: 0.3 , staggerChildren : 0.3}},

    }

    const childVariants = {

        hidden: {opacity: 0 , y: 40},
        visible: {opacity: 1 , y: 0},

    }

    return <React.Fragment>

        {successMsg ? <Status icon='success' isVisible={visible} visibility={setVisible} data={successMsg} /> : ''}
        {errMsg ? <Status icon='error' isVisible={visible} visibility={setVisible} data={errMsg} /> : ''}

        <motion.div 
            variants={ParentVariants} initial='hidden' animate='visible' 
            className={`${commonCSS.container}`}
        >

            <Titles title={' Check Out'} />

            <motion.div variants={childVariants} className={checkCSS.bill}>

                <div className={checkCSS.bill_title}>

                    <GrArticle />
                    <span>Order</span>

                </div>

                {cartLoading ? <>
                
                    <div className={checkCSS.order_row}>

                        <div style={{width: '100%', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <ThreeCircles
                                visible={true} height="20" width="20" color="var(--active-color)"
                                ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                            />
                        </div>

                    </div>
                
                </> : (cartError || cartData?.data?.length === 0 ? <>
                
                    <div className={checkCSS.order_row}>

                        <div 
                            style={{
                                width: '100%', padding: '20px', 
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
                            }}
                        >
                            <BiErrorAlt style={{fontSize: '20px', color: 'var(--active-color)'}} />
                            <p style={{fontSize: '16px', color: 'var(--first-text-color)'}}>No Orders</p>
                        </div>

                    </div>

                    <div className={checkCSS.order_row}>

                        <div className={checkCSS.bill_total}>

                            <TbTruckDelivery />
                            <p>00.00 EGP</p>

                        </div>

                        <div className={checkCSS.bill_total}>

                            <LuBadgeDollarSign />
                            <p>00.00 EGP</p>

                        </div>

                    </div>
                
                </> : <React.Fragment>
                
                    {cartData?.data?.map(book => <div key={book.bookId._id} className={checkCSS.order_row}>

                        <p className={checkCSS.row_title}>{book.bookId.title}</p>
                        <p className={checkCSS.row_title}>{book.quantity} PC</p>
                        <p className={checkCSS.row_title}>
                            {((book.bookId.price - (book.bookId.price * ((book.bookId.offer || 0) / 100))).toFixed(2))} EGP
                        </p>
                        <p className={checkCSS.row_title}>
                            {
                                ((book.quantity * (book.bookId.price - (book.bookId.price * ((book.bookId.offer || 0) / 100))))
                                .toFixed(2))
                            } EGP
                        </p>

                    </div>)}

                    <div className={checkCSS.order_row}>

                        <div className={checkCSS.bill_total}>

                            <TbTruckDelivery />
                            <p>100.00 EGP</p>

                        </div>

                        <div className={checkCSS.bill_total}>

                            <LuBadgeDollarSign />
                            <p>{(cartData?.totalPrice || 0) + 100} EGP</p>

                        </div>

                    </div>
                
                </React.Fragment>)}

            </motion.div>

            {cartData && cartData.data && cartData.data.length > 0 && <motion.form 
                className={formCSS.form}
                variants={childVariants} 
                onSubmit={formikObj.handleSubmit}
                style={{opacity: loading ? 0.6 : 1}}
            >

                <div className={`${formCSS.input_cont} ${formCSS.half_input_cont}`}>

                    <div className={formCSS.loader}></div>

                    <label htmlFor="fullName">
                        <span className={formCSS.label}>Full Name</span>
                        {formikObj.errors.fullName && formikObj.touched.fullName && 
                            <span className={formCSS.label_err}>* {formikObj.errors.fullName}</span>
                        }
                    </label>

                    <input 
                        id='fullName'
                        type="text" placeholder='Enter your full name' 
                        onBlur={formikObj.handleBlur}
                        style={formikObj.touched.fullName && formikObj.errors.fullName ?
                            {borderColor : 'var(--error-color)'} : {}
                        }
                        onChange={formikObj.handleChange}
                        value={formikObj.values.fullName}
                        disabled={loading}
                    />

                </div>

                <div className={`${formCSS.input_cont} ${formCSS.half_input_cont}`}>

                    <div className={formCSS.loader}></div>

                    <label htmlFor="email">
                        <span className={formCSS.label}>Email</span>
                        {formikObj.errors.email && formikObj.touched.email && 
                            <span className={formCSS.label_err}>* {formikObj.errors.email}</span>
                        }
                    </label>

                    <input 
                        id='email'
                        type="text" placeholder='Enter your email' 
                        onBlur={formikObj.handleBlur}
                        style={formikObj.touched.email && formikObj.errors.email ?
                            {borderColor : 'var(--error-color)'} : {}
                        }
                        onChange={formikObj.handleChange}
                        value={formikObj.values.email}
                        disabled={loading}
                    />

                </div>

                <div className={`${formCSS.input_cont} ${formCSS.half_input_cont}`}>

                    <div className={formCSS.loader}></div>

                    <label htmlFor="phone">
                        <span className={formCSS.label}>Phone</span>
                        {formikObj.errors.phone && formikObj.touched.phone && 
                            <span className={formCSS.label_err}>* {formikObj.errors.phone}</span>
                        }
                    </label>

                    <input 
                        id='phone'
                        type="text" placeholder='Enter your phone number' 
                        onBlur={formikObj.handleBlur}
                        style={formikObj.touched.phone && formikObj.errors.phone ?
                            {borderColor : 'var(--error-color)'} : {}
                        }
                        onChange={formikObj.handleChange}
                        value={formikObj.values.phone}
                        disabled={loading}
                    />

                </div>

                <div className={`${formCSS.input_cont} ${formCSS.half_input_cont}`}>

                    <div className={formCSS.loader}></div>

                    <label htmlFor="address">
                        <span className={formCSS.label}>Address</span>
                        {formikObj.errors.address && formikObj.touched.address && 
                            <span className={formCSS.label_err}>* {formikObj.errors.address}</span>
                        }
                    </label>

                    <input 
                        id='address'
                        type="text" placeholder='Enter your address' 
                        onBlur={formikObj.handleBlur}
                        style={formikObj.touched.address && formikObj.errors.address ?
                            {borderColor : 'var(--error-color)'} : {}
                        }
                        onChange={formikObj.handleChange}
                        value={formikObj.values.address}
                        disabled={loading}
                    />

                </div>

                <div className={formCSS.input_cont}>

                    <label htmlFor="message">
                        <span className={formCSS.label}>More Details :</span>
                        {formikObj.errors.message && formikObj.touched.message && 
                            <span className={formCSS.label_err}>* {formikObj.errors.message}</span>
                        }
                    </label>
                    <textarea 
                        id="message" placeholder="Write us anything you need to tell us"
                        onBlur={formikObj.handleBlur}
                        style={formikObj.touched.message && formikObj.errors.message ?
                            {borderColor : 'var(--error-color)'} : {}
                        }
                        onChange={formikObj.handleChange}
                        value={formikObj.values.message}
                        disabled={loading}
                    ></textarea>

                </div>

                <button className={formCSS.submit} type="submit">
                    {loading ? <ThreeCircles
                            visible={true} height="20" width="20" color="var(--first-color)"
                            ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                        /> : 
                        <span>Confirm</span>
                    }
                </button>

            </motion.form>}

        </motion.div>

    </React.Fragment>

}
