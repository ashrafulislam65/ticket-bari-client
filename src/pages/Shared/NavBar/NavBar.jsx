import React from 'react';
import Logo from '../../../components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';


const NavBar = () => {
    const {user,logOut} =useAuth();
    const handleLogOut = () =>{
        logOut()
        .then()
        .catch(error =>{
            console.log(error)
        })
    }
    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/book-ticket'>Book Ticket</NavLink></li>
        <li><NavLink to='/vendor'>Be a Vendor</NavLink></li>
        <li><NavLink to='/all-tickets'>All Tickets</NavLink></li>
        <li><NavLink to='/dashboard/add-ticket'>Add Ticket</NavLink></li>
        <li><NavLink to='/dashboard/my-added-tickets'>My-added-tickets</NavLink></li>

        
       

        {
            user && <>
                <li><NavLink to='/dashboard/my-booked-tickets'>My Booked Tickets</NavLink></li>
            
            
            </>
        }
       



    </>
    return (
        <div className=''>
            <div className="navbar bg-base-100 shadow-sm md:px-20 ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {
                                links
                            }
                        </ul>
                    </div>
                    <Logo></Logo>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                            {
                                links
                            }
                    </ul>
                </div>
                <div className="navbar-end">


                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>

                    {
                        user?<a onClick={handleLogOut} className="btn">Log Out</a>:
                        <Link className='btn' to='/login'>Login</Link>
                    }
                    <Link className='btn btn-neutral mx-4' 
                    to='/vendor'>Be a vendor</Link>
                </div>
            </div>

        </div>
    );
};

export default NavBar;