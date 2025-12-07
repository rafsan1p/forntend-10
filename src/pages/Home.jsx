import React from 'react';
import Slider from '../component/Slider';
import PopularSection from '../component/PopularSection';
import MeetOurVets from '../component/MeetOurVets';
import WinterCareTips from '../component/WinterCareTips';
import CategorySection from '../component/CategorySection';
import WhyAdoptSection from '../component/whyAdopt';
import PetHeroesSection from '../component/PetHeroesSection';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <CategorySection></CategorySection>
            <PopularSection></PopularSection>
            <WhyAdoptSection></WhyAdoptSection>
            <PetHeroesSection></PetHeroesSection>
            <MeetOurVets></MeetOurVets>
            <WinterCareTips></WinterCareTips>
            
        </div>
    );
};

export default Home;