import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import adminCSS from './admin.module.css';
import SideBar from '../../Components/Admin/Side-Bar/SideBar';
import Header from './../../Components/Admin/Header/Header';

export default function AdminLayout() {

    // ====== display-nav-phone ====== //

    const [displayNave, setDisplayNave] = useState(false);

    return <React.Fragment>

        <div className={adminCSS.container}>

            <span 
                id='overlay' 
                className={`${adminCSS.over_side} ${displayNave ? adminCSS.display_over_side : ''}`}
                onClick={() => setDisplayNave(false)} 
            ></span>

            <div id='sideBar' className={`${adminCSS.side_bar} ${displayNave ? adminCSS.display_side_bar : ''}`}>

                <SideBar display={setDisplayNave} />

            </div>

            <div className={adminCSS.main_section}>

                <div className={adminCSS.header}>

                    <Header display={setDisplayNave} />

                </div>

                <div className={adminCSS.content_cont}>

                    <Outlet />

                </div>

            </div>

        </div>

    </React.Fragment>

}
