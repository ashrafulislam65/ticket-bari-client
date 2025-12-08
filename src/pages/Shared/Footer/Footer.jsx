import React from 'react';
import { FaAddressCard, FaEnvelope, FaFacebook, FaHome, FaInfoCircle, FaPhone, FaTicketAlt } from 'react-icons/fa';
import { SiStripe } from 'react-icons/si';
import Logo from '../../../components/Logo/Logo';

const Footer = () => {
    return (
        <div>
            <footer className="footer bg-neutral-900 text-gray-200 p-10">
                <div className="container mx-auto">
                    {/* Desktop: 4 columns, Mobile: Stacked */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                        {/* Column 1: Logo + Description */}
                        <div className="space-y-4">
                            <Logo></Logo>
                            <p className="text-gray-300">
                                Book bus, train, launch & flight tickets easily
                            </p>
                            <div className="flex space-x-2 pt-2">
                                <span className="text-xs bg-gray-800 px-2 py-1 rounded">🚌 Bus</span>
                                <span className="text-xs bg-gray-800 px-2 py-1 rounded">🚂 Train</span>
                                <span className="text-xs bg-gray-800 px-2 py-1 rounded">⛴️ Launch</span>
                                <span className="text-xs bg-gray-800 px-2 py-1 rounded">✈️ Flight</span>
                            </div>
                        </div>

                        {/* Column 2: Quick Links */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-gray-700">Quick Links</h3>
                            <div className="flex flex-col space-y-3">
                                <a href="/" className="hover:text-amber-400 transition-colors duration-200 flex items-center gap-2 text-gray-300 ">
                                    <FaHome className="text-amber-500" /> Home
                                </a>
                                <a href="/tickets" className="hover:text-amber-400 transition-colors duration-200 flex items-center gap-2 text-gray-300 ">
                                    <FaTicketAlt className="text-amber-500" /> All Tickets
                                </a>
                                <a href="/contact" className="hover:text-amber-400 transition-colors duration-200 flex items-center gap-2 text-gray-300 ">
                                    <FaAddressCard className="text-amber-500" /> Contact Us
                                </a>
                                <a href="/about" className="hover:text-amber-400 transition-colors duration-200 flex items-center gap-2 text-gray-300 ">
                                    <FaInfoCircle className="text-amber-500" /> About
                                </a>
                            </div>
                        </div>

                        {/* Column 3: Contact Info */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-gray-700">Contact Info</h3>
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-start gap-3">
                                    <FaEnvelope className="text-amber-500 mt-1 shrink-0" />
                                    <div>
                                        <a href="mailto:support@ticketbari.com" className="text-gray-300 hover:text-amber-400 transition-colors duration-200 block">
                                            support@ticketbari.com
                                        </a>
                                        <p className="text-xs text-gray-500 mt-1">24/7 Support Available</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <FaPhone className="text-amber-500 mt-1 shrink-0" />
                                    <div>
                                        <a href="tel:+8801234567890" className="text-gray-300 hover:text-amber-400 transition-colors duration-200 block">
                                            +880 1234 567890
                                        </a>
                                        <p className="text-xs text-gray-500 mt-1">Hotline: 9AM - 11PM</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <FaFacebook className="text-amber-500 mt-1 shrink-0" />
                                    <div>
                                        <a
                                            href="https://facebook.com/ticketbari"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-300 hover:text-amber-400 transition-colors duration-200 block"
                                        >
                                            facebook.com/ticketbari
                                        </a>
                                        <p className="text-xs text-gray-500 mt-1">Follow us for updates</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 4: Payment Methods */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-gray-700">Payment Methods</h3>
                            <div className="space-y-5">
                                <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg">
                                    <SiStripe className="text-3xl text-white bg-blue-600 p-1 rounded" />
                                    <div>
                                        <span className="font-semibold text-white">Stripe</span>
                                        <p className="text-xs text-gray-400">Secure payment gateway</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-gray-800 hover:bg-gray-700 transition-colors duration-200 p-3 rounded-lg text-center">
                                        <div className="text-sm font-medium text-white">VISA</div>
                                    </div>
                                    <div className="bg-gray-800 hover:bg-gray-700 transition-colors duration-200 p-3 rounded-lg text-center">
                                        <div className="text-sm font-medium text-white">MasterCard</div>
                                    </div>
                                    <div className="bg-gray-800 hover:bg-gray-700 transition-colors duration-200 p-3 rounded-lg text-center">
                                        <div className="text-sm font-medium text-white">PayPal</div>
                                    </div>
                                    <div className="bg-gray-800 hover:bg-gray-700 transition-colors duration-200 p-3 rounded-lg text-center">
                                        <div className="text-sm font-medium text-white">bKash</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="mt-12 pt-8 border-t border-gray-800">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <div className="text-center md:text-left">
                                <p className="text-gray-400">
                                    © 2025 TicketBari. All rights reserved.
                                </p>
                                <p className="text-xs text-gray-600 mt-1">
                                    An online platform for booking transportation tickets across Bangladesh
                                </p>
                            </div>

                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200 text-sm">
                                    Privacy Policy
                                </a>
                                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200 text-sm">
                                    Terms & Conditions
                                </a>
                                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200 text-sm">
                                    Refund Policy
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;