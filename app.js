const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// CORS middleware for handling Cross-Origin Resource Sharing
app.use(
  cors({
    origin: "*", // Allow requests from any origin (you might want to restrict this in production)
    methods: ["GET", "PUT", "POST", "DELETE"], // Allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization", "Range"], // Allow these headers in the request
    exposedHeaders: ["Content-Range", "X-Content-Range"], // Allow these headers to be exposed
    credentials: true, // Allow credentials to be sent with requests (e.g., cookies)
  })
);

// Morgan middleware for logging HTTP requests
app.use(morgan("dev"));

// Body parser middleware (included in Express) for parsing application/json
app.use(express.json());

// Body parser middleware (included in Express) for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware for parsing cookies attached to the request
app.use(cookieParser());

// Uncomment the following lines if you have routers to use
const ribAtner = require("./routers/ribAtner");
const chantier = require("./routers/chantier");
const fichierNavitte = require("./routers/fichierNavitte");
const utilisateurs = require("./routers/utilisateurs");

app.use("/", ribAtner);
app.use("/", chantier);
app.use("/", fichierNavitte);
app.use("/", utilisateurs);


const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Node API listening to port : ${port}`);
});
