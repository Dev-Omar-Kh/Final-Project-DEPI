import React from 'react';

import commonCSS from '../../../Styles/home_common.module.css';
import cartCSS from './cart.module.css';
import errorHandleCSS from '../../../Styles/db_tables.module.css'
import Titles from '../Home/Titles-Home/Titles';
import CartCard from './CartCard';
import { Link } from 'react-router-dom';
import { Axios, CartGetAll } from '../../../API/Api';
import { useQuery } from 'react-query';
import { ThreeCircles } from 'react-loader-spinner';
import { BiErrorAlt } from 'react-icons/bi';

export default function Cart() {

    // ====== get-cart-data ====== //

    const getCartData = async() => {

        return await Axios.get(`${CartGetAll}` , {withCredentials: true});

    }

    const {data , isLoading , isError , refetch} = useQuery('getAllCartElements' , getCartData);

    return <React.Fragment>

        <div className={commonCSS.container}>

            <Titles title={' My Cart'} />

            <div className={cartCSS.container}>

                {isLoading ? <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>

                    <ThreeCircles
                        visible={true} height="50" width="50" color="var(--active-color)"
                        ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                    />

                </div> : (isError ? <div className={errorHandleCSS.empty_doc}>

                    <BiErrorAlt />
                    <h3>Error on fetch cart</h3>

                </div> : 
                (data.data.data.length === 0 ? 'No Data' : (data.data.data.map(book => <CartCard 
                    key={book._id} refetch={refetch} data={book} 
                />))))
                }

            </div>

            <div className={cartCSS.main_det}>

                {/* <p>Total Price: <span>45000 EGP</span></p> */}

                <Link>Check Out</Link>

            </div>

        </div>

    </React.Fragment>

}
