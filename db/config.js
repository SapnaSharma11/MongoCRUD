const mongoose = require("mongoose");
const db ='mongodb+srv://sapnasharma:sapna123@cluster0.k5rhmhr.mongodb.net/users?retryWrites=true&w=majority'
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connection succesfull"))
    .catch((err) => console.log(err));