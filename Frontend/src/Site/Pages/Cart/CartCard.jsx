import React, { useState } from 'react';

import cartCardCSS from './cart.module.css';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { MdOutlineDelete } from 'react-icons/md';
import { IoSaveOutline } from 'react-icons/io5';
import { Axios, CartDelete, CartUpdate } from '../../../API/Api';
import Status from '../../../Components/Common/Status/Status';
import { ThreeCircles } from 'react-loader-spinner';

export default function CartCard({data , refetch , reRefetch}) {

    // increment-decrement-count 

    const [updateCount, setUpdateCount] = useState(data.quantity);

    const increment = () => {

        if(updateCount > 0){

            setUpdateCount(updateCount + 1);

        }

    }

    const decrement = () => {

        if(updateCount > 1){

            setUpdateCount(updateCount - 1);

        }

    }

    // ====== update-book ====== //

    const [errMsg, setErrMsg] = useState(null);
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(false)
    const [successMsg, setSuccessMsg] = useState(null);

    const values = {
        bookId: data.bookId._id,
        quantity: updateCount
    }

    const updateCartElement = async() => {

        setErrMsg(null);
        setSuccessMsg(null);
        setLoading(true);

        try {

            const {data} = await Axios.patch(`${CartUpdate}` , values , {withCredentials: true});

            if(data.success){

                setSuccessMsg(data.message);

                setTimeout(() => {
                    reRefetch(!refetch);
                }, 3600);

            }

        } catch (error) {
            setErrMsg(error.response.data.message);
        }finally{
            setLoading(false);
        }

    }

    // ====== delete-book ====== //

    const deleteValue = {
        bookId: data.bookId._id,
    }

    const deleteBook = async() => {

        setErrMsg(null);
        setSuccessMsg(null);
        setLoading(true);

        try {

            const {data} = await Axios.delete(`${CartDelete}` , {
                data: deleteValue,
                withCredentials: true
            });

            if(data.success){

                setSuccessMsg(data.message);

                setTimeout(() => {
                    reRefetch(!refetch);
                }, 3600);

            }

        } catch (error) {
            setErrMsg(error.response.data.message);
        }finally{
            setLoading(false);
        }

    }

    return <React.Fragment>

        {successMsg ? <Status icon='success' isVisible={visible} visibility={setVisible} data={successMsg} /> : ''}
        {errMsg ? <Status icon='error' isVisible={visible} visibility={setVisible} data={errMsg} /> : ''}

        <div className={cartCardCSS.card}>

            {loading && <div className={cartCardCSS.loading}>

                <ThreeCircles
                    visible={true} height="50" width="50" color="var(--first-color)"
                    ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                />

            </div>}

            <div className={cartCardCSS.action}>

                <button onClick={deleteBook}><MdOutlineDelete /></button>

            </div>

            <div className={cartCardCSS.card_img}>

                <img src={data.bookId.image ? data?.bookId.image : ''} alt="" />

            </div>

            <div className={cartCardCSS.card_det}>

                <h3>{data?.bookId.title}</h3>

                {data.bookId.offer ? 
                    <div className={cartCardCSS.price_cont}>
                        <p className={cartCardCSS.book_price_title}>Price : </p>
                        <span className={cartCardCSS.book_price}>
                            {(data.bookId.price - (data.bookId.price * (data.bookId.offer / 100))).toFixed(2)} 
                            <span>EGP</span>
                        </span>
                    </div> : 
                    <div className={cartCardCSS.price_cont}>
                        <p className={cartCardCSS.book_price_title}>Price : </p>
                        <span className={cartCardCSS.book_price}>
                            {data?.bookId.price.toFixed(2)} 
                            <span>EGP</span>
                        </span>
                    </div> 
                }

                <div className={cartCardCSS.counter}>

                    <button onClick={increment}><FaPlus /></button>

                    <p>{updateCount}</p>

                    <button onClick={decrement}><FaMinus /></button>

                </div>

                {data.bookId.offer ? 
                    <div className={cartCardCSS.price_cont}>
                        <p className={cartCardCSS.book_price_title}>Total Price : </p>
                        <span className={cartCardCSS.book_price}>
                            {(data.quantity * (data.bookId.price - (data.bookId.price * (data.bookId.offer / 100)))).toFixed(2)} 
                            <span>EGP</span>
                        </span>
                    </div>  :
                    <div className={cartCardCSS.price_cont}>
                        <p className={cartCardCSS.book_price_title}>Total Price : </p>
                        <span className={cartCardCSS.book_price}>
                            {(data.quantity * data.bookId.price).toFixed(2)} 
                            <span>EGP</span>
                        </span>
                    </div> 
                }

                <button 
                    className={`${cartCardCSS.edit_action} ${updateCount !== data.quantity ? cartCardCSS.edit_active : ''}`}
                    disabled={updateCount === data.quantity}
                    onClick={updateCartElement}
                >
                    <IoSaveOutline />
                    <span>Update</span>
                </button>

            </div>

        </div>

    </React.Fragment>

}
