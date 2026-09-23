const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email === "test@gmail.com" && password === "123456") {
        return res.json({ message: "Login Successful!" });
    }
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});