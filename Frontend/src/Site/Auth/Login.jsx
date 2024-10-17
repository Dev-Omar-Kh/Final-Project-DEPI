import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { BiLogInCircle } from 'react-icons/bi';

import logCSS from './auth.module.css';
import formCSS from '../../Styles/forms.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Axios, LoginUser } from '../../API/Api';
import { useFormik } from 'formik';
import Status from '../../Components/Common/Status/Status';
import { ThreeCircles } from 'react-loader-spinner';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export default function Login() {

    // ====== login-operation ====== //

    const [errMsg, setErrMsg] = useState(null);
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(false)
    const [successMsg, setSuccessMsg] = useState(null);

    const navigate = useNavigate();

    const values = {

        email: '',
        password: '',

    }

    const sendLoginData = async(values) => {

        setErrMsg(null);
        setSuccessMsg(null);
        setLoading(true);

        try {

            const {data} = await Axios.post(`${LoginUser}` , values , {withCredentials: true});

            if(data.success){

                const token = data.data;
                const {exp} = jwtDecode(token);

                const currentTime = Math.floor(Date.now() / 1000);
                const timeToExpire = exp - currentTime;

                if (timeToExpire > 0) {

                    setSuccessMsg(data.message);

                    const expiresInDays = timeToExpire / (60 * 60 * 24);

                    Cookies.set('token', token, { expires: expiresInDays });

                    setTimeout(() => {
                        navigate('/');
                    }, 3600);

                }
                else{
                    setErrMsg('Registration has expired, try again.');
                }

            }

        } catch (error) {
            setErrMsg(error.response.data.message);
        }

        setLoading(false);

    }

    const formikObj = useFormik({

        initialValues : values,

        onSubmit : sendLoginData ,

        validate : (values) => {

            const errors = {};

            if(!values.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
                errors.email = 'Email is invalid';
            }
            if(values.email.length === 0){
                errors.email = 'Email is required';
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

            return errors;

        }

    });

    // ====== display-eyes ====== //

    const [eyeCont1, setEyeCont1] = useState(false);

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

        <div className={logCSS.container}>

            <motion.div variants={parentVariants} initial='hidden' animate='visible' className={logCSS.auth_container}>

                <motion.div variants={toBottomVariants} style={{height : '500px'}} className={logCSS.img_side}>

                    <img src={require('../../Images/auth-bg.jpeg')} alt="" />

                </motion.div>

                <motion.div variants={toTopVariants} className={logCSS.form_cont}>

                    <form 
                        className={formCSS.form}
                        onSubmit={formikObj.handleSubmit}
                        style={{opacity: loading ? 0.6 : 1}}
                    >

                        <div className={formCSS.form_title}>

                            <BiLogInCircle className={formCSS.icon} />
                            <p>Log In</p>

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

                        <Link to={'/register'} className={formCSS.form_link}>Don't have an account ?</Link>

                        <motion.button 
                            whileTap={{scale : 0.95}} className={formCSS.submit} type='submit'
                            style={{cursor: loading ? 'not-allowed' : 'pointer'}}
                        >
                            {loading ? <ThreeCircles
                                visible={true} height="20" width="20" color="var(--first-color)"
                                ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                                /> : 
                                'Log In'
                            }
                        </motion.button>

                    </form>

                </motion.div>

            </motion.div>

        </div>

    </React.Fragment>

}
