## Securing an application in Nodejs
* This is demo application that shows how a nodejs application is secured.
* There are libraries like passportjs does all the steps mentioned in project. It is recommended to use a library like that instead of building the authentication yourself.
* The overview of the steps
1. Build a Nodejs app
2. Store user accounts in MongoDB
3. Store passwords using bcrypt
* Form based authentication
1. The user information is sent via POST request in forms to the node server.
2. In express, using the module named body-parser, we parse the request body to get the information such as username and password etc.
* Sessions and cookies
1. We do not want the user to type the username/password for every single request they make in a page
2. The server tells the browser, after a user has logged in, that, "Here, take this value. This is your identity. Here after whenever you make a request to my page, send this along and I will authenticate you". This identity is stored in the browser through cookies. A cookie is just a header in a http request. It is name-value pair. After user logs in, the server will send back a response with the set-cookie along with the necessary information. The browser will use that cookie afterwards for every request.
* Hashing
1. We must not store the password in the plain text. Passwords must be encrypted before being stored in the database.
2. bcrypt library provides a hashing function, which, when we pass the password, hashes it and returns back. Then we store that in database. During the login, we use bcrypt.compareSynce function to compare the password user has entered with the encrypted password available in the database.
* CSRF protection
1. If a user is logged in on a website say BankA(a cookie is stored in the browser), and if some one tricks the user to redirect from their current page, say BlogA to BankA, they can compromise the user's account and perform malicious actions. Since the cookie is already present in the browser, this redirect action can perform anything from transferring money or to simply deleting the account itself or submitting a form with malicious values. This is called cross-site-request-forgery.
2. csurf library inserts random tokens to forms. This is set once the user gets to the page. CSRF is prevented here because, the 1st time, the random token gets set. From the 2nd time onwards, this token, which is a hidden field, must match. The attacker can not guess this.
* Always use SSL. Without SSL, anyone between the user's browser and the server can view that information.
