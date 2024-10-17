import React, { useState } from 'react';

import titleCSS from '../../../Styles/db_title.module.css';
import formCSS from '../../../Styles/forms.module.css';
import { BsPatchPlusFill } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Axios, GetUserSingle, UsersUpdateRole } from '../../../API/Api';
import { useQuery } from 'react-query';
import { useFormik } from 'formik';
import Status from '../../../Components/Common/Status/Status';
import { ThreeCircles } from 'react-loader-spinner';

export default function AddAdmin() {

    // ====== get-single-user ====== //

    const token = localStorage.getItem('token');
    const {id} = useParams();

    const getSingleUser = async() => {

        return await Axios.get(`${GetUserSingle}/${id}` , {headers: {token}});

    }

    const {data , isLoading} = useQuery('getSingleUserById' , getSingleUser);

    const userData = data?.data.data;

    // ====== change-user-role ====== //

    const [errMsg, setErrMsg] = useState(null);
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(false)
    const [successMsg, setSuccessMsg] = useState(null);

    const navigate = useNavigate();

    const values = {
        role: userData?.role || '',
    }

    const updateRole = async(values) => {

        setErrMsg(null);
        setSuccessMsg(null);
        setLoading(true);

        try {

            const {data} = await Axios.patch(`${UsersUpdateRole}/${id}`, values , {headers: {token}});

            if(data.success){

                setSuccessMsg(data.message);

                setTimeout(() => {
                    navigate('/admin/users');
                }, 3600);

            }

        } catch (error) {
            setErrMsg(error.response.data.message);
        }

        setLoading(false);

    }

    const formikObj = useFormik({

        initialValues: values,

        enableReinitialize: true,

        onSubmit: updateRole,

    });

    return <React.Fragment>

        {successMsg ? <Status icon='success' isVisible={visible} visibility={setVisible} data={successMsg} /> : ''}
        {errMsg ? <Status icon='error' isVisible={visible} visibility={setVisible} data={errMsg} /> : ''}

        <div className={titleCSS.container}>

            <div className={titleCSS.title}>

                <div className={titleCSS.title_box}>

                    <BsPatchPlusFill />
                    <p>Add Admin</p>

                </div>

            </div>

            <div className={titleCSS.form_cont}>

                <form onSubmit={formikObj.handleSubmit} className={formCSS.form} style={{opacity: loading ? 0.6 : 1}}>

                    <div className={`${formCSS.input_cont} ${formCSS.half_input_cont}`}>

                        <label htmlFor="author">
                            <span className={formCSS.label}>User Name :</span>
                        </label>
                        <input readOnly value={userData?.username || ''} type="text" placeholder={isLoading ? 'Loading...' : ''}/>

                    </div>

                    <div className={`${formCSS.input_cont} ${formCSS.half_input_cont}`}>

                        <label htmlFor="author">
                            <span className={formCSS.label}>User Email :</span>
                        </label>
                        <input readOnly value={userData?.email || ''} type="text" placeholder={isLoading ? 'Loading...' : ''}/>

                    </div>

                    <div className={`${formCSS.input_cont} ${formCSS.half_input_cont}`}>

                        <label htmlFor="author">
                            <span className={formCSS.label}>User Phone :</span>
                        </label>
                        <input readOnly value={userData?.phone || ''} type="text" placeholder={isLoading ? 'Loading...' : ''}/>

                    </div>

                    <div className={formCSS.radio_btns}>

                        <div className={formCSS.radio_sec}>

                            <div className={formCSS.radio_buttons_container}>

                                <div className={formCSS.radio_button}>

                                    <input 
                                        checked={formikObj.values.role === 'GENERAL'}
                                        name="role" 
                                        id="user" className={formCSS.radio_button__input} 
                                        type="radio" 
                                        onChange={() => formikObj.setFieldValue('role', 'GENERAL')}
                                    />

                                    <label htmlFor="user" className={formCSS.radio_button__label}>

                                        <span className={formCSS.radio_button__custom}></span>
                                        User

                                    </label>

                                </div>

                                <div className={formCSS.radio_button}>

                                    <input 
                                        checked={formikObj.values.role === 'ADMIN'}
                                        name="role" 
                                        id="admin" className={formCSS.radio_button__input} 
                                        type="radio" 
                                        onChange={() => formikObj.setFieldValue('role', 'ADMIN')}
                                    />

                                    <label htmlFor="admin" className={formCSS.radio_button__label}>

                                        <span className={formCSS.radio_button__custom}></span>
                                        Admin

                                    </label>

                                </div>

                            </div>

                        </div>

                    </div>

                    <motion.button 
                        whileTap={{scale : 0.95}} className={formCSS.submit} type='submit'
                        style={{cursor: loading ? 'not-allowed' : 'pointer'}}
                    >
                        {loading ? <ThreeCircles
                            visible={true} height="20" width="20" color="var(--first-color)"
                            ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                            /> : 
                            'Submit'
                        }
                    </motion.button>

                </form>

            </div>

        </div>

    </React.Fragment>

}
