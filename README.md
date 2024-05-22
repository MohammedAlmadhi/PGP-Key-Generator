# PGP-Key-Generator
The PGP Key Generator website allows users to generate, edit, and manage PGP keys. Users can generate new PGP key pairs, edit their existing keys, and download their public and private keys.


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

**Node.js:** Backend runtime environment.<br />
**Express.js:** Web application framework for Node.js.<br />
**MongoDB:** NoSQL database for storing user and key information.<br />
**Mongoose:** ODM (Object Data Modeling) library for MongoDB and Node.js.<br />
**EJS:** Templating engine for rendering HTML pages.<br />
**OpenPGP.js:** JavaScript library for generating and managing PGP keys.<br />
**Bootstrap:** CSS framework for responsive and modern web design.<br />

## Project goals

Allow users to generate secure PGP key pairs. Provide functionalities for users to view, edit, and delete their keys. Enable users to export their public and private keys for use in other applications.
