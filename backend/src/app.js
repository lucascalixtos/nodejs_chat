const path      = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') })

const express   = require('express');
const mongoose  = require('mongoose');

// mongoose.connect(`mongodb//${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_DATABASE_NAME}`, {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// });

mongoose.connect('mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+process.env.DB_HOST+'/'+process.env.DB_DATABASE_NAME, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});


const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    return res.json({ message: "Hello World" });
});

app.listen(3333, () => {
    console.log("Server started");
});