import React from 'react';

import singleBookCSS from './s_book.module.css';
import { FaRegHeart } from 'react-icons/fa6';
import { RiShoppingCartLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import FakeDataBooks from '../../../FakeDataBooks';

export default function SingleBook() {

    // ====== book-data ====== //

    const {id} = useParams();

    const book = FakeDataBooks.find(book => book._id === id);

    return <React.Fragment>

        <div className={singleBookCSS.container}>

            <div className={singleBookCSS.book_det}>

                <div className={singleBookCSS.book_img}>

                    <img src={book.imageURL} alt="" />

                </div>

                <div className={singleBookCSS.book_info}>

                    <h3>{book.bookTitle}</h3>

                    <p className={singleBookCSS.author}>" {book.authorName} "</p>

                    <p className={singleBookCSS.description}>{book.bookDescription}</p>

                    <div className={singleBookCSS.price}>
                        <p className={singleBookCSS.new_price}>
                            {book.offer ? (book.price - (book.price * (book.offer / 100))).toFixed(2) : book.price}
                            <span>EGP</span>
                        </p>
                        {book.offer && <p className={singleBookCSS.old_price}>{book.price} EGP</p>}
                    </div>

                    <div className={singleBookCSS.actions}>

                        <button className={singleBookCSS.add_cart}>
                            <RiShoppingCartLine className={singleBookCSS.action_icon} />
                            <p>Add to cart</p>
                        </button>
                        <button className={singleBookCSS.add_wish}>
                            <FaRegHeart className={singleBookCSS.action_icon} />
                            <p>Add to wishlist</p>
                        </button>

                    </div>

                </div>

            </div>

        </div>

    </React.Fragment>

}
