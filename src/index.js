import "@babel/polyfill";
import bodyParser from 'body-parser';
import express from 'express';
import firebase from "firebase";

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
    apiKey: "AIzaSyBVVVtNdlg6SnZViJif3tSpLDCsgGe-zaI",
    authDomain: "big-server-230506.firebaseapp.com",
    databaseURL: "https://big-server-230506.firebaseio.com",
    projectId: "big-server-230506",
    storageBucket: "big-server-230506.appspot.com",
    messagingSenderId: "228774396511"
};
firebase.initializeApp(config);

import * as Routes from './routes';
const app = express();

// Setup parsing for handlers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize all the routes dynamically
Object.keys(Routes).forEach(key => {
  const { path, router } = Routes[key];
  app.use(path, router);
});

app.listen(3000);
