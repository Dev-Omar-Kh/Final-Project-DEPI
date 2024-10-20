import React, { useEffect, useState } from 'react';


import { BiErrorAlt } from 'react-icons/bi';
import Products from '../../../Components/Site/Products/Products';
import { ThreeCircles } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBooks } from '../../../Store/BookSlice';

import errorHandleCSS from '../../../Styles/db_tables.module.css';
import commonCSS from '../../../Styles/home_common.module.css';

export default function OffersPage() {

    // ====== books-data ====== //

    const [filteredData, setFilteredData] = useState(null);

    const {bookLoading , bookError , bookData} = useSelector((store) => store.api);

    const disPatch = useDispatch()

    useEffect(() => {

        disPatch(getAllBooks());

    } , [disPatch]);

    useEffect(() => {

        if(bookData?.data){
            setFilteredData(bookData.data.filter(book => book.offer))
        }

    }, [bookData]);

    if(!filteredData){

        return <React.Fragment>

            <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <ThreeCircles
                    visible={true} height="50" width="50" color="var(--active-color)"
                    ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                />
            </div>

        </React.Fragment>

    }

    return <React.Fragment>

        {bookLoading ? <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <ThreeCircles
                visible={true} height="50" width="50" color="var(--active-color)"
                ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
            />
        </div> : (bookError ? <div className={errorHandleCSS.empty_doc}>
            <BiErrorAlt />
            <h3>Error on fetch books</h3>
        </div> : <div className={commonCSS.container}>

            <Products data={filteredData} />

        </div>)}

    </React.Fragment>

}
