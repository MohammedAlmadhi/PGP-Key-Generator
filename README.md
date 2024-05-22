# PGP-Key-Generator
The PGP Key Generator website allows users to generate, edit, and manage PGP keys.<br/>
Users can generate new PGP key pairs, edit their existing keys, and download their public and private keys.

## Flowchart
![image](https://github.com/MohammedYousef1/PGP-Key-Generator/assets/83059089/b7f995d8-e558-44a0-b52c-1b435a02a48a)

## Setup

Once you have cloned or downloaded this repository you need to make sure you have Mongo DB installed then
run the following command to bring all npm packages required for this project

```
$ npm install
```
Then run the following command

```
$ npm run server
```

## Technologies used

- **Node.js:** Backend runtime environment.
- **Express.js:** Web application framework for Node.js.
- **MongoDB:** NoSQL database for storing user and key information.
- **Mongoose:** ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Passport** Authentication middleware for Node.js.
- **EJS:** Templating engine for rendering HTML pages.
- **OpenPGP.js:** JavaScript library for generating and managing PGP keys.
- **Bootstrap:** CSS framework for responsive and modern web design.

## Project goals

- Allow users to generate secure PGP key pairs.
- Provide functionalities for users to view, edit, and delete their keys.
- Enable users to export their public and private keys for use in other applications.

## Screenshots
### Home Page
![image](https://github.com/MohammedYousef1/PGP-Key-Generator/assets/83059089/a5d26a30-6075-488e-81fd-c74ae535d369)

### Signup Page
![image](https://github.com/MohammedYousef1/PGP-Key-Generator/assets/83059089/6c57199f-7ae8-4ce7-9959-d8a1ba16e77c)

### Profile Page
![image](https://github.com/MohammedYousef1/PGP-Key-Generator/assets/83059089/82b1c3d7-7ec3-45d9-8d5f-f1e9e63a14ff)

### Edit Key Page
![image](https://github.com/MohammedYousef1/PGP-Key-Generator/assets/83059089/c8f49cf0-ff06-4b4a-815a-cd73d49df236)


## Future Work

- **Key Sharing:** Allow users to share their public keys with others securely.
- **Enhanced Security:** Implement additional security measures such as two-factor authentication.

## Resources

https://www.youtube.com/playlist?list=PLXgJ7cArk9uR_xxd3iZIwTg0mKUDYsxoi<br/>
https://www.npmjs.com/package/passport<br/>
https://docs.openpgpjs.org/#generate-new-key-pair

## Team Members
1. Mohammed Almadhi
2. Abdulaziz Alburidi
3. Ziyad Alghamdi
