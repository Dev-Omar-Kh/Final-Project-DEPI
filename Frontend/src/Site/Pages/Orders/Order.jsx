import React from 'react';
import Titles from '../Home/Titles-Home/Titles';
import { motion } from 'framer-motion';

import commonCSS from '../../../Styles/home_common.module.css';
import ordersCSS from './orders.module.css';
import OrderCard from './OrderCard';
import { Axios, GetOrdersByUserId } from '../../../API/Api';
import { useQuery } from 'react-query';
import { ThreeCircles } from 'react-loader-spinner';
import { BiErrorAlt } from 'react-icons/bi';

export default function Order() {

    // ====== get-orders-by-id ====== //

    const getAllOrders = async() => {

        const response = await Axios.get(`${GetOrdersByUserId}` , {withCredentials: true});
        return response;

    }

    const {data , isLoading , isError} = useQuery('getOrders' , getAllOrders);

    // ====== framer-motion ====== //

    const ParentVariants = {

        hidden: {opacity: 0},
        visible: {opacity: 1 , transition: {duration: 0.3 , staggerChildren : 0.3}},

    }

    return <React.Fragment>

        <motion.div 
            variants={ParentVariants} initial='hidden' animate='visible' 
            className={`${commonCSS.container}`}
        >

            <Titles title={' All Orders'} />

            <div className={ordersCSS.cards_cont}>

                {isLoading ? <div style={{
                    width: '100%', height: '400px',
                    display: 'flex' , alignItems: 'center', justifyContent: 'center'
                }}>

                    <ThreeCircles
                        visible={true} height="50" width="50" color="var(--active-color)"
                        ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                    />

                </div> : (isError ? <div className={ordersCSS.empty_order}>

                    <BiErrorAlt />
                    <h3>No Order Yet</h3>

                </div> : data.data.data.map(
                    (order , idx) => <OrderCard key={order._id} num={(idx + 1).toString().padStart(3, '0')} data={order} />
                ))}

            </div>

        </motion.div>

    </React.Fragment>

}
