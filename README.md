# 🎫 Online Ticket Booking Platform

**Live Site:** https://ticket-bari-c7b9f.web.app/ 
**Client Repository:** https://github.com/ashrafulislam65/ticket-bari-client  
**Server Repository:** https://github.com/ashrafulislam65/ticket-bari-server  

---

## 🚀 Project Overview

This is a **MERN stack Online Ticket Booking Platform** where users can discover and book travel tickets for **Bus, Train, Launch, and Plane**. The platform supports three user roles:

- **User**: Browse and book tickets, manage bookings, and make payments.  
- **Vendor**: Add tickets, manage bookings, and track revenue.  
- **Admin**: Manage users, approve tickets, and advertise selected tickets on the homepage.  

The project demonstrates **full-stack development skills, JWT authentication, and responsive design** with a modern, user-friendly interface.

---

## 🌟 Key Features

### General Features
- Fully responsive design (mobile, tablet, desktop)
- Light/Dark mode toggle
- Secure authentication using **JWT tokens** and Google OAuth
- Error handling and loading states
- Accessible, clean UI with proper spacing and alignment

### User Features
- Browse all **admin-approved tickets**
- Search tickets by **From → To** locations
- Filter tickets by **transport type**
- Sort tickets by **price** (Low ↔ High)
- Book tickets with quantity selection
- Countdown timer for departure
- View booking status: pending, accepted, rejected, paid
- Stripe payment integration for confirmed bookings
- View **transaction history** with ticket details

### Vendor Features
- Add tickets with title, route, transport type, price, quantity, perks, and images
- Update and delete tickets (pending/rejected status rules)
- View **requested bookings** with accept/reject functionality
- Track revenue: total revenue, tickets sold, tickets added

### Admin Features
- Approve or reject vendor tickets
- Manage users and assign roles (Admin, Vendor, User)
- Mark vendors as **fraud** if needed
- Advertise up to 6 tickets on the homepage
- View all admin-approved tickets in **advertisement section**

---

## 🔒 Security & Authentication
- User authentication secured using **JWT tokens**
- Google OAuth sign-in integration
- Protected routes for **Admin, Vendor, and User dashboards**
- Environment variables used for **Firebase config** and **MongoDB credentials**

---

## 📦 Technologies Used

- **Frontend:** React, Tailwind CSS, DaisyUI, React Router, React Query  
- **Backend:** Node.js, Express, MongoDB, JWT Authentication  
- **Deployment:** Vercel / Netlify (Frontend), Render / Railway (Backend)  
- **Payments:** Stripe API  
- **Other:** imgbb for image uploads, SweetAlert2 for notifications

---

## 🏗 Folder Structure

/src
/layouts
MainLayout.jsx
DashboardLayout.jsx
AuthLayout.jsx
/pages
/Home
/AllTickets
/TicketDetails
/Auth
/Dashboard
/User
/Vendor
/Admin
/routes
PrivateRoute.jsx
AdminRoute.jsx
VendorRoute.jsx
router.jsx

yaml
Copy code

---

## 📋 Deployment Instructions

1. Clone the repositories (client and server)
2. Install dependencies:

```bash
cd client
npm install

cd server
npm install
Create .env files:

Client: VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, etc.

Server: MONGO_URI, JWT_SECRET

Start development servers:

bash
Copy code
npm run dev  # client
npm run dev  # server
Deploy frontend and backend to your preferred hosting platform (Vercel/Netlify & Railway/Render)

Add your domain to Firebase authentication whitelist

🎨 UI / UX Highlights
Clean, modern interface with balanced typography and spacing

Consistent colors and buttons across all pages

Responsive card grids for tickets and bookings

Eye-catching hero slider on the homepage

Interactive charts on Vendor Dashboard

💡 Optional Enhancements Implemented
PDF ticket download after payment

Seat map view for bus tickets

React Hook Form used for better form validation

Swiper.js for homepage hero slider

📝 Commit Guidelines
20+ meaningful client commits

12+ meaningful server commits

Descriptive commit messages highlighting features or fixes

✨ Author
Your Name
Email: your-email@example.com
Portfolio: [Your Portfolio Link]

🎯 Project Goals
Demonstrate MERN stack proficiency

Show ability to implement secure JWT authentication

Build responsive, user-friendly interfaces

Implement real-world booking system with role-based access

yaml
Copy code

---




