import React, { useEffect, useState } from 'react';

import commonCSS from '../../../Styles/home_common.module.css';
import cartCSS from './cart.module.css';
import Titles from '../Home/Titles-Home/Titles';
import CartCard from './CartCard';
import { Link } from 'react-router-dom';
import { AllCartDelete, Axios } from '../../../API/Api';
import { ThreeCircles } from 'react-loader-spinner';
import { BiErrorAlt } from 'react-icons/bi';
import { TbShoppingCartX } from 'react-icons/tb';
import { AnimatePresence } from 'framer-motion';
import Status from '../../../Components/Common/Status/Status';
import Warning from '../../../Components/Common/Warning/Warning';
import { useDispatch, useSelector } from 'react-redux';
import { getCardElements } from './../../../Store/CartSlice';

export default function Cart() {

    // ====== get-cart-data ====== //

    const [refetch, setRefetch] = useState(false);
    const disPatch = useDispatch()

    useEffect(() => {

        disPatch(getCardElements());

    } , [disPatch , refetch]);

    const {cartLoading , cartError , cartData} = useSelector((store) => store.cart); 

    // ====== delete-user-cart ====== //

    const [displayWarn, setDisplayWarn] = useState(false);
    const [deleteCart, setDeleteCart] = useState(null);
    const [cartDataDelete, setCartDataDelete] = useState(null);

    const [errMsg, setErrMsg] = useState(null);
    const [visible, setVisible] = useState(true);
    const [successMsg, setSuccessMsg] = useState(null);

    const deleteAllUserCart = () => {

        setDisplayWarn(true);
        setCartDataDelete('cartWarn');

    }

    useEffect(() => {

        const deleteCartDataDeleteAsync = async() => {

            if(deleteCart){

                setErrMsg(null);
                setSuccessMsg(null);

                try {

                    const {data} = await Axios.delete(`${AllCartDelete}` , {withCredentials: true});

                    if(data.success){

                        setDisplayWarn(false);
                        setSuccessMsg(data.message);
                        setCartDataDelete(null);

                        setTimeout(() => {
                            setRefetch(!refetch);
                        }, 3600);

                    }

                } catch (error) {
                    setErrMsg(error.response?.data?.message || error.message);
                } finally{
                    setDeleteCart(null);
                }
            }

        }

        deleteCartDataDeleteAsync();

    } , [deleteCart , refetch]);

    return <React.Fragment>

        <AnimatePresence>
            {displayWarn && 
                <Warning
                    cancel={setDisplayWarn}
                    setDeleteData={setDeleteCart}
                    deleteData={deleteCart}
                    data={cartDataDelete}
                />
            }
        </AnimatePresence>

        {successMsg ? <Status icon='success' isVisible={visible} visibility={setVisible} data={successMsg} /> : ''}
        {errMsg ? <Status icon='error' isVisible={visible} visibility={setVisible} data={errMsg} /> : ''}


        <div className={commonCSS.container}>

            <Titles title={' My Cart'} />

            {cartLoading ? <div style={{
                width: '100%', height: '400px',
                display: 'flex' , alignItems: 'center', justifyContent: 'center'
            }}>

                    <ThreeCircles
                        visible={true} height="50" width="50" color="var(--active-color)"
                        ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                    />

                </div> : (cartError ? <div className={cartCSS.empty_cart}>

                    <BiErrorAlt />
                    <h3>Error on fetch cart</h3>

                </div> : <>

                {cartData && cartData.data && cartData.data.length > 0 && <div className={cartCSS.main_det}>

                    <p>Cart Items: <span>{cartData?.data.length} BOOK</span></p>

                    <button onClick={() => deleteAllUserCart()}>Delete the cart</button>

                </div>}

                <div className={cartCSS.container}>

                    {
                        cartData && cartData.data && cartData.data.length === 0 ? <div className={cartCSS.empty_cart}>

                            <TbShoppingCartX />
                            <p>Card is empty</p>

                        </div> : (cartData && cartData.data && cartData?.data.map(book => <CartCard 
                            key={book.bookId._id} data={book} refetch={refetch} reRefetch={setRefetch}
                        />))
                    }

                </div>

                <div className={cartCSS.main_det}>

                    <p>Total Cart Price: <span>{cartData?.totalPrice} EGP</span></p>

                    {cartData && cartData.data && cartData.data.length === 0 ? 
                        <Link to={'/books'}>Go to shopping</Link> : <Link to={'/checkout'}>Check Out</Link>
                    }

                </div>
            </>)}

        </div>

    </React.Fragment>

}
