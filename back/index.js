const express = require("express");
const app = express();
var { config } = require("dotenv");
const bin = require("./routes/Bin");
const citizen_Request = require("./routes/Citizen_Request");
const user = require("./routes/User")
const secteur = require("./routes/Secteur");
const type_pdc = require("./routes/TypePdc")
var cors = require("cors");
var cookieParser = require("cookie-parser");


const dev = process.env.NODE_ENV !== "production";
if (dev) {
  config();
}

app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true, origin: true }));

app.use("/bins",bin)
app.use("/requests",citizen_Request)
app.use("/users", user)
app.use("/secteurs", secteur)
app.use("/types", type_pdc)



app.listen(process.env.PORT, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:" + process.env.PORT);
});