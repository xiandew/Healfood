# [HEALFOOD MELBOURNE](http://info30005artisans.herokuapp.com)
INFO30005 project, fall 2019

## Core functionalities

### 1. Authentication

Authentication is required if a user wants to edit restaurants
or post reviews. Each user is identified by the email address.

By clicking the `log in` button on the navigation bar, users
will be proceeded to the authentication page. Users are able
to log in and sign up in this page. A user's email and password
are required to be logged in.

By clicking `CREATE ACCOUNT` button, users should be proceeded
to sign up page. Users' passwords will be hashed before storing
into database. For a valid account, users need to confirm
their emails by visiting the link sent to them. Only users with
verified emails are allowed to log in.

The token in the link sent to the user is supposed to be expired by
12 hours. Users who try to verify their accounts after that time limit
will be proceeded to `resend` page. In this page, users will be required
to input their emails to acquire a new verification token.

Users can edit their usernames and emails in `My account`
section.

Input validation is implemented by `express-validator`. Invalid
inputs will result in error messages showing at the top of the form.

#### Relevant urls
- http://info30005artisans.herokuapp.com/login
- http://info30005artisans.herokuapp.com/signup

#### Routes and controllers
These can be found in `routes/routes.js`

```javascript
router.get('/user', userControllers.GET_user);
router.get('/login', userControllers.GET_login);
router.get('/signup', userControllers.GET_signup);
router.get('/logout', userControllers.GET_logout);
router.get('/confirm-email/:token', userControllers.GET_confirmEmail);
router.get('/resend', userControllers.GET_resendToken);

router.post('/login', validator.validateUserInput, userControllers.POST_login);
router.post('/signup', validator.validateUserInput, userControllers.POST_signup);
router.post('/resend', validator.validateUserInput, userControllers.POST_resendToken);
``` 

#### models

`models/users.js`
- User
- Token

### 2. Restaurants

This functionality is for editing, posting and displaying restaurants.

The five latest modified featured restaurants will be showing in the home
page. Full restaurant list is accessible through `Restaurants` in the
navigation bar.

The `Add restaurant` button is located at the top of the restaurant list
page. One photo is allowed for each restaurant. Photos will be uploaded
to the folder `public/uploads` and only the paths will be stored in the
database. Each restaurant is identified by its address. The addresses are
compared by characters for the moment, so different formats of the same
address will be considered as different locations by the server.

A `edit` button can be found in each restaurant detail page. Authenticated
users can edit the restaurant information by clicking it.

#### Relevant urls

- http://info30005artisans.herokuapp.com/restaurants
- http://info30005artisans.herokuapp.com/edit-restaurant

#### Routes and controllers

```javascript
router.get('/restaurants', rstrntControllers.GET_allRestaurants);
router.get('/restaurants/id/:id', rstrntControllers.GET_restaurantByID);
router.get('/restaurants/name/:name', rstrntControllers.GET_restaurantByName);
router.get(
    ['/edit-restaurant', '/edit-restaurant/:id'],
    userControllers.isLoggedIn,
    rstrntControllers.GET_editRestaurant
);
router.get('/deleteRestaurant/:id', rstrntControllers.GET_deleteRestaurant);

router.post(
    ['/edit-restaurant', '/edit-restaurant/:id'],
    multer.parser.single("photo"),
    validator.validateRstrntInput,
    rstrntControllers.POST_editRestaurant
);
```

#### models

`models/restaurants.js`

- Restaurant



## TODO

* [ ] Post reviews
* [ ] Map interaction
* [ ] Add roles for users (eg. Customer, Owner, Admin...)
* [ ] Reset password