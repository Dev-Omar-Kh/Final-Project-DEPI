import React from 'react';

import { MdOutlineShoppingBag } from 'react-icons/md';

import titleCSS from '../../../Styles/db_title.module.css';
import ordersCSS from './orders.module.css';
import OrderCard from './OrderCard';
import FakeOrders from './FakeOrders';

export default function Orders() {

    const orders = FakeOrders;

    return <React.Fragment>

        <div className={titleCSS.container}>

            <div className={titleCSS.title}>

                <div className={titleCSS.title_box}>

                    <MdOutlineShoppingBag />
                    <p>Orders</p>

                </div>

            </div>

            <div className={ordersCSS.container}>

                {orders.map( order => <OrderCard key={order._id} data={order} />)}

            </div>

        </div>

    </React.Fragment>

}
