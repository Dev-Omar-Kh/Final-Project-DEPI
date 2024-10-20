import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { ThreeCircles } from 'react-loader-spinner';

export default function BlockAuthRoute({children}) {

    const [isToken, setIsToken] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        const token = Cookies.get('token');
        setIsToken(!!token);

        const handleStorageChange = () => {
            const updatedToken = Cookies.get('token');
            setIsToken(!!updatedToken);
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        }

    } , []);

    useEffect(() => {

        if (isToken === true) {
            navigate('/profile');
        }

    }, [isToken, navigate]);

    if(isToken === null){

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
