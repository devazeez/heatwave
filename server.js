// console.log("Hello Azeez Ibrahim the beast of the west the baddest in the east")
const express = require("express"); //CREATING AND EXPRESS SERVER
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config(); // gives access to fetch the valie of the port from the .env file

connectDb();
const app = express();

const port = process.env.PORT || 5000; // DEFINING THE PORT
app.use(express.json());
app.use("/api/cylinders", require("./routes/cylinderRoutes"));
app.use(errorHandler);

app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
})
