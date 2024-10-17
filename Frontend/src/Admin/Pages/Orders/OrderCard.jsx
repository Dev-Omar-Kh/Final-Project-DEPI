import React from 'react';

import { IoBanSharp } from 'react-icons/io5';

import orderCardCSS from './orders.module.css';

export default function OrderCard({data}) {

    return <React.Fragment>

        <div className={orderCardCSS.card}>

            <div className={orderCardCSS.order_info}>

                <p>Name : <span>{data.name}</span></p>

                <p>Email : <span>{data.email}</span></p>

                <p>Phone : <span>{data.phone}</span></p>

            </div>

            <div className={orderCardCSS.order_det}>

                <p>{data.orders.map((order , idx) => <span key={order._id}>
                    {order.book}
                    {idx < data.orders.length - 1 && ' - '}
                </span>)}</p>

            </div>

            <div className={orderCardCSS.action}>

                <button>
                    <IoBanSharp />
                    Delete
                </button>

            </div>

        </div>

    </React.Fragment>

}
