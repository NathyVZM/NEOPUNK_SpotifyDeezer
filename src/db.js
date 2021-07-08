// db.js

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://NathyVZM:NathalieZambrano@cluster0.tp5nb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(db => console.log('DB is connected'))
.catch(err => console.error(err));