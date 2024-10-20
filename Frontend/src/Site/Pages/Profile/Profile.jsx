import React, { useEffect, useState } from 'react';

import profileCss from './profile.module.css';

import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { FaRegUser } from 'react-icons/fa6';
import { MdAlternateEmail, MdOutlinePhoneIphone } from 'react-icons/md';
import { Axios, LogOutUser } from '../../../API/Api';
import Status from '../../../Components/Common/Status/Status';
import { ThreeCircles } from 'react-loader-spinner';

export default function Profile() {

    const [userDataDecoded, setUserDataDecoded] = useState(null);

    const token = Cookies.get('token');

    useEffect(() => {

        if(token){
            const {username , email , phone , role} = jwtDecode(token);
            setUserDataDecoded({username , email , phone , role});  
        }
        else{
            setUserDataDecoded(null);
        }

    } , [token]);

    // ====== delete-user ====== //

    const [errMsg, setErrMsg] = useState(null);
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(false)
    const [successMsg, setSuccessMsg] = useState(null);

    const navigate = useNavigate();

    const deleteUserFS = async() => {

        setErrMsg(null);
        setSuccessMsg(null);
        setLoading(true);

        try {

            const {data} = await Axios.get(`${LogOutUser}` , {withCredentials: true});

            if(data.success){

                setSuccessMsg(data.message);

                Cookies.remove('token');

                setTimeout(() => {
                    navigate('/login');
                }, 3600);

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

        <div className={profileCss.profile_cont}>

            <div className={profileCss.profile_img}>

                <p className={profileCss.cover_img}>Book Store</p>

                <div className={profileCss.img_cont}>

                    <img loading='lazy' src={require('../../../Images/logo.png')} alt="name" />

                </div>

            </div>

            <div className={profileCss.profile_info}>

                <div className={profileCss.main_info}>

                    <h3>{userDataDecoded?.username || 'none'}</h3>

                    <div className={profileCss.account_card}>

                        <FaRegUser />
                        {userDataDecoded ? (userDataDecoded?.role === 'ADMIN' ? 'Admin' : 'User') : 'none'}

                    </div>

                    <div className={profileCss.account_card}>

                        <MdAlternateEmail />
                        {userDataDecoded?.email || 'none'}

                    </div>

                    <div className={profileCss.account_card}>

                        <MdOutlinePhoneIphone />
                        {userDataDecoded?.phone || 'none'}

                    </div>

                    <div className={profileCss.some_data}>

                        <p><span>20</span> Item in cart</p>

                            <span className={profileCss.data_break}></span>

                        <p><span>15</span> Success purchase</p>

                    </div>

                    <div className={profileCss.profile_actions}>

                        <Link className={profileCss.action + ' ' + profileCss.link} to='/auth'>Edit Profile</Link>

                        <button onClick={() => deleteUserFS(userDataDecoded)} 
                            className={profileCss.action + ' ' + profileCss.btn}
                        >
                            { loading ? <ThreeCircles
                            visible={true} height="20" width="20" color="var(--first-color)"
                            ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                            /> : 'Log Out'}
                        </button>

                    </div>

                </div>

            </div>

        </div>

    </React.Fragment>

}
