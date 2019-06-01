# [HEALFOOD MELBOURNE](http://info30005artisans.herokuapp.com)
INFO30005 project, fall 2019

## *Core functionalities*

## 1. Authentication

This functionality gives users ability to register a account
and log in our website. Authentication is required if a user
wants to edit any information on the website.

#### Sign up

To create a account, users need to click `log in` on the navbar
and in the next page click `create account` button, users should
be proceeded to sign up page. By submitting required information,
a message will appear showing that the verification email has been
sent.

For a valid account, users need to confirm their emails.
Only users with verified emails are allowed to log in. Users
can verify their emails by visiting the link in the verification
email.

The token in the link sent to the user is supposed to be expired by
12 hours. Users who try to verify their accounts after that time limit
will be proceeded to `resend` page. In this page, users will be required
to input their emails to acquire a new verification token.

Users' passwords will be hashed before storing into database.

#### Log in

Users can log into the website by clicking the `log in` button
on the navbar and then entering their verified email and password.

Users can edit their username and email after logging in by clicking
`My account` in the navbar.

If needed, following account can be used for testing purpose:

```
Email    xiandew@student.unimelb.edu.au
Password 12345678
```


#### Relevant urls

- http://info30005artisans.herokuapp.com/login
- http://info30005artisans.herokuapp.com/signup

#### Routes

`routes/routes.js`

| Method   | Url
| -------- |-------
| get      | /user
| get      | /login
| get      | /signup
| get      | /logout
| get      | /confirm-email/:token
| get      | /resend
| post     | /login
| post     | /signup
| post     | /resend

#### Views

`views/user/`

#### Models

`models/users.js`

#### Controller

`controllers/userController.js`


## 2. Reviews

This functionality is for editing and displaying reviews.

#### Relevant urls

- http://info30005artisans.herokuapp.com/reviews

#### Views

`views/reviews/`

#### Routes

`routes/routes.js`

| Method   | Url
| -------- |-------
| get      | /reviews
| get      | /reviews/id/:id
| get      | /edit-review/:rstrnt_id
| get      | /edit-review/:rstrnt_id/:review_id
| post     | /edit-review/:rstrnt_id
| post     | /edit-review/:rstrnt_id/:review_id

#### Models

`models/reviews.js`

#### Controller

`controllers/reviewController.js`


## 3. Restaurants

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

The average rating for each restaurant will be updated when new review is
added for it.

#### Relevant urls

- http://info30005artisans.herokuapp.com/restaurants
- http://info30005artisans.herokuapp.com/edit-restaurant

#### Views

`views/restaurants/`

#### Routes

`routes/routes.js`

| Method   | Url
| -------- |-------
| get      | /restaurants
| get      | /restaurants/id/:id
| get      | /edit-restaurant
| get      | /edit-restaurant/:id
| post     | /edit-restaurant
| post     | /edit-restaurant/:id

#### Models

`models/restaurants.js`

#### Controller

`controllers/rstrntController.js`


## 4. Map

This functionality is for showing the locations of restaurants on the map.

#### Relevant urls

- http://info30005artisans.herokuapp.com/map

#### Views

`views/map.pug`

#### Routes

`routes/routes.js`

| Method   | Url
| -------- |-------
| get      | /map

#### models

`models/restaurants.js`

It takes use of the coordinate in the restaurant schema

#### Controller

`controllers/mapController.js`


## 5. Validate

Input validation is implemented by `express-validator`. Invalid
inputs will result in error messages showing at the top of the form.


## TODO

* [ ] Add roles for users (eg. Customer, Owner, Admin...)
* [ ] Reset password