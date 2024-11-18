import React, { useEffect, useState } from 'react';


import { BiErrorAlt } from 'react-icons/bi';
import Products from '../../../Components/Site/Products/Products';
import { ThreeCircles } from 'react-loader-spinner';
import { useSelector } from 'react-redux'; 

import errorHandleCSS from '../../../Styles/db_tables.module.css';
import commonCSS from '../../../Styles/home_common.module.css';
import Titles from '../Home/Titles-Home/Titles';

export default function OffersPage() {

    // ====== books-data ====== //

    const [filteredData, setFilteredData] = useState(null);

    const {bookLoading , bookError , bookData} = useSelector((store) => store.api); 

    useEffect(() => {

        if(bookData?.data){
            setFilteredData(bookData.data.filter(book => book.offer))
        }

    }, [bookData]);

    if(!filteredData){

        return <React.Fragment>

            <div style={{
                width: '100%',  height: '500px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                <ThreeCircles
                    visible={true} height="50" width="50" color="var(--active-color)"
                    ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                />
            </div>

        </React.Fragment>

    }

    return <React.Fragment>

        <div className={commonCSS.container}>

            <Titles title={' Offers'} />

            {bookLoading ? <div style={{
                width: '100%',  height: '500px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                <ThreeCircles
                    visible={true} height="50" width="50" color="var(--active-color)"
                    ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                />
            </div> : (bookError ? <div className={errorHandleCSS.empty_doc}>
                <BiErrorAlt />
                <h3>Error on fetch books</h3>
            </div> : <>

                <Products data={filteredData} />

            </>)}

        </div>

    </React.Fragment>

}
