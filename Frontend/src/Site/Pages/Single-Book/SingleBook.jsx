import React, { useEffect, useState } from 'react';

import singleBookCSS from './s_book.module.css';
import errorHandleCSS from '../../../Styles/db_tables.module.css'
import { RiShoppingCartLine } from 'react-icons/ri';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Axios, BookGetSingle, CartAdd } from '../../../API/Api';
import { ThreeCircles } from 'react-loader-spinner';
import { BiErrorAlt } from 'react-icons/bi';
import Status from '../../../Components/Common/Status/Status';
import { AnimatePresence } from 'framer-motion';
import Loading from '../../../Components/Common/Page-Loading/Loading';

export default function SingleBook() {

    // ====== book-data ====== //

    const {id} = useParams();

    const getSingleBook = async() => {

        return await Axios.get(`${BookGetSingle}/${id}`);

    }

    const {data , isLoading , isError , refetch} = useQuery('getSingleBookById' , getSingleBook);

    const book = data?.data.data;

    // ====== refetch-on-url-changed ====== //

    const { pathname } = useLocation();

    useEffect(() => {

        refetch();

    } , [pathname , refetch]);

    // ====== add-to-cart ====== //

    const [errMsg, setErrMsg] = useState(null);
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(false)
    const [successMsg, setSuccessMsg] = useState(null);

    const addToCard = async(bookId) => {

        setErrMsg(null);
        setSuccessMsg(null);
        setLoading(true);

        try {

            const {data} = await Axios.post(`${CartAdd}` , {bookId} , {withCredentials: true});

            if(data.success){
                setSuccessMsg(data.message);
            }

        } catch (error) {
            setErrMsg(error.response.data.message);
        }finally{
            setLoading(false);
        }

    }

    return <React.Fragment>

        {successMsg ? <Status icon='success' isVisible={visible} visibility={setVisible} data={successMsg} /> : ''}
        {errMsg ? <Status icon='error' isVisible={visible} visibility={setVisible} data={errMsg} /> : ''}

        <AnimatePresence>
            {loading && <Loading />}
        </AnimatePresence>

        <div className={singleBookCSS.container}>

            {isLoading ? <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <ThreeCircles
                    visible={true} height="50" width="50" color="var(--active-color)"
                    ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                />
            </div> : (isError ? <div className={errorHandleCSS.empty_doc}>
                <BiErrorAlt />
                <h3>Error on fetch books</h3>
            </div>  : <div className={singleBookCSS.book_det}>

                <div className={singleBookCSS.book_img}>

                    <img src={book.image} alt="" />

                </div>

                <div className={singleBookCSS.book_info}>

                    <h3>{book.title}</h3>

                    <p className={singleBookCSS.author}>" {book.author} "</p>

                    <p className={singleBookCSS.description}>{book.description}</p>

                    <div className={singleBookCSS.price}>
                        <p className={singleBookCSS.new_price}>
                            {book.offer ? (book.price - (book.price * (book.offer / 100))).toFixed(2) : book.price}
                            <span>EGP</span>
                        </p>
                        {book.offer && <p className={singleBookCSS.old_price}>{book.price} EGP</p>}
                    </div>

                    <div className={singleBookCSS.actions}>

                        <button onClick={() => addToCard(book?._id)} className={singleBookCSS.add_cart}>
                            <RiShoppingCartLine className={singleBookCSS.action_icon} />
                            <p>Add to cart</p>
                        </button>

                    </div>

                </div>

            </div>)}

        </div>

    </React.Fragment>

}
