## dependencies ##
express = require("express")
mongoose = require("mongoose")
logger = require("morgan")
passport = require("passport")
cookieParser = require("cookie-parser")
bodyParser = require("body-parser")
session = require("express-session")
compression = require("compression")

## app decleration ##
app = express()

## app config ##
app.use logger("dev")
app.use compression()
app.use express.static("../public")
app.use bodyParser.urlencoded(extended: true)
app.use cookieParser()
app.use bodyParser.json()
app.use session(
  secret: "keyboard cat"
  resave: false
  saveUninitialized: true
)
app.use passport.initialize()
app.use passport.session()

## dev routing ##
app.get "/dev", (req, res) ->
  res.render "dev/index", doc

## deploy routing ##
app.get "/deploy", (req, res) ->
  res.render "deploy/index", doc

## start and log ##
app.listen 3030
console.log "Express server started on port 3030"