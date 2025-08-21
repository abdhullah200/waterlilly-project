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

## Deliverables

1. **ASP.NET MVC Project:**  
   Complete source code (HTML, CSS, JS, Razor, Controllers, etc.)

2. **React Project (Bonus):**  
   Separate folder with React app and README

3. **Documentation:**  
   This README explains setup, approach, and features

---

## Notes

- Complete the assessment in 3-4 days.
- Follow clean coding principles and document your code.
- Use creativity and best practices for web development.
- If you have questions, communicate early.

---

**Good luck! We look forward to seeing your solution.**
