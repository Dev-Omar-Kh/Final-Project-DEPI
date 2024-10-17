import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { BsPatchPlusFill } from 'react-icons/bs';

import regCSS from './auth.module.css';
import formCSS from '../../Styles/forms.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useFormik } from 'formik';
import { Axios, RegisterUser } from '../../API/Api';
import Status from '../../Components/Common/Status/Status';
import { ThreeCircles } from 'react-loader-spinner';

export default function Register() {

    // ====== register-operation ====== //

    const [errMsg, setErrMsg] = useState(null);
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(false)
    const [successMsg, setSuccessMsg] = useState(null);

    const navigate = useNavigate();

    const values = {

        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',

    }

    const sendRegisterData = async(values) => {

        setErrMsg(null);
        setSuccessMsg(null);
        setLoading(true);

        try {

            const {data} = await Axios.post(`${RegisterUser}` , values);

            if(data.success){
                setSuccessMsg('User created successfully');
                setTimeout(() => {
                    navigate('/login');
                }, 3600);
            }

        } catch (error) {
            setErrMsg(error.response.data.message);
        }

        setLoading(false);

    }

    const formikObj = useFormik({

        initialValues : values,

        onSubmit : sendRegisterData ,

        validate : (values) => {

            const errors = {};

            if(values.username.length < 3){
                errors.username = "Name is too short";
            }
            if(values.username.length === 0){
                errors.username = "Name is required";
            }
            if(values.username.length > 50){
                errors.username = "Name is too long";
            }

            if(!values.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
                errors.email = 'Email is invalid';
            }
            if(values.email.length === 0){
                errors.email = 'Email is required';
            }

            if(!values.phone.match(/^01[0125]\d{8}$/)){
                errors.phone = 'Phone is invalid';
            }
            if(values.phone.length === 0){
                errors.phone = 'Phone is required';
            }

            if(values.password.length < 6){
                errors.password = 'Password is too short';
            }
            if(values.password.length === 0){
                errors.password = 'Password is required';
            }
            if(values.password.length > 18){
                errors.password = 'Password is too long';
            }

            if(values.confirmPassword !== values.password){
                errors.confirmPassword = 'It must match the password';
            }
            if(values.confirmPassword.length === 0){
                errors.confirmPassword = 'Confirmation is required';
            }

            return errors;

        }

    });

    // ====== display-eyes ====== //

    const [eyeCont1, setEyeCont1] = useState(false);
    const [eyeCont2, setEyeCont2] = useState(false);

    // ====== framer-motion ====== //

    const parentVariants = {

        hidden : {opacity: 0},
        visible : {opacity: 1 , transition: {duration : 0.3 , }} 

    }

    const toBottomVariants = {

        hidden : {opacity: 0 , y: -20},
        visible : {opacity: 1 , y: 0 , transition: {duration : 0.3}} 

    }

    const toTopVariants = {

        hidden : {opacity: 0 , y: 20},
        visible : {opacity: 1 , y: 0 , transition: {duration : 0.3}} 

    }

    const eyeVariants = {

        hidden : {opacity : 0},
        visible : {opacity : 1 , transition : {duration : 0.3}}

    }

    return <React.Fragment>

        {successMsg ? <Status icon='success' isVisible={visible} visibility={setVisible} data={successMsg} /> : ''}
        {errMsg ? <Status icon='error' isVisible={visible} visibility={setVisible} data={errMsg} /> : ''}

        <div className={regCSS.container}>

            <motion.div variants={parentVariants} initial='hidden' animate='visible' className={regCSS.auth_container}>

                <motion.div variants={toBottomVariants} className={regCSS.img_side}>

                    <img src={require('../../Images/auth-bg.jpeg')} alt="" />

                </motion.div>

                <motion.div variants={toTopVariants} className={regCSS.form_cont}>

                    <form 
                        className={formCSS.form}
                        onSubmit={formikObj.handleSubmit}
                        style={{opacity: loading ? 0.6 : 1}}
                    >

                        <div className={formCSS.form_title}>

                            <BsPatchPlusFill className={formCSS.icon} />
                            <p>Sign Up</p>

                        </div>

                        <div className={formCSS.input_cont}>

                            <div className={formCSS.loader}></div>

                            <label htmlFor="username">
                                <span className={formCSS.label}>Full Name :</span>
                                {formikObj.errors.username && formikObj.touched.username && 
                                    <span className={formCSS.label_err}>* {formikObj.errors.username}</span>
                                }
                            </label>

                            <input 
                                id='username' 
                                type="text" placeholder='Enter your full name' 
                                onBlur={formikObj.handleBlur}
                                style={formikObj.touched.username && formikObj.errors.username ?
                                    {borderColor : 'var(--error-color)'} : {}
                                }
                                onChange={formikObj.handleChange}
                                value={formikObj.values.username}
                                disabled={loading}
                            />

                        </div>

                        <div className={formCSS.input_cont}>

                            <div className={formCSS.loader}></div>

                            <label htmlFor="email">
                                <span className={formCSS.label}>Email :</span>
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

                        <div className={formCSS.input_cont}>

                            <div className={formCSS.loader}></div>

                            <label htmlFor="phone">
                                <span className={formCSS.label}>Phone :</span>
                                {formikObj.errors.phone && formikObj.touched.phone && 
                                    <span className={formCSS.label_err}>* {formikObj.errors.phone}</span>
                                }
                            </label>

                            <input 
                                id='phone' 
                                type="tel" placeholder='Enter your phone number' 
                                onBlur={formikObj.handleBlur}
                                style={formikObj.touched.phone && formikObj.errors.phone ?
                                    {borderColor : 'var(--error-color)'} : {}
                                }
                                onChange={formikObj.handleChange}
                                value={formikObj.values.phone}
                                disabled={loading}
                            />

                        </div>

                        <div className={formCSS.input_cont}>

                            <div className={formCSS.eyes_cont} onClick={() => setEyeCont1(!eyeCont1)}>
                                <AnimatePresence>
                                    {eyeCont1 ? 
                                        <motion.span key={'hidden1'} variants={eyeVariants}>
                                            <FaEyeSlash />
                                        </motion.span> 
                                        :
                                        <motion.span key={'show1'} variants={eyeVariants}>
                                            <FaEye />
                                        </motion.span>
                                    }
                                </AnimatePresence>
                            </div>

                            <label htmlFor="password">
                                <span className={formCSS.label}>Password :</span>
                                {formikObj.errors.password && formikObj.touched.password && 
                                    <span className={formCSS.label_err}>* {formikObj.errors.password}</span>
                                }
                            </label>

                            <input 
                                id='password' type={eyeCont1 ? "text" : "password"} placeholder='Enter new password' 
                                onBlur={formikObj.handleBlur}
                                style={formikObj.touched.password && formikObj.errors.password ?
                                    {borderColor : 'var(--error-color)'} : {}
                                }
                                onChange={formikObj.handleChange}
                                value={formikObj.values.password}
                                disabled={loading}
                            />

                        </div>

                        <div className={formCSS.input_cont}>

                            <div className={formCSS.eyes_cont} onClick={() => setEyeCont2(!eyeCont2)}>
                                <AnimatePresence>
                                    {eyeCont2 ? 
                                        <motion.span key={'hidden2'} variants={eyeVariants}>
                                            <FaEyeSlash />
                                        </motion.span> 
                                        :
                                        <motion.span key={'show2'} variants={eyeVariants}>
                                            <FaEye />
                                        </motion.span>
                                    }
                                </AnimatePresence>
                            </div>

                            <label htmlFor="confirmPassword">
                                <span className={formCSS.label}>Confirm Password :</span>
                                {formikObj.errors.confirmPassword && formikObj.touched.confirmPassword && 
                                    <span className={formCSS.label_err}>* {formikObj.errors.confirmPassword}</span>
                                }
                            </label>
                            <input 
                                id='confirmPassword' 
                                type={eyeCont2 ? "text" : "password"} placeholder='Confirm the password' 
                                onBlur={formikObj.handleBlur}
                                style={formikObj.touched.confirmPassword && formikObj.errors.confirmPassword ?
                                    {borderColor : 'var(--error-color)'} : {}
                                }
                                onChange={formikObj.handleChange}
                                value={formikObj.values.confirmPassword}
                                disabled={loading}
                            />

                        </div>

                        <Link to={'/login'} className={formCSS.form_link}>Already have an account ?</Link>

                        <motion.button 
                            whileTap={{scale : 0.95}} className={formCSS.submit} type='submit'
                            style={{cursor: loading ? 'not-allowed' : 'pointer'}}
                        >
                            {loading ? <ThreeCircles
                                visible={true} height="20" width="20" color="var(--first-color)"
                                ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                                /> : 
                                'Sign Up'
                            }
                        </motion.button>

                    </form>

                </motion.div>

            </motion.div>

        </div>

    </React.Fragment>

}
