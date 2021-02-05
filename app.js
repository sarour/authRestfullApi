const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');
const authRoute = require('./Routes/Auth.route')
const postsRoute = require('./Routes/Post.route');
const RicesRoute = require('./Routes/Rice.route');

//Middlewares
app.use(bodyParser.json());
app.use(cors())
app.use('/api/user', authRoute);
app.use('/post', postsRoute);
app.use('/rice', RicesRoute)

//ROUTES
app.get('/', (req, res) => {
    res.send('we are at home now')
});

//Connect to DB
//global.bd = ''
// mongoClient.connect(
//     process.env.DB_CONNECTION, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, (error, res) => {
//     if (error) {
//         console.log("Database error");
//         return;
//     }
//     //db = res.db('brriBd')
//     console.log("Database listening")

// }
// )
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        app.listen(3000, () => {
            console.log('server is running in 27017')
        });
    }).catch(error => console.log(error));


