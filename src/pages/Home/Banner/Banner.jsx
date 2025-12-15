import React from 'react';
import bus from "../../../assets/bus.jpg"
import plane from "../../../assets/plane.jpg"
import train from "../../../assets/train.jpg"

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const Banner = () => {
    return (
        <div className='md:px-30  md:pb-20 '>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper "
            >
                <SwiperSlide><img className='w-full md:h-[500px] md:rounded-3xl' src={plane} alt="" /></SwiperSlide>
                <SwiperSlide><img className='w-full md:h-[500px] md:rounded-3xl' src={bus} alt="" /></SwiperSlide>
                <SwiperSlide><img className='w-full md:h-[500px] md:rounded-3xl' src={train} alt="" /></SwiperSlide>
                
            </Swiper>
        </div>
    );
};

export default Banner;