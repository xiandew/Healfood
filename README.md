# [HEALFOOD MELBOURNE](http://info30005artisans.herokuapp.com)
INFO30005 project, fall 2019

## Core functionalities

### Authentication

Authentication is required if a user wants to edit restaurants
or post reviews.

By clicking the `log in` button on the navigation bar, users
will be proceeded to the authentication page. Users are able
to log in and sign up in this page. Auser's email and password
are required to be logged in.

By clicking `CREATE ACCOUNT` button, users should be proceeded
to sign up page. To create a valid account, users need to
confirm their emails by visiting the link sent to them.
Only users with verified emails are allowed to log in.

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

#### Possible extension

* [ ] Add roles for users (eg. Customer, Owner, Admin...)
* [ ] Reset password