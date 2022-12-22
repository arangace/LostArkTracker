# LostArkTracker

## What is it?
This application allows a user to track and update their Lost Ark daily as well as weekly progression all in one place. This application was built within 2 weeks to accomodate for the demand for tracking daily statuses. Allowing users to update their infomration per character and login per account. Facilitating multiple different users to be able to store their information.

### How to use it
Visit https://latracker.netlify.app/ to access the homepage. Once the backend is running, you should be able to see all your characters once you login.
As the backend is hosted remotely and not deployed, a certificate will need to be ackowledged in which you will need to press OK for safety. Login with your username or alternatively sign up for your own account. Once logged in you will be redirected to the tracker page, there you can see the status of all your characters. Characters 'rest bonuses' will be updated at reset. 

## How does it work?
This application integrates with a backend API developed by another developer to store these values into a database and is then updated on the frontend when there is a change. This API is consumed on page load and on update of a character. This data is then presented to the user on the character page with all the values reflected and all shown at once, so users at a glance can see which characters to prioritise. The user can then access their information.

## Why did we make this?
There was a strong desire amongst friends to be able to track their characters daily information as there were about 5 different types of dailies to do and about 3 different weeklies. This scaled by each character, once somebody had 3 characters, it would be 24 different items to track and be aware of to do. Some friends resulted in using spreadsheets, documents or manually logging into each character to track it. 

This made me think to develop a simple and effective solution for my friends to keep track of their character information all in one place. The solution was originally going to be developed on Discord using DiscordJS but due to its complexity it did not help serve our time constraints. There were time constraints to this project due to it being redundant within a few months. To allow people to fully utilise the benefits of this website for the most amount of time, this application would need to be delivered quickly and effectively, before its inevitable redundancy. 

Due to the time crunch, I applied a simple solution to the project. Creating a website with ReactJS, hosting a .NET backend hooked up with a database. Splitting the development work between myself in the frontend and my friend in the backend. For the frontend, to speed things up I leveraged MaterialUI for components, forms, buttons and such to use their out-of-the-box components instead of having to create them myself. While keeping functionality to a minimum whilst encapsulating all that was needed. Authentication was simplified to just the account name and changing values was a mimic of the display card. This overall allowed us to deliver and deploy the solution much quicker and allowed users to use the application before its redundancy. 

### Todos
1. There are plans to deploy this websites backend but due to complications with deploying the backend, the backend currently has to be manually deployed. 
2. Authentication would be ideal for when this becomes deployed as no one user should have access to other players data although there is not much incentive for authentication due to it's target user audience and others do not gain much from altering other peoples information
3. The UI needs to be more user friendly, currently it is encapsulating functionality whilst leveraging materialUI for forms, cards and other components due to the intense time restriction.

### Author: Andy Huang
