# HEALFOOD MELBOURNE
INFO30005 (Web Information Technologies) project, fall 2019. [https://healfood.herokuapp.com](https://healfood.herokuapp.com)

## Introduction
A web application designed for restaurant rating.

## Core Functionalities

- Restaurant-related
  - Add restaurant
  - Edit restaurant
  - Delete restaurant
  - View restaurant list
  - View restaurant detail
- Review-related
  - Add review
  - Edit review
  - Delete review
  - View review list
- Map
  - View all restaurant locations
  - View single restaurant location
- Authentication
  - Sign up
  - Log in

## Detail

### Restaurants

This functionality is for editing, posting, displaying and deleting restaurants.

#### Relevant urls

- https://healfood.herokuapp.com/restaurants
- https://healfood.herokuapp.com/edit-restaurant

#### Routes

| Method   | Url
| -------- |-------
| get      | /restaurants
| get      | /restaurants/id/:id
| get      | /edit-restaurant
| get      | /edit-restaurant/:id
| post     | /edit-restaurant
| post     | /edit-restaurant/:id



### Reviews

This functionality is for editing, posting, displaying and deleting reviews.

#### Relevant urls

- https://healfood.herokuapp.com/reviews

#### Routes

| Method   | Url
| -------- |-------
| get      | /reviews
| get      | /reviews/id/:id
| get      | /edit-review/:rstrnt_id
| get      | /edit-review/:rstrnt_id/:review_id
| post     | /edit-review/:rstrnt_id
| post     | /edit-review/:rstrnt_id/:review_id


### Map

This functionality is for showing the locations of restaurants on the map.

#### Relevant urls

- https://healfood.herokuapp.com/map

#### Routes

`routes/routes.js`

| Method   | Url
| -------- |-------
| get      | /map


### Authentication

This functionality gives users ability to register a account
and log in our website. Authentication is required if a user
wants to edit any information on the website.

You can use the following login details if wanted.

```
Email    xiandew@student.unimelb.edu.au
Password 12345678
```


#### Relevant urls

- https://healfood.herokuapp.com/login
- https://healfood.herokuapp.com/signup

#### Routes

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


## TODO

* [ ] Folding long paragraph in lists
* [ ] Reset password
* [ ] Search
* [ ] Add roles for users (eg. Customer, Owner, Admin...)
