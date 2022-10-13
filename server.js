const express = require('express');
const bcrypt = require('bcryptjs')
const cors = require('cors')
const register = require('./controllers/register')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
const signin = require('./controllers/signin')
//const knex = require('knex');

const { Client } = require('pg');

const db = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
/*const db = knex({
    connection: {
        connectionString: process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0",
        ssl: true,
        rejectUnauthorized: false,
    }
});
 */
const app = express();

app.use(cors())

app.use(express.json());

app.get('/', (req, res) => { res.send('400') })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=> {
    console.log(`app is running on port ${PORT}`);
})
