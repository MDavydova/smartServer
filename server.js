const express = require('express');
const bcrypt = require('bcrypt')
const cors = require('cors')
const register = require('./controllers/register')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
const signin = require('./controllers/signin')
const knex = require('knex');


const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: '',
        password: '',
        database: 'smart'
    }
});

const app = express();

app.use(cors())

app.use(express.json());

app.get('/api', (req, res)=> { res.send('here they are') })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})
const PORT = process.env.PORT;

app.listen(PORT,()=> {
    console.log(`app is running on port ${PORT}`);
})
