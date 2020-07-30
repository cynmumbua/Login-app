import express from "express";
const router = express.Router();
import oktaClient from './lib/oktaClient.js';
import Helper from './helper';

// register a new user
router.post('/', (req, res, next) =>{
  
    const newUser = {
        profile:{
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            login: req.body.email
        },
        credentials: {
            password:{
                value: req.body.password
            }
        }
    };
    oktaClient
    .createUser(newUser)
    .then(user =>{
        console.log('in then')
        res.status(201);
        res.send(user);
    })
    .catch(error =>{
        console.log('in catch')
        res.status(400);
        res.send(error);
    });
});

export default router;