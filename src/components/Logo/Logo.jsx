import React from 'react';
import logo from '../../assets/ChatGPT Image Dec 8, 2025, 04_02_00 PM.png'

const Logo = () => {
    return (
        <div>
            <div className='flex items-center '>
                <img className=' w-6 h-6 md:w-10 md:h-10 rounded-2xl' src={logo} alt="" />
                <h3 className=' text-sm md:text-3xl font-bold'>Ticket Bari</h3>
            </div>
        </div>
    );
};

export default Logo;