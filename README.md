it add.# Ecommerce Packer UI App

This is a React-based web application for managing and tracking ecommerce packing operations. The app provides modules for order management, product specifications, inventory, customer management, notifications, and user authentication.

---

## Features

- **Authentication**: Secure login, signup, password reset, and OTP verification.
- **Order Management**: View, start, and complete orders; manage packed and unpacked orders.
- **Product Management**: View product lists and detailed product specifications.
- **Inventory Management**: Manage raw materials, purchase orders, and vendor profiles.
- **Customer Management**: View and manage customer lists and details.
- **Notifications**: Receive and view system notifications.
- **Profile Management**: View and update user profile details.
- **Modern UI**: Responsive design with a sidebar, header, and dashboard cards.

---

## Project Structure

- `src/Views/PreLogin/`: Authentication pages (Signin, Signup, Forgot Password, OTP, etc.)
- `src/Views/Postlogin/`: Main app pages after login (Home, Orders, Packed Orders, Notifications, Profile, etc.)
- `src/Redux-Store/`: Redux slices and thunks for state management (Orders, Products, Inventory, etc.)
- `src/Services/`: API service layer (Axios)
- `src/components/`: Reusable UI components (Header, Sidebar)
- `src/Assets/Images/`: App images and logos
- `public/`: Static assets and icons

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the app:**
   ```bash
   npm start
   ```

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

---

## Login Credentials

Use the following credentials to log in:

- **Email:** `sohail@gmail.com`
- **Password:** `Test@1234`

---

## Main Navigation

- **Home**: Dashboard and order overview
- **Packed Orders**: List and details of packed orders
- **Profile Details**: User profile management
- **Notifications**: System notifications

---

## Tech Stack

- React
- Redux Toolkit
- React Router
- Axios
- Cloudscape Design System (UI components)

---

## Notes

- The backend API endpoints are configured in `src/Views/Config.js`.
- Dummy data for products, customers, and orders is available in the `src/Redux-Store/*/dummy/` folders.
- For development, authentication and some API calls may use mock data or local endpoints.
