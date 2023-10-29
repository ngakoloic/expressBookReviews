const axios = require('axios').default;
const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();



public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  
  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    //   const listbooks = JSON.stringify(books,null,4);
    //   res.status(200).send(listbooks);

    let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(JSON.stringify(books,null,4))
    },2000)})

    //Call the promise and wait for it to be resolved and then print a message.
    myPromise.then((successMessage) => {
        res.status(200).send(successMessage);
    })

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  //res.status(200).send(JSON.stringify(books[isbn],null,4));

  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(JSON.stringify(books[isbn],null,4))
    },2000)})

    //Call the promise and wait for it to be resolved and then print a message.
    myPromise.then((successMessage) => {
        res.status(200).send(successMessage);
    })

 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  //get keys of each element in Array
  const keys = Object.keys(books);
  const bookdetails = [];
  for( let i = 1; i <= keys.length; i++){
        if (books[i]['author'] === author) {
            bookdetails.push(books[i]);
        }
    }
    //res.status(200).send(JSON.stringify(bookdetails,null,4));

    let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve(JSON.stringify(bookdetails,null,4))
    },2000)})

    //Call the promise and wait for it to be resolved and then print a message.
    myPromise.then((successMessage) => {
        res.status(200).send(successMessage);
    })

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  //get keys of each element in Array
  const keys = Object.keys(books);
  const bookdetails = [];
  for( let i = 1; i <= keys.length; i++){
        if (books[i]['title'] === title) {
            bookdetails.push(books[i]);
        }
    }
    //res.status(200).send(JSON.stringify(bookdetails,null,4));

    let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve(JSON.stringify(bookdetails,null,4))
    },2000)})

    //Call the promise and wait for it to be resolved and then print a message.
    myPromise.then((successMessage) => {
        res.status(200).send(successMessage);
    })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const getreviews = books[isbn]['reviews'];
    if (books[isbn]['reviews']) {
        res.status(200).send(JSON.stringify(getreviews,null,4));
    }else{
        res.status(200).send({message : "No result found"});
    }
});

module.exports.general = public_users;
