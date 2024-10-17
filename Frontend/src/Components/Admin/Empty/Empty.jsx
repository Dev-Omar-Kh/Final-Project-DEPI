import React from 'react';

import { BsDatabaseExclamation } from 'react-icons/bs';

import tableCSS from '../../../Styles/db_tables.module.css';

export default function Empty() {

    return <React.Fragment>

        <div className={tableCSS.empty_doc}>

            <BsDatabaseExclamation />
            <h3>Nothing is here</h3>

        </div>

    </React.Fragment>

}
