import React, { useEffect, useState } from 'react';

import bookCSS from '../../../Styles/db_books.module.css';
import { MdDeleteOutline, MdEdit } from 'react-icons/md';
import Status from '../../Common/Status/Status';
import Warning from './../../Common/Warning/Warning';
import { AnimatePresence } from 'framer-motion';
import { Axios, DeleteBook } from '../../../API/Api';
import { Link } from 'react-router-dom';

export default function BookCard({book , refetch}) {

    // ====== delete-book ======

    const [displayWarn, setDisplayWarn] = useState(false);
    const [bookData, setBookData] = useState(null);
    const [deleteBook, setDeleteBook] = useState(null);

    const [errMsg, setErrMsg] = useState(null);
    const [visible, setVisible] = useState(true);
    const [successMsg, setSuccessMsg] = useState(null);

    const goToDeleteBook = () => {

        setDisplayWarn(true);
        setBookData(book);

    }

    useEffect(() => {

        const deleteBookById = async() => {
            if(deleteBook){

                setErrMsg(null);
                setSuccessMsg(null);

                try {

                    const {data} = await Axios.delete(`${DeleteBook}/${deleteBook}` , {withCredentials: true});

                    if(data.success){

                        setDisplayWarn(false);
                        setBookData(null);
                        setSuccessMsg(data.message);

                        setTimeout(() => {
                            refetch();
                        }, 3600);

                    }

                } catch (error) {
                    setErrMsg(error);
                }finally{
                    setDeleteBook(null);
                }
            }
        }

        deleteBookById();

    } , [deleteBook , refetch]);

    return <React.Fragment>

        <AnimatePresence>
            {displayWarn && 
                <Warning
                    cancel={setDisplayWarn}
                    setDeleteData={setDeleteBook}
                    deleteData={deleteBook}
                    data={bookData}
                />
            }
        </AnimatePresence>

        {successMsg ? <Status icon='success' isVisible={visible} visibility={setVisible} data={successMsg} /> : ''}
        {errMsg ? <Status icon='error' isVisible={visible} visibility={setVisible} data={errMsg} /> : ''}

        <div className={bookCSS.card}>

            <div className={bookCSS.actions}>

                <Link to={`update/${book._id}`}><MdEdit /></Link>
                <button onClick={goToDeleteBook}><MdDeleteOutline /></button>

            </div>

            <div className={bookCSS.book_img}>
                <img src={book.image} alt={book.title} />
            </div>

            <div className={bookCSS.book_det}>

                <p className={bookCSS.book_name}>{book.title}</p>

                <p className={bookCSS.book_author}>" {book.author} "</p>

                <p className={bookCSS.book_des}>{book.description}</p>

                <div className={bookCSS.book_price}>

                    <p className={bookCSS.new_price}>
                        {book.offer ? (book.price - (book.price * (book.offer / 100))).toFixed(2) : book.price ? book.price : '1000'}
                        <span>EGP</span>
                    </p>

                    {book.offer && <p className={bookCSS.old_price}>{book.price} EGP</p>}

                </div>

            </div>

        </div>

    </React.Fragment>

}
