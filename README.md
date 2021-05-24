# newsletter

This is a pure bakcend project to manage sending newsletters to each user mail address in at the specific time user selected.
It is all written in Typescript. The structure of this project contains routers, models and data services to manage a JSON mock data, and services to control the connection between the routers and data.

**Run the project**

To start using the project follow these steps:

1. Run command `npm install` in the root folder to install the packages.
2. Use command `npm run dev` to start the server. By using this command every Typescript files in the **src** folder will be translated to Javascript files and will place on **build** folder and then the project starts the server.js located on **build** folder.

**Project contents**

This project contains some Rest APIs which is powered by ExpressJS framework. To use these APIs follow these structures: 

1.  {
     - URL: http://localhost:3000/api/newsletter/addUser : Add user which avoid inserting duplicate mailAddress
     - METHOD: POST
     - Body: {mailAddress, sendTime? : Default 8am(type is number should like this 1420(means 14:20), active? : default true}
     - RESPONSE: {User}

    }
    
2.  {
     - URL: http://localhost:3000/api/newsletter/addNewsletters/:userId : Add user favorite newsletters which avoid inserting duplicate urls
     - METHOD: POST
     - Body: {urls: a string array of newsletters}
     - RESPONSE: {inserted: boolean}

    }
    
3.  {
     - URL: http://localhost:3000/api/newsletter/resetNewsletters/:userId : Replace all favorites newsletters
     - METHOD: POST
     - Body: {urls: a string array of newsletters}
     - RESPONSE: {inserted: boolean}

    }
    
4.  {
     - URL: http://localhost:3000/api/newsletter/setSentTime/:userId : Update time of receiving newsletters for user
     - METHOD: POST
     - Body: {sendTime}
     - RESPONSE: {updated: boolean}

    }
    
5.  {
     - URL: http://localhost:3000/api/newsletter/updateUser/:userId : Update user
     - METHOD: PATCH
     - Body: {mailAddress?, sendTime?, active?}
     - RESPONSE: {updated: boolean}

    }
    
6.  {
     - URL: http://localhost:3000/api/newsletter/deleteNewsletters/:id : Delete any newsletters from user favorites
     - METHOD: DELETE
     - Body: {urls: a string array of newsletters}
     - RESPONSE: {deleted: boolean}

    }
    
7.  {
     - URL: http://localhost:3000/api/newsletter/userNewsletters/:userId : User favorites newsletters report
     - METHOD: GET
     - Body: {}
     - RESPONSE: {an object contains userId, mailAddress, and an array of favorites}

    }
    
8.  {
     - URL: http://localhost:3000/api/newsletter/sentMailsReport : A report which shows every sent newsletter for the users
     - METHOD: GET
     - Body: {}
     - RESPONSE: {an array of objects contains user information and sent newsletter with the sent time}
    }
    
**Sent email job**

In the background of this server, there is a Cronjob which is started with the server and every minutes checks that which newsletter should be sent to the users. These mails report are stored in a json file which you can get this report with API number 8.
    
    
