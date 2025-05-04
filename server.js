require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");
const authLogin = require("./routes/auth.routes");
const usersCurd = require("./routes/user.routes");

// middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync();

app.use("/api/auth", authLogin);
app.use("/api/users", usersCurd);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
