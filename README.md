Order Management System
A full-stack order management system built with React.js (frontend) and .NET 8 Web API (backend), using SQL Server for the database. This application provides a seamless user experience for browsing products, managing a shopping basket, and placing orders. 

Features
Core Functionality
Customer Management: Persistent customer sessions.

Product Catalog: Browse products with images and descriptions.

Shopping Basket: Add, remove, and adjust item quantities with real-time totals.

Order Processing: A complete checkout process with order confirmations.

Order History: View detailed itemized order receipts.

Responsive Design: A mobile-friendly interface built with Material-UI.

Tech Stack
Frontend
React.js 18: Modern JavaScript framework.

TypeScript: For type-safe development.

Material-UI (MUI): Component library for styling.

Axios: HTTP client for API calls.

Backend
.NET 8: Latest framework for the backend.

Entity Framework Core: ORM for database operations.

SQL Server: Relational database.

ASP.NET Core Web API: Framework for RESTful APIs.

Installation & Setup
Clone the Repository:

Bash

git clone <repository-url>
cd OrderSystem
Backend Setup:

Navigate to the backend directory.

Create a new SQL Server database named OrderSystem.

Update the connection string in backend/appsettings.json.

Run the following commands:

Bash

dotnet restore
dotnet ef database update
dotnet run
Frontend Setup:

Navigate to the frontend directory.

Run the following commands:

Bash

npm install
npm start
The frontend will start at http://localhost:3000 and the backend at https://localhost:5098.

Database Schema
The system uses four main tables to manage data:

Products: Stores product information.

Customers: Manages customer details.

Orders: Records order information, linked to a customer.

OrderItems: Details of each item in an order, linked to an order and a product.

API Endpoints
The system provides RESTful endpoints for:

Products: Get products by ID or all products.

Customers: Get, create, and list customers.

Orders: Get all orders, get orders by ID or customer ID, and create new orders.

Running the Application
Development Mode
Start the backend by running dotnet run in the backend folder.

Start the frontend by running npm start in the frontend folder.

Access the application in your browser at http://localhost:3000.

Troubleshooting
If you encounter issues, check the following:

Database Connection: Ensure SQL Server is running and your connection string in appsettings.json is correct.

Port Conflicts: Verify that the default ports (7098 for the backend, 3000 for the frontend) are not in use.

CORS Issues: Confirm that CORS is properly configured in the backend's Program.cs file.

API Connectivity: Double-check the baseURL in frontend/src/api/api.ts to ensure it points to the correct backend URL.