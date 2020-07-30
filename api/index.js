import express from "express";
import 'babel-polyfill';
import  router from './users';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/v1/users', router)
app.get('/', (req, res)=>{
    return res.status(200).send({'message': 'first endpoint check'});
}).listen(port);

console.log(`Listening from ${port}...`);