import React from 'react';
import Slider from '../component/Slider';
import PopularSection from '../component/PopularSection';
import MeetOurVets from '../component/MeetOurVets';
import WinterCareTips from '../component/WinterCareTips';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <PopularSection></PopularSection>
            <MeetOurVets></MeetOurVets>
            <WinterCareTips></WinterCareTips>
        </div>
    );
};

export default Home;