import React from 'react';
import Banner from '../Banner/Banner';
import Advertisement from '../../../components/Advertisement/Advertisement';
import LatestTickets from '../../../components/LatestTickets';
import PopularRoutes from '../../../components/PopularRoutes';
import WhyChooseUs from '../../../components/WhyChooseUs';
import AboutUs from '../../../components/AboutUs';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Advertisement></Advertisement>
            <LatestTickets></LatestTickets>
            <PopularRoutes></PopularRoutes>
            <WhyChooseUs></WhyChooseUs>
            <AboutUs></AboutUs>
            
        </div>
    );
};

export default Home;