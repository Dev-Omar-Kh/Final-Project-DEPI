import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../Components/Site/Site-Header/Header';
import Footer from '../Components/Site/Site-Footer/Footer'

export default function SiteLayout() {

    const [headerHeight, setHeaderHeight] = useState(0);

    // ====== start-from-top-page ====== //

    const { pathname } = useLocation();

    useEffect(() => {

        window.scrollTo({
            
            top: 0,
            behavior: 'smooth'
        });

    }, [pathname]);

    return <React.Fragment>

        <Header height={setHeaderHeight} />

        <Outlet context={headerHeight} />

        <Footer />

    </React.Fragment>

}
