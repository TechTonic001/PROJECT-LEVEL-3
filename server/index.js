const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
const cors = require('cors');
app.use(cors());


app.use(express.json());

const authRoutes = require('./router/user.route');
app.use('/api/auth', authRoutes);


const port = process.env.PORT;
const MONGO_URI = process.env.URI || process.env.MONGO_URI;

// let users = [];

// app.get('/signup', (req, res) => {
//     res.render('signup')
// })

// app.post('/confirm', (req, res) => {
//     const { username, email, password } = req.body;
//     users.push({ username, email, password });
//     console.log(users);
//     res.send('Sign up successful')
// })

// // login
// app.get('/login', (req, res) => {
//     res.render('login')
// })
// app.post('/enter', (req, res) => {
//     const { username, password } = req.body;
//     const user = users.find(u => u.username === username && u.password === password);
//     if (user) {
//         res.send('Login successful')
//     } else {
//         res.send('Invalid credentials')
//     }
// })




mongoose.connect(MONGO_URI)
    .then(() =>
        console.log("Connected to MongoDB"))
    .catch((err) =>
        console.error("Error connecting to MongoDB:", err));

app.listen(port, () => {
    console.log(`app is currently running on port ${port}`);

})