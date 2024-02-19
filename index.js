const express = require('express')
const hbs = require('express-handlebars');
const path = require('path')
const app = express()

const session = require('express-session')
const passport = require('./passport')
const auth = require('./auth')

// Settings
app.set('port', process.env.PORT || 3000)

// Engine
app.set("views", path.join(__dirname, "/view"))
app.set("view engine", ".hbs")
app.engine(".hbs", hbs({
  extname: ".hbs",
  defaultLayout: "main"
}))

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(
  session({
    secret: "logindiscord",
    resave: false,
    saveUninitialized: false
})
);
app.use(passport.initialize())
app.use(passport.session())

// Satic Files
app.use(express.static("public"))

// Routes
app.get('/', (req, res) => {
  res.render("home", {
      title: "MartxnoWeb | Inicio"
  })
})
app.use("/login", passport.authenticate("discord", {failureRedirect: '/'}) ,(req, res) => {
    res.redirect('/perfil')
})
app.use("/perfil", auth, (req, res) => {
    res.json({
      datos_discord: req.user
    })
})
app.get("/info", (req, res) => {
  res.render("info", {
    title: "MartxnoWeb | Información"
  })
})

app.listen(app.get('port'), () => {
  console.log('servidor en el puerto', app.get('port'))
});