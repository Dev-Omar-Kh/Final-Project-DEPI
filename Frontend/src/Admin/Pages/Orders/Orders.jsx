import React from 'react';

import { MdOutlineShoppingBag } from 'react-icons/md';

import titleCSS from '../../../Styles/db_title.module.css';
import ordersCSS from './orders.module.css';
import OrderCard from './OrderCard';
import { Axios, GetAllOrders } from './../../../API/Api';
import { useQuery } from 'react-query';
import { ThreeCircles } from 'react-loader-spinner';
import { BiErrorAlt } from 'react-icons/bi';

export default function Orders() {

    // ====== get-all-orders ====== //

    const getOrdersForAdmins = async() => {

        const response = await Axios.get(`${GetAllOrders}` , {withCredentials: true});
        return response;

    }

    const {data , isLoading , isError} = useQuery('getOrdersForAdmins' , getOrdersForAdmins);

    // console.log(data?.data.data);

    return <React.Fragment>

        <div className={titleCSS.container}>

            <div className={titleCSS.title}>

                <div className={titleCSS.title_box}>

                    <MdOutlineShoppingBag />
                    <p>Orders</p>

                </div>

            </div>

            <div className={ordersCSS.container}>

                {isLoading ? <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <ThreeCircles
                        visible={true} height="50" width="50" color="var(--active-color)"
                        ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                    />
                </div> : (isError ? <div className={titleCSS.empty_doc}>

                    <BiErrorAlt />
                    <h3>Error on fetch news</h3>

                </div> : data?.data.data.map( order => <OrderCard key={order._id} data={order} />))}

            </div>

        </div>

    </React.Fragment>

}
