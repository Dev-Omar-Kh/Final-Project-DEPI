import React, { useEffect, useState } from 'react';
// import FakeDataBooks from './../../../../FakeDataBooks';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { IoMdArrowRoundForward } from 'react-icons/io';

import commonCSS from '../../../../Styles/home_common.module.css';
import errorHandleCSS from '../../../../Styles/db_tables.module.css';
import Products from '../../../../Components/Site/Products/Products';
import Titles from '../Titles-Home/Titles';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBooks } from '../../../../Store/BookSlice';
import { ThreeCircles } from 'react-loader-spinner';
import { BiErrorAlt } from 'react-icons/bi';

export default function Featured() {

    // ====== books-data ====== //

    const [filteredData, setFilteredData] = useState(null);

    const {bookLoading , bookError , bookData} = useSelector((store) => store.api);

    const disPatch = useDispatch()

    useEffect(() => {

        disPatch(getAllBooks());

    } , [disPatch]);

    useEffect(() => {

        if(bookData?.data){
            setFilteredData(bookData.data.slice(0 , 4))
        }

    }, [bookData]);

    // ====== framer-motion ====== //

    const linkVariants = {

        hidden: {opacity: 0 , y: 40},
        visible: {opacity: 1 , y: 0 , transition: {duration: 0.3}},
        exit: {opacity: 0 , y: 40 , transition: {duration: 0.3}}

    }

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

            <Titles title={'Featured Books'} />

            <Products data={filteredData} />

            <motion.div
                variants={linkVariants}
                initial='hidden' whileInView={'visible'} viewport={{once: true , amount: 1}}
                className={commonCSS.link}
            >

                <Link to={'/books'}>
                    <p>View all books</p>
                    <IoMdArrowRoundForward />
                </Link>

            </motion.div>

        </div>)}

    </React.Fragment>

}
