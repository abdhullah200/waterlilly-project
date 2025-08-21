# Web Developer Assessment – Product Management Page

Welcome! This project demonstrates your skills as a front-end developer working with ASP.NET MVC, jQuery, and React. The goal is to build a modern, responsive Product Management Page with dynamic features and clean code.

---

## Project Structure

- **Vervida.MVC/**  
  ASP.NET MVC project (core implementation with Razor Pages and jQuery)
- **Vervida.MVC/vervida-react/**  
  React app (bonus implementation)

---

## Features

### Core Functionality (ASP.NET MVC + jQuery)
- **Product List & Management Page**
  - Grid layout with pagination (10 products per page)
  - Product details: image, title, price, category
  - Filter by category (dynamic, no page refresh)
  - Search bar with highlighted matching text
  - Product details modal (description, ratings, add-to-cart)
  - Add to cart, view cart contents in side panel, dynamic total price

- **Navigation Bar & Footer**
  - Sticky navbar with links: Home, Products, Contact Us
  - Cart icon showing item count
  - Footer with company details, social icons, copyright

### Bonus: React Application
- Recreates all product and cart features using React
- Fetches product data from ASP.NET MVC API (via Axios or Fetch)
- Uses functional components and React hooks

### Responsiveness & Optimization
- Mobile-first design (works on mobile, tablet, desktop)
- Bootstrap 5 grid and UI components
- Hover effects, animations, transitions
- SEO meta tags, optimized images, minified code

---

## Setup Instructions

### ASP.NET MVC (Backend)
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd /workspaces/waterlilly-project/Vervida.MVC
   dotnet run --urls "http://0.0.0.0:5217;https://0.0.0.0:7217"
   ```
2. The API will be available at `http://localhost:5217/api/products`.

### React (Frontend)
1. Open a separate terminal and navigate to the React app:
   ```bash
   cd /workspaces/waterlilly-project/Vervida.MVC/vervida-react
   npm install
   npm start
   ```
2. The app will run at `http://localhost:3000`.

### Accessing the App
- **Frontend:**  
  [http://localhost:3000](http://localhost:3000)
- **Backend API:**  
  [http://localhost:5217/api/products](http://localhost:5217/api/products)

---

## Approach & Assumptions

- **API:** Uses Fake Store API or DummyJSON for product data.
- **State Management:** Cart and filters are managed client-side (jQuery for MVC, React hooks for React).
- **UI/UX:** Bootstrap 5 for layout and components, custom CSS for enhancements.
- **Code Quality:** Modular, documented, and follows best practices.
- **No hardcoded data:** All product data is fetched dynamically.

---

## Additional Features

- Animations for product cards and modals
- Highlighted search terms in product titles
- Off-canvas cart sidebar for better UX
- Responsive navigation and footer
- SEO-friendly landing page

---


**Screenshots**
1.
<img width="1359" height="606" alt="image" src="https://github.com/user-attachments/assets/d7486e4f-3bb5-49cb-bc6d-6dde633ddacd" />

2.
<img width="1362" height="605" alt="image" src="https://github.com/user-attachments/assets/90b2ab9a-e5d5-4f6e-9a5a-5ada6afa7270" />

3.
<img width="1358" height="609" alt="image" src="https://github.com/user-attachments/assets/08fa891d-156f-4f43-b78e-554fa55ad2fb" />

