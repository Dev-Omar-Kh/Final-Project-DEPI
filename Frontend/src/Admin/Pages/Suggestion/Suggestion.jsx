import React from 'react';
import Suggestions from './Suggestions';

import { MdOutlineMessage } from 'react-icons/md';
import { BiErrorAlt } from 'react-icons/bi';
import { IoBanSharp } from 'react-icons/io5';

import titlesCSS from '../../../Styles/db_title.module.css';
import tableCSS from '../../../Styles/db_tables.module.css';

export default function Suggestion() {

    const suggestion = Suggestions

    return <React.Fragment>

        <div className={titlesCSS.container}>

            <div className={titlesCSS.title}>

                <div className={titlesCSS.title_box}>

                    <MdOutlineMessage />
                    <p>Suggestions</p>

                </div>

            </div>

            <div className={tableCSS.table_cont}>

                {suggestion.length > 0 ? 
                    <table className={tableCSS.table}>

                        <thead>

                            <tr>

                                <th>Name</th>
                                <th>Email</th>
                                <th>Suggestion</th>
                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {suggestion.map(sug => <tr key={sug._id}>

                                <td>{sug.name}</td>
                                <td>{sug.email}</td>
                                <td>{sug.suggestion}</td>
                                <td>
                                    <button 
                                        // onClick={() => firstDeleteStep(sug)}
                                        className={`${tableCSS.actions} ${tableCSS.delete}`}
                                    >
                                        <IoBanSharp className={tableCSS.action_icon} />
                                        Delete
                                    </button>
                                </td>

                            </tr>)}

                        </tbody>

                    </table> : 
                    <div className={tableCSS.empty_doc}>

                        <BiErrorAlt />
                        <h3>No Suggestions Data</h3>

                    </div>
                }

            </div>

        </div>

    </React.Fragment>

}
