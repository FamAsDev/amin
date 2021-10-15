require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

const app = express();

// Middle-wares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(fileUpload({
    useTempFiles: true
}))

// Connection to MDB
const URI = "mongodb+srv://fahad:fahad1234@cluster0.dhsai.mongodb.net/ecommerce?retryWrites=true&w=majority"
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log("Connected to MongoDB")
})


// Routes
app.use("/user", require("./routes/userRouter"));
app.use("/api", require("./routes/categoryRouter"));
app.use("/api", require("./routes/upload"));
app.use("/api", require("./routes/productRouter"));
app.use("/api", require("./routes/orderRouter"));
app.use("/api", require("./routes/bannerRouter"));


// App Listener
const PORT = process.env.PORT || 8001 

// Heroku init
if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"))
}

app.listen(PORT, () => {
    console.log('server is running on ', PORT);
})

