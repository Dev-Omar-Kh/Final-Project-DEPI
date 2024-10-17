import React from 'react';

import suggestionCSS from './suggestion.module.css';
import Suggestion from '../Home/Suggestion/Suggestion';

export default function SuggestionPage() {

    return <React.Fragment>

        <div className={suggestionCSS.container}>

            <Suggestion />

        </div>

    </React.Fragment>

}
