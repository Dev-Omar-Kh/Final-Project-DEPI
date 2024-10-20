import React, { useEffect, useState } from 'react';

import commonCSS from '../../../../Styles/home_common.module.css';
import errorHandleCSS from '../../../../Styles/db_tables.module.css';
import popularCSS from './popular.module.css';
import Products from '../../../../Components/Site/Products/Products';
import { IoMdArrowRoundForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Titles from '../Titles-Home/Titles';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBooks } from '../../../../Store/BookSlice';
import { ThreeCircles } from 'react-loader-spinner';
import { BiErrorAlt } from 'react-icons/bi';


export default function Popular() {

    // ====== get-data ====== //

    const [filteredData, setFilteredData] = useState(null);
    const [uniqueCategories, setUniqueCategories] = useState(null);

    const {bookLoading , bookError , bookData} = useSelector((store) => store.api);

    const disPatch = useDispatch()

    useEffect(() => {

        disPatch(getAllBooks());

    } , [disPatch]);

    useEffect(() => {

        if(bookData?.data){

            const categories = bookData.data.map(book => book.category);
            setUniqueCategories([...new Set(categories)]);

            setFilteredData(bookData.data);

        }

    }, [bookData]);

    // ====== get-single-category ====== //

    const [category, setCategory] = useState(null);


    useEffect(() => {

        if(category){
            setFilteredData(bookData?.data.filter(book => book.category === category));
        }
        else{
            setFilteredData(bookData?.data);
        }

    } , [category , bookData]);

    // ====== framer-motion ====== //

    const linkVariants = {

        hidden: {opacity: 0 , y: 40},
        visible: {opacity: 1 , y: 0 , transition: {duration: 0.3}},
        exit: {opacity: 0 , y: 40 , transition: {duration: 0.3}}

    }

    const cateVariants = {

        hidden: {opacity: 0 , scale: 0.95},
        visible: {opacity: 1 , scale: 1 , transition: {duration: 0.3}},
        exit: {opacity: 0 , scale: 0.95, transition: {duration: 0.3}}

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

            <Titles title={'Popular Books'} />

            <motion.div 
                variants={cateVariants} 
                initial='hidden' whileInView={'visible'} viewport={{once: true , amount: 0.5}}
                className={popularCSS.categories_cont}
            >

                <div className={popularCSS.cate_box}>

                    <button 
                        onClick={() => setCategory(null)} 
                        className={`${popularCSS.cate} ${category === null ? popularCSS.active : ''}`}
                    >
                        All Books
                    </button>

                    {uniqueCategories.map((cate , idx) => {
                        return <button 
                            key={idx}
                            onClick={() => setCategory(cate)} 
                            className={`${popularCSS.cate} ${cate === category ? popularCSS.active : ''}`}
                        >
                            {cate}
                        </button>
                    })}

                </div>

            </motion.div>

            <Products category={category} data={filteredData} />

            {filteredData.length > 5 && <motion.div
                variants={linkVariants}
                initial='hidden' whileInView={'visible'} viewport={{once: true , amount: 1}}
                className={commonCSS.link}
            >

                <Link to={'/books'}>
                    <p>View more books</p>
                    <IoMdArrowRoundForward />
                </Link>

            </motion.div>}

        </div>)}

    </React.Fragment>

}
