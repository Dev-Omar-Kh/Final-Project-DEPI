import React, { useEffect, useState } from 'react';

import commonCSS from '../../../Styles/home_common.module.css';
import FakeDataBooks from '../../../FakeDataBooks';
import Products from '../../../Components/Site/Products/Products';
import { motion } from 'framer-motion';

export default function Books() {

    // ====== get-categories ====== //

    const categories = FakeDataBooks.map(book => book.category);

    const uniqueCategories = [...new Set(categories)];

    // ====== get-single-category ====== //

    const [category, setCategory] = useState(null);
    const [booksData, setBooksData] = useState(FakeDataBooks);

    useEffect(() => {

        if(category){
            setBooksData(FakeDataBooks.filter(book => book.category === category));
        }
        else{
            setBooksData(FakeDataBooks);
        }

    } , [category]);

    const cateVariants = {

        hidden: {opacity: 0 , scale: 0.95},
        visible: {opacity: 1 , scale: 1 , transition: {duration: 0.3}},
        exit: {opacity: 0 , scale: 0.95, transition: {duration: 0.3}}

    }

    return <React.Fragment>

        <div className={commonCSS.container}>

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

            <Products category={category} data={booksData} />

        </div>

    </React.Fragment>

}
