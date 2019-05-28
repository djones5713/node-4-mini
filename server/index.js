require("dotenv").config();
const express = require('express');
const app = express();
const { getAllMessages, createMessage } = require('./messageCtrl')

const { SERVER_PORT } = process.env;

app.use(express.json())

app.get('/api/messages', getAllMessages);
app.post('/api/message', createMessage);
app.get('/api/messages/history', createMessage);

app.use((req, res, next) => {
     let badWords = ['knucklehead', 'jerk', 'internet explorer'];
     if(req.body.message){
          for(let i = 0; i < badWords.length; i++){
               let regex = new RegExp(badWords[i], 'g');
               req.body.message = req.body.message.replace(regex, '****');
          }
          next();
          } else {
          next();
          }
})

app.listen(SERVER_PORT || 3005, () => {
     console.log(`listening on ${SERVER_PORT}`);
})

