# [HEALFOOD MELBOURNE](http://info30005artisans.herokuapp.com)
INFO30005 project, fall 2019

## Core functionalities

### Authentication

Authentication is required if a user wants to edit restaurants
or post reviews.

By clicking the `log in` button on the navigation bar, users
will be proceeded to the authentication page. In this page, a
user's email and password are required to be logged in, and
also new users can sign up by clicking `CREATE ACCOUNT` button.

Input validation is implemented by `express-validator`. Invalid
inputs will result in error messages showing at the top of the form.

#### Relevant urls
- http://info30005artisans.herokuapp.com/login
- http://info30005artisans.herokuapp.com/signup

#### Routes
- 
