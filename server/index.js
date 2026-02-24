const express = require('express');
const app = express();
require('dotenv').config();

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const port = process.env.PORT || 5630;

let users = [];

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.post('/confirm', (req, res) => {
    const { username, email, password } = req.body;
    users.push({ username, email, password });
    console.log(users);
    res.send('Sign up successful')
})

// login
app.get('/login', (req, res) => {
    res.render('login')
})
app.post('/enter', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.send('Login successful')
    } else {
        res.send('Invalid credentials')
    }
})

app.listen(port, () => {
    console.log(`app is currently running on port ${port}`);

})