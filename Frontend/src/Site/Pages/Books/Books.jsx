import React, { useEffect, useState } from 'react';

import commonCSS from '../../../Styles/home_common.module.css';
import errorHandleCSS from '../../../Styles/db_tables.module.css';
import Products from '../../../Components/Site/Products/Products';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { ThreeCircles } from 'react-loader-spinner';
import { BiErrorAlt } from 'react-icons/bi';
import Titles from '../Home/Titles-Home/Titles';

export default function Books() {

    // ====== get-data ====== //

    const [filteredData, setFilteredData] = useState(null);
    const [uniqueCategories, setUniqueCategories] = useState(null);

    const {bookLoading , bookError , bookData} = useSelector((store) => store.api);

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

    const cateVariants = {

        hidden: {opacity: 0 , scale: 0.95},
        visible: {opacity: 1 , scale: 1 , transition: {duration: 0.3}},
        exit: {opacity: 0 , scale: 0.95, transition: {duration: 0.3}}

    }

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

            <Titles title={' All Books'} />

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

                <motion.div 
                    variants={cateVariants} 
                    initial='hidden' whileInView={'visible'} viewport={{once: true , amount: 0.5}}
                    className={commonCSS.categories_cont}
                >

                    <div className={commonCSS.cate_box}>

                        <button 
                            onClick={() => setCategory(null)} 
                            className={`${commonCSS.cate} ${category === null ? commonCSS.active : ''}`}
                        >
                            All Books
                        </button>

                        {uniqueCategories.map((cate , idx) => {
                            return <button 
                                key={idx}
                                onClick={() => setCategory(cate)} 
                                className={`${commonCSS.cate} ${cate === category ? commonCSS.active : ''}`}
                            >
                                {cate}
                            </button>
                        })}

                    </div>

                </motion.div>

                <Products category={category} data={filteredData} />

            </>)}

        </div>

    </React.Fragment>

}
