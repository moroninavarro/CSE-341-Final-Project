const express = require('express');
const mongodb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
const port = process.env.PORT || 3000;

// Swagger Documentation
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, { explorer: true })
);

// Middlewares
app.use(express.json());

app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

// The cors
app.use(cors({
    origin: [
        "https://cse-341-final-project-na80.onrender.com",
        "https://localhost:3000"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// Routes
app.use("/", require("./routes"));

// Test route
app.get("/", (req, res) => {
    res.send(
        req.session.user
            ? `Logged in as ${req.session.user.username}`
            : "Logged Out"
    );
});

// OAuth GitHub Strategy
passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
        },
        function (accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// GitHub OAuth callback
app.get(
    "/github/callback",
    passport.authenticate("github", { failureRedirect: "/api-docs" }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect("/");
    }
);

// Error handling
process.on("uncaughtException", (err, origin) => {
    console.error(`Caught exception: ${err}\nOrigin: ${origin}`);
});

// Initialize the database and start the server
mongodb.initDb((err) => {
    if (err) {
        console.error(err);
    } else {
        app.listen(port, () =>
            console.log(`Database is listening and Node running on port ${port}`)
        );
    }
});