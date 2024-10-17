import React, { useState } from 'react';

import { BsPatchPlusFill } from 'react-icons/bs';

import formCSS from '../../../Styles/forms.module.css';
import titleCSS from '../../../Styles/db_title.module.css';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Axios, NewsAdd } from '../../../API/Api';
import Status from '../../../Components/Common/Status/Status';
import { ThreeCircles } from 'react-loader-spinner';

export default function AddNews() {

    const [errMsg, setErrMsg] = useState(null);
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(false)
    const [successMsg, setSuccessMsg] = useState(null);

    const navigate = useNavigate();

    const today = new Date();

    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const values = {

        title: '',
        date: `${month} - ${day}`,
        description: '',

    }

    const sendNews = async(values) => {

        setErrMsg(null);
        setSuccessMsg(null);
        setLoading(true);

        try {

            const {data} = await Axios.post(`${NewsAdd}` , values , {withCredentials: true});

            if(data.success){

                setSuccessMsg(data.message);

                setTimeout(() => {
                    navigate('/admin/news');
                }, 3600);

            }
            else {
                setErrMsg("Unexpected response format.");
            }

        } catch (error) {
            setErrMsg(error.response.data.message);
            console.log(error);
        }finally{
            setLoading(false);
        }

    }

    const formikObj = useFormik({

        initialValues: values,

        onSubmit: sendNews,

        validate : (values) => {

            const errors = {};

            if(values.title.length < 3){
                errors.title = 'Title is too short';
            }
            if(values.title.length === 0){
                errors.title = 'Title is require';
            }
            if(values.title.length > 50){
                errors.title = 'Title is too long';
            }

            if(values.description.length < 3){
                errors.description = 'Description is too short';
            }
            if(values.description.length === 0){
                errors.description = 'Description is require';
            }
            if(values.description.length > 5000){
                errors.description = 'Description is too long';
            }

            return errors;

        }

    });

    return <React.Fragment>

        {successMsg ? <Status icon='success' isVisible={visible} visibility={setVisible} data={successMsg} /> : ''}
        {errMsg ? <Status icon='error' isVisible={visible} visibility={setVisible} data={errMsg} /> : ''}

        <div className={titleCSS.container}>

            <div className={titleCSS.title}>

                <div className={titleCSS.title_box}>

                    <BsPatchPlusFill />
                    <p>Add News</p>

                </div>

            </div>

            <div className={formCSS.form_cont}>

                <form onSubmit={formikObj.handleSubmit} className={formCSS.form} style={{padding: 0 , opacity: loading ? 0.6 : 1}}>

                    <div className={formCSS.input_cont}>

                        <div className={formCSS.loader}></div>

                        <label htmlFor="title">
                            <span className={formCSS.label}>News Title :</span>
                            {formikObj.errors.title && formikObj.touched.title && 
                                <span className={formCSS.label_err}>* {formikObj.errors.title}</span>
                            }
                        </label>

                        <input 
                            id='title' 
                            type="text" placeholder='Enter the book name' 
                            onBlur={formikObj.handleBlur}
                            style={formikObj.touched.title && formikObj.errors.title ?
                                {borderColor : 'var(--error-color)'} : {}
                            }
                            onChange={formikObj.handleChange}
                            value={formikObj.values.title}
                            // disabled={loading}
                        />

                    </div>

                    <div className={formCSS.input_cont}>

                        <label htmlFor="description">
                            <span className={formCSS.label}>Book Description :</span>
                            {formikObj.errors.description && formikObj.touched.description && 
                                <span className={formCSS.label_err}>* {formikObj.errors.description}</span>
                            }
                        </label>
                        <textarea 
                            id="description" placeholder="Enter the book's description"
                            style={formikObj.touched.description && formikObj.errors.description ?
                                {borderColor : 'var(--error-color)'} : {}
                            }
                            onChange={formikObj.handleChange}
                            value={formikObj.values.description}
                            // disabled={loading}
                        ></textarea>

                    </div>

                    <motion.button 
                        whileTap={{scale : 0.95}} className={formCSS.submit} type='submit'
                        style={{cursor: loading ? 'not-allowed' : 'pointer'}}
                    >
                        {loading ? <ThreeCircles
                            visible={true} height="20" width="20" color="var(--first-color)"
                            ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                            /> : 
                            'Add Book'
                        }
                    </motion.button>

                </form>

            </div>

        </div>

    </React.Fragment>

}
