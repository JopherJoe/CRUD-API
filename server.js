const express = require('express');
const mongoose = require('mongoose');
const studentRoute = require('./routes/Student');
const teacherRoute = require('./routes/Teacher');
const bodyParser = require('body-parser')
const app = express();
const PORT = 4000;
const cors = require('cors')

// MIDDLEWARE
app.use(express.json());
app.use(cors())

/*app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});*/

app.use('/student', studentRoute);
app.use('/teacher', teacherRoute);

mongoose
    .connect('mongodb+srv://joejopher:PROt8SfX1mUSQEPW@cluster0.zm3pfvz.mongodb.net/?retryWrites=true&w=majority',)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log('Node API app is running on port 4000');
        });
    })
    .catch((error) => {
        console.error(error);
    });
