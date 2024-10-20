import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { LuImagePlus } from 'react-icons/lu';
import { BsPatchPlusFill } from 'react-icons/bs';

import formCSS from '../../../Styles/forms.module.css';
import titleCSS from '../../../Styles/db_title.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { Axios, BookAdd } from '../../../API/Api';
import Status from '../../../Components/Common/Status/Status';

export default function AddBook() {

    // ====== send-book-data ====== //

    const [errMsg, setErrMsg] = useState(null);
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(false)
    const [successMsg, setSuccessMsg] = useState(null);

    const [previewImage, setPreviewImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    
    const navigate = useNavigate();

    const values = {

        title:'',
        author:'',
        category:'',
        description:'',
        price: '',
        offer:'',
        image:''

    }

    const addBookData = async(values) => {

        setErrMsg(null);
        setSuccessMsg(null);
        setLoading(true);

        try {

            const {data} = await Axios.post(`${BookAdd}` , values , {withCredentials: true});

            if(data.success){

                setSuccessMsg(data.message);

                setTimeout(() => {
                    navigate('/admin/books');
                }, 3600);

            }

        } catch (error) {
            setErrMsg(error.response.data.message);
        }

        setLoading(false);

    }

    const formikObj = useFormik({

        initialValues: values,

        onSubmit: addBookData,

        validate: (values) => {

            const errors = {};

            if(values.title.length < 3){
                errors.title = 'Name is too short';
            }
            if(values.title.length === 0){
                errors.title = 'Name is required';
            }
            if(values.title.length > 50){
                errors.title = 'Name is too long';
            }

            if(values.author.length < 3){
                errors.author = 'Name is too short';
            }
            if(values.author.length === 0){
                errors.author = 'Name is required';
            }
            if(values.author.length > 50){
                errors.author = 'Name is too long';
            }

            if(values.category.length < 2){
                errors.category = 'Category is too short';
            }
            if(values.category.length === 0){
                errors.category = 'Category is required';
            }
            if(values.category.length > 50){
                errors.category = 'Category is too long';
            }

            if(values.price.length === 0){
                errors.price = 'Price is required';
            }

            if (!values.image) {
                errors.image = 'Image is required';
            }

            if(values.description.length < 10){
                errors.description = 'Description is too short';
            }
            if(values.description.length === 0){
                errors.description = 'Description is required';
            }
            if(values.description.length > 5000){
                errors.description = 'Description is too long';
            }

            return errors;

        }

    });

    const handleImageChange = async(event) => {

        const file = event.target.files[0];
        if (file) {

            setPreviewImage(URL.createObjectURL(file));

            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'wrf1gdxo');
            setUploading(true);

            try {

                const res = await axios.post(`https://api.cloudinary.com/v1_1/dh6zttcrq/image/upload`, formData);
                const imageUrl = res.data.secure_url;

                formikObj.setFieldValue("image", imageUrl);

            } catch (error) {
                console.error('Error uploading image to Cloudinary:', error);
            }

            setUploading(false);

        }

    };

    return <React.Fragment>

        {successMsg ? <Status icon='success' isVisible={visible} visibility={setVisible} data={successMsg} /> : ''}
        {errMsg ? <Status icon='error' isVisible={visible} visibility={setVisible} data={errMsg} /> : ''}

        <div className={titleCSS.container}>

            <div className={titleCSS.title}>

                <div className={titleCSS.title_box}>

                    <BsPatchPlusFill />
                    <p>Add Book</p>

                </div>

            </div>

            <div className={formCSS.form_cont}>

                <form 
                    onSubmit={formikObj.handleSubmit}
                    className={formCSS.form} style={{padding: 0 , opacity: loading ? 0.6 : 1}}
                >

                    <div className={formCSS.input_cont} style={{opacity: uploading ? 0.6 : 1}}>

                        {previewImage && <div className={formCSS.book_img_view}>
                            <img src={previewImage} alt="Book Preview" />
                        </div>}

                        {formikObj.errors.image && formikObj.touched.image && 
                            <span className={formCSS.label_err}>* {formikObj.errors.image}</span>
                        }

                        <label htmlFor="book_img" className={formCSS.file_span}>
                            {uploading ? 
                                <div>
                                    <ThreeCircles
                                        visible={true} height="20" width="20" color="var(--active-color)"
                                        ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                                    />
                                </div> : <p>
                                    <LuImagePlus />
                                    Select the book image
                                </p>
                            }
                        </label>
                        <input 
                            id='book_img' className={formCSS.book_img} 
                            type="file" 
                            onChange={handleImageChange} 
                            disabled={uploading} 
                        />

                    </div>

                    <div className={formCSS.input_cont}>

                        <div className={formCSS.loader}></div>

                        <label htmlFor="title">
                            <span className={formCSS.label}>Book Name :</span>
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
                            disabled={loading}
                        />

                    </div>

                    <div className={`${formCSS.input_cont} ${formCSS.half_input_cont}`}>

                        <div className={formCSS.loader}></div>

                        <label htmlFor="author">
                            <span className={formCSS.label}>Book Author :</span>
                            {formikObj.errors.author && formikObj.touched.author && 
                                <span className={formCSS.label_err}>* {formikObj.errors.author}</span>
                            }
                        </label>
                        <input 
                            id='author' 
                            type="text" placeholder="Enter the book's author name" 
                            onBlur={formikObj.handleBlur}
                            style={formikObj.touched.author && formikObj.errors.author ?
                                {borderColor : 'var(--error-color)'} : {}
                            }
                            onChange={formikObj.handleChange}
                            value={formikObj.values.author}
                            disabled={loading}
                        />

                    </div>

                    <div className={`${formCSS.input_cont} ${formCSS.half_input_cont}`}>

                        <div className={formCSS.loader}></div>

                        <label htmlFor="category">
                            <span className={formCSS.label}>Book Category :</span>
                            {formikObj.errors.category && formikObj.touched.category && 
                                <span className={formCSS.label_err}>* {formikObj.errors.category}</span>
                            }
                        </label>
                        <input 
                            id='category' 
                            type="text" placeholder="Enter the book's category" 
                            onBlur={formikObj.handleBlur}
                            style={formikObj.touched.category && formikObj.errors.category ?
                                {borderColor : 'var(--error-color)'} : {}
                            }
                            onChange={formikObj.handleChange}
                            value={formikObj.values.category}
                            disabled={loading}
                        />

                    </div>

                    <div className={`${formCSS.input_cont} ${formCSS.half_input_cont}`}>

                        <div className={formCSS.loader}></div>

                        <label htmlFor="price">
                            <span className={formCSS.label}>Book Price :</span>
                            {formikObj.errors.price && formikObj.touched.price && 
                                <span className={formCSS.label_err}>* {formikObj.errors.price}</span>
                            }
                        </label>
                        <input 
                            id='price' 
                            type="text" placeholder="Enter the book's price" 
                            onBlur={formikObj.handleBlur}
                            style={formikObj.touched.price && formikObj.errors.price ?
                                {borderColor : 'var(--error-color)'} : {}
                            }
                            onChange={formikObj.handleChange}
                            value={formikObj.values.price}
                            disabled={loading}
                        />

                    </div>

                    <div className={`${formCSS.input_cont} ${formCSS.half_input_cont}`}>

                        <div className={formCSS.loader}></div>

                        <label htmlFor="offer">
                            <span className={formCSS.label}>Book Offer :</span>
                        </label>
                        <input 
                            id='offer'
                            type="text" placeholder="Enter the book's offer" 
                            onChange={formikObj.handleChange}
                            value={formikObj.values.offer}
                            disabled={loading}
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
                            onBlur={formikObj.handleBlur}
                            style={formikObj.touched.description && formikObj.errors.description ?
                                {borderColor : 'var(--error-color)'} : {}
                            }
                            onChange={formikObj.handleChange}
                            value={formikObj.values.description}
                            disabled={loading}
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
