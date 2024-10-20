import React, { useState } from 'react';

import { BsPatchPlusFill } from 'react-icons/bs';

import formCSS from '../../../Styles/forms.module.css';
import titleCSS from '../../../Styles/db_title.module.css';
import errorHandleCSS from '../../../Styles/db_tables.module.css'
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { Axios, GetNewsSingle, NewsUpdate } from '../../../API/Api';
import Status from '../../../Components/Common/Status/Status';
import { ThreeCircles } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { BiErrorAlt } from 'react-icons/bi';

export default function UpdateNews() {

    // ====== get-single-news ====== //

    const {id} = useParams();

    const singleNews = async() => {

        return await Axios.get(`${GetNewsSingle}/${id}` , {withCredentials: true});

    }

    const {data , isLoading , isError} = useQuery('getSingleNews' , singleNews);
    const news = data?.data.data;

    // ====== update-news ====== //

    const [errMsg, setErrMsg] = useState(null);
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(false)
    const [successMsg, setSuccessMsg] = useState(null);

    const navigate = useNavigate();

    const values = {

        title: news?.title || '',
        date: news?.date || '',
        description: news?.description || '',

    }

    const updateNews = async(values) => {

        setErrMsg(null);
        setSuccessMsg(null);
        setLoading(true);

        try {

            const {data} = await Axios.patch(`${NewsUpdate}/${id}` , values , {withCredentials: true});

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

        onSubmit: updateNews,

        enableReinitialize: true,

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

            {isLoading ? <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>

                <ThreeCircles
                    visible={true} height="50" width="50" color="var(--active-color)"
                    ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                />

            </div> : (isError ? <div className={errorHandleCSS.empty_doc}>

                <BiErrorAlt />
                <h3>Error on fetch news</h3>

            </div> : <div className={formCSS.form_cont}>

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

            </div>)}

        </div>

    </React.Fragment>

}
