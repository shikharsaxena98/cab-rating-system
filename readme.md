# Welcome to Rating System App!
This app contains 2 types of components:
1. Drivers
2. Users
# Assumptions 
1. I have assumed that both User and Driver can rate each other anything from 0 to 5 (Floating Point Numbers Included)
2. All users and drivers start with 0 rating.
3. The average of all rides is the current rating of the driver.
4. Any user or driver can signup using a unique 10 digit mobile number. (One number can be used to sign up as driver and user both)


# Approach
To solve this problem, I have taken 2 types of users.
1. Driver 
2. User (Can also be called rider)

After each ride, both the user and the driver have the option to rate each other. 
Both the rider and user have a current rating which can go up or down according to the other person's rating.
All ratings given by users to a driver are saved in an array and the same applies to each driver's rating as well.

# DB Schema
I have used a MongoDB database with 2 collections, Driver and User.
Both are identical collection that contain - 
1. Name
2. Phone Number
3. Current Ratings
4. Number of Trips
5. All ratings given to the person (Both Users and Drivers)

# Steps to run the app

1. Clone or unzip the app.
2. run the command `npm install`.
3. Create a .env file and provide a field MONGOADDRESS 
4. Run `npm run start`.

# API

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/874734b4eb1e9d1abf10)
