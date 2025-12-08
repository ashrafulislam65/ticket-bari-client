import React from 'react';

import { FaHome, FaTicketAlt, FaSearch, FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            
            {/* Error Icon */}
            <div className="mb-8 relative">
                <div className="w-32 h-32 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                    <FaExclamationTriangle className="text-white text-5xl" />
                </div>
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                    404
                </div>
            </div>

            {/* Error Message */}
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    Page Not Found
                </h1>
                <p className="text-xl text-gray-600 max-w-md">
                    The ticket or page you're looking for is not available. It might have been moved or doesn't exist.
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link 
                    to="/" 
                    className="btn btn-primary px-8 py-3 rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                >
                    <FaHome /> Back to Home
                </Link>
                <Link 
                    to="/tickets" 
                    className="btn btn-outline btn-primary px-8 py-3 rounded-lg flex items-center justify-center gap-2 hover:shadow-md transition-all"
                >
                    <FaTicketAlt /> Browse Tickets
                </Link>
                <Link 
                    to="/search" 
                    className="btn btn-ghost px-8 py-3 rounded-lg flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 transition-all"
                >
                    <FaSearch /> Search Again
                </Link>
            </div>

            {/* Help Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 max-w-md w-full">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Need Help?</h3>
                <p className="text-gray-600 mb-4">
                    Can't find what you're looking for? Our support team is here to help.
                </p>
                <div className="flex flex-col gap-2">
                    <a 
                        href="mailto:support@ticketbari.com" 
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        ✉️ support@ticketbari.com
                    </a>
                    <a 
                        href="tel:+8801234567890" 
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        📞 +880 1234 567890
                    </a>
                </div>
            </div>

            {/* Ticket Categories */}
            <div className="mt-12">
                <p className="text-gray-500 text-center mb-4">Popular Ticket Categories:</p>
                <div className="flex flex-wrap justify-center gap-3">
                    <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        Bus Tickets
                    </span>
                    <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        Train Tickets
                    </span>
                    <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                        Launch Tickets
                    </span>
                    <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                        Flight Tickets
                    </span>
                </div>
            </div>

        </div>
    );
};

export default ErrorPage;