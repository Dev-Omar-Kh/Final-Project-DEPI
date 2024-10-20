import React, { useEffect, useState } from 'react';
import { AiOutlineSetting } from 'react-icons/ai';

import dbLinkCSS from './db_link.module.css';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

export default function DahBoardLink() {

    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {

        const token = Cookies.get('token');

        if(token) {

            try{

                const decodedToken = jwtDecode(token);

                if (decodedToken.role === 'ADMIN') {
                    setIsAdmin(true);
                } 
                else {
                    setIsAdmin(false);
                }
                
            }catch(error){
                console.error('Invalid token', error);
                setIsAdmin(false);
            }

        }
        else{
            setIsAdmin(false);
        }

        const handleStorageChange = () => {

            const updatedToken = Cookies.get('token');

            if (updatedToken) {

                try {

                    const decodedToken = jwtDecode(updatedToken);

                    if (decodedToken.role === 'ADMIN') {
                        setIsAdmin(true);
                    } 
                    else {
                        setIsAdmin(false);
                    }

                } catch (error){
                    console.error('Invalid token', error);
                    setIsAdmin(false);
                }

            } 
            else {
                setIsAdmin(false);
            }

        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };

    }, []);

    if(isAdmin){

        return <React.Fragment>

            <Link to={'/admin'} className={dbLinkCSS.container}>

                <AiOutlineSetting />

            </Link>

        </React.Fragment>

    }
    else{
        return ''
    }

}
