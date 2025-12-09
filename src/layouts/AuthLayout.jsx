import React from 'react';
import Logo from '../components/Logo/Logo';
import { Outlet } from 'react-router';
import authImg from '../assets/auth-pic.png'

const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Logo></Logo>
            <div className='md:flex h-full py-20 items-center gap-5 '>
                <div className='flex-1 pb-5'>
                    <Outlet></Outlet>
                </div>
                <div className='flex-1'>
                    <img className='rounded-full md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px]' src={authImg} alt="" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;