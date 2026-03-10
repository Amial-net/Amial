const express = require("express");
const cors = require("cors");
const session = require("express-session");
const { connectDB } = require("./scripts/seed");
const authRoutes = require("./routes/UserRoutes");

const app = express();
port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173", //front end could be different on deployment
    credentials: true,
  })
);

connectDB()
    .then(() => {
        app.listen(port, () =>{
            console.log(`Listening on port ${port}`);
        });
    })
    .catch((err) =>{
        console.error("Database connection failed. Server not started.", err);
    })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "replace_this_with_a_real_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // true only when using HTTPS
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.use("/auth", authRoutes);




    



    



