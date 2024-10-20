import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { ThreeCircles } from 'react-loader-spinner';

export default function AdminRoute({children}) {

    const [isAdmin, setIsAdmin] = useState(null);
    const navigate = useNavigate();

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

    useEffect(() => {

        if (isAdmin === false) {
            navigate('/login');
        }

    }, [isAdmin, navigate]);

    if(isAdmin === null){

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

        {children}

    </React.Fragment>

}
