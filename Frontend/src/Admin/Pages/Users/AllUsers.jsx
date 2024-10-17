import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import { BiErrorAlt } from 'react-icons/bi'
import { FaUsersViewfinder } from 'react-icons/fa6'
import { IoBanSharp } from 'react-icons/io5';

import titlesCSS from '../../../Styles/db_title.module.css';
import tableCSS from '../../../Styles/db_tables.module.css';
import { Axios, DeleteUsers, GetUsers } from '../../../API/Api';
import { useQuery } from 'react-query';
import { ThreeCircles } from 'react-loader-spinner';
import { AnimatePresence } from 'framer-motion';
import Warning from './../../../Components/Common/Warning/Warning';
import Status from '../../../Components/Common/Status/Status';
import { GrUserAdmin } from 'react-icons/gr';

export default function AllUsers() {

    // ====== get-all-users ====== //

    // const token = localStorage.getItem('token');

    const getAllUsers = async() => {

        return await Axios.get(`${GetUsers}`, { withCredentials: true });

    }

    const {data , isLoading , isError , refetch} = useQuery('getUsers' , getAllUsers);

    // ====== delete-user ====== //

    const [displayWarn, setDisplayWarn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [deleteUser, setDeleteUser] = useState(null);

    const [errMsg, setErrMsg] = useState(null);
    const [visible, setVisible] = useState(true);
    const [successMsg, setSuccessMsg] = useState(null);

    const firstDeleteStep = (data) => {

        setDisplayWarn(true);
        setUserData(data);

    }

    useEffect(() => {

        const deleteUserById = async() => {
            if(deleteUser){

                setErrMsg(null);
                setSuccessMsg(null);

                try {

                    const {data} = await Axios.delete(`${DeleteUsers}/${deleteUser}` , {withCredentials: true});
                    if(data.success){

                        setDeleteUser(null);
                        setDisplayWarn(false);
                        setUserData(null);
                        setSuccessMsg(data.message);
                        refetch();

                    }

                } catch (error) {
                    setErrMsg(error);
                }
            }
        }

        deleteUserById();

    } , [deleteUser , refetch]);

    return <React.Fragment>

        <AnimatePresence>
            {displayWarn && 
                <Warning
                    cancel={setDisplayWarn}
                    setDeleteData={setDeleteUser}
                    deleteData={deleteUser}
                    data={userData}
                />
            }
        </AnimatePresence>

        {successMsg ? <Status icon='success' isVisible={visible} visibility={setVisible} data={successMsg} /> : ''}
        {errMsg ? <Status icon='error' isVisible={visible} visibility={setVisible} data={errMsg} /> : ''}

        <div className={titlesCSS.container}>

            <div className={titlesCSS.title}>

                <div className={titlesCSS.title_box}>

                    <FaUsersViewfinder />
                    <p>Users</p>

                </div>

            </div>

            {isLoading ?
                <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <ThreeCircles
                        visible={true} height="50" width="50" color="var(--active-color)"
                        ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                    />
                </div> : (isError ? 
                    <div className={tableCSS.empty_doc}>
                        <BiErrorAlt />
                        <h3>Error on fetch data</h3>
                    </div> : 
                    <div className={tableCSS.table_cont}>

                        {data.data.data.length > 0 ?
                            <table className={tableCSS.table}>

                                <thead>

                                    <tr>

                                        <th>User Name</th>
                                        <th>User Email</th>
                                        <th>User Phone</th>
                                        <th>User Role</th>
                                        <th>User Ban</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {data.data.data.map(user => <tr key={user._id}>

                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <button 
                                                onClick={() => firstDeleteStep(user)}
                                                className={`${tableCSS.actions} ${tableCSS.delete}`}
                                            >
                                                <IoBanSharp />
                                            </button>
                                            <Link 
                                                to={`update/${user._id}`}
                                                className={`${tableCSS.actions} ${tableCSS.update}`}
                                            >
                                                <GrUserAdmin className={tableCSS.action_icon} />
                                            </Link>
                                        </td>

                                    </tr>)}

                                </tbody>

                            </table> :
                            <div className={tableCSS.empty_doc}>

                                <BiErrorAlt />
                                <h3>No Users Data</h3>

                            </div>
                        }

                    </div>
                )
            }

        </div>

    </React.Fragment>

}
