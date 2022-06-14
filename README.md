# Title: Farm Stock Management (FSM)

# Description
Farm Stock Management (FSM)

Farm Stock Management (FSM) is about selling products like Fertilizers, Pesticides & Crops and admin updating the 
stock accordingly.
 
# General Information

1.  FSM is about selling the agricultural stock in online method.

2.  In this user can buy the stock to how much of the quantity they want to and admin can add product and stock 
    that the user can buy. 

# Project Flow

    Home 

    Stock

    Register/Login---> User Information form(can fill and view)
                  ---> Buying Products (Fertilizers, Pesticides, Crops)
                  ---> Logout
    
    Admin-Login ---> Add Product
                --->Add Stock
                --->View Stock
                --->Logout
    
    About Us

    Contact Us

# How to use the project

1.  First you can view the homepage and what are all the stock available in our shop.

2.  If you want to buy the stock, you should Register if you are the new user or should Login if you've already registered

3.  After logging in the user should fill an additional information form in which they have to enter their basic infromation and their bank Card details.

4.  The additional information form can be filled only once.

5.  After entering the form, the user can buy products with however quantity they want and can add it to the cart.

6.  After adding the user can buy the added stock by clicking the 'Buy' button.

7.  User can loggout if they want to, which will clear the local storage and navigate to the home page of the website.

8.  In admin part, admin can login with specific username and password.

9.  In that admin can add Product and it's details like Name,Image,Price.

10. In another form admin can add the quantity/stock of any product they've already ordered.

11. Then, there will be a View Stock button,if admin click it, it will show the admin added stock and user ordered stock and aslo the livestock of the each product. 

12. These all can be only viewed by the admin and can add the stock accordingly seeing the livestock.

# Install and run it locally

1.  Download or clone the repository to your local machine:

    $ git clone https://github.com/DeborahAnnie/project.git

2.  Run npm install inside the downloaded/cloned folder:

    $ npm install

3.  Start the dev server by running the command below. Navigate to http://localhost:4200/.
    The app will automatically reload if you change any of the source files.

    $ npm test

# Features

1. Session Handling(login and logout) in angular level.
2. DB Connectivity.
3. Exception Handling.
4. Lookup relation(product).
5. One to One realtion.
6. One to many relation.
7. Displaying product using View.
8. Form backend validation in Cloudant database level.
9. Form validation in frontend level.
10. Username already existed or not backend validation in node level.
11. Toastr for error, success and warning messages. 


# Technology

# Frontend:

1. Angular-cli - 11.0.0
2. Bootstrap - 5.1.3
3. ngx-toastr -13.2.1

# Backend

1. NodeJs : 14.14.0

# NPM

command to install: npm install npm-package_name

1. body-parser : 1.20.0,
2. cors : 2.8.5,
3. express : 4.18.1,
4. helmet : 5.1.0,
5. nano : 10.0.0,
