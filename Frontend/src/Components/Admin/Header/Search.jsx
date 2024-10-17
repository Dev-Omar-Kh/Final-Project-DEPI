import React from 'react';



import searchCSS from './header.module.css';
import { IoSearchSharp } from 'react-icons/io5';

export default function Search() {

    return <React.Fragment>

        <form className={searchCSS.form}>

            <input type="text" placeholder={`Search for a book`}/>

            <button type='submit'><IoSearchSharp /></button>

        </form>

    </React.Fragment>

}