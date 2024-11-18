import React, { useState } from 'react';

import orderCardCSS from './orders.module.css';
import { BiDetail } from 'react-icons/bi';
import { AnimatePresence } from 'framer-motion';
import OrderDetAdmin from './OrderDetAdmin';

export default function OrderCard({data}) {

    // ====== display-order-details ====== //

    const [displayDetails, setDisplayDetails] = useState(false);

    return <React.Fragment>

        <AnimatePresence>

            {displayDetails && <OrderDetAdmin details={data} display={setDisplayDetails} />}

        </AnimatePresence>

        <div className={orderCardCSS.card}>

            <div className={orderCardCSS.order_info}>

                <p>Name : <span>{data.fullName}</span></p>

                <p>Email : <span>{data.email}</span></p>

                <p>Phone : <span>{data.phone}</span></p>

            </div>

            <div className={orderCardCSS.order_det}>

                <p>Order Price : <span>{data.totalAmount.toFixed(2)} EGP</span></p>

            </div>

            <div className={orderCardCSS.action}>

                <button onClick={() => setDisplayDetails(true)} className={orderCardCSS.details}>
                    <BiDetail />
                    Details
                </button>

            </div>

        </div>

    </React.Fragment>

}
