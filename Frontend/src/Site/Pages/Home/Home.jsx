import React from 'react'
import Slider from './Slider/Slider'
import { useOutletContext } from 'react-router-dom'
import Sponsors from './Sponsors/Sponsors';
import Featured from './Featured-Books/Featured';
import BestProduct from './Best-Product/BestProduct';
import Popular from './Popular-Books/Popular';
import Offers from './Latest-Offers/Offers';
import Suggestion from './Suggestion/Suggestion';

export default function Home() {

    const height = useOutletContext();

    return <React.Fragment>

        <Slider height={height} />

        <Sponsors />

        <Featured />

        <BestProduct />

        <Popular />

        <Offers />

        <Suggestion />

    </React.Fragment>

}
