express = require 'express'
bodyParser = require 'body-parser'
engines = require 'consolidate'
compression = require 'compression'
favicon = require 'serve-favicon'
cookieParser = require 'cookie-parser'
errorHandler = require 'errorhandler'
gm = require('gm')
fs = require('fs')
multer  = require('multer')
upload = multer({ dest: 'uploads/' })
# https://www.wonderplugin.com/wp-content/plugins/wonderplugin-lightbox/images/demo-image0.jpg
# gm('assets/stylesheets/Icons/PNG/android1.png').size (err, value) ->

exports.startServer = (config, callback) ->
  app = express()

  AppVars = require './lib/app_vars'
  newVar = new AppVars(app: app)
  config.appVars = newVar.getVars()

  # setup views and port
  app.set 'views', config.server.views.path
  app.engine config.server.views.extension, engines[config.server.views.compileWith]
  app.set 'view engine', config.server.views.extension
  app.set 'port', process.env.PORT || config.server.port || 3000
  # app.set 'port', 3002
  app.use(express.static(__dirname + '/uploads'));

  # middleware
  app.use compression()
  # uncomment and point path at favicon if you have one
  # app.use favicon "path to fav icon"
  app.use bodyParser.json()
  app.use bodyParser.urlencoded {extended: true}
  app.use cookieParser()
  app.use express.static config.watch.compiledDir
  if app.get('env') is 'development'
    app.use errorHandler()

  routeOptions =
    reload:    config.liveReload.enabled
    optimize:  config.isOptimize ? false
    cachebust: if process.env.NODE_ENV isnt "production" then "?b=#{(new Date()).getTime()}" else ''
    rootUrl: config.appVars.rootUrl

  router = express.Router()
  router.get '/', (req, res) ->
    res.render 'index', routeOptions

  router.get '/app', (req, res) ->
    res.render 'app', routeOptions  

  # router.post '/upload', (req, res, next) ->
  #   handler = multer(dest: './cloud/cloud', onFileUploadComplete: (file) ->
  #     res.json
  #       path: file.path.replace('cloud/', '')
  #   )
  #   handler req, res, next
      
  router.post '/upload', upload.single('file'), (req, res, next) ->
    console.log req.file 
    tmp_path = req.file.path
    target_path = 'uploads/' + req.file.originalname
    src = fs.createReadStream(tmp_path)
    dest = fs.createWriteStream(target_path)
    src.on 'end', ->
      
      gm('uploads/' + req.file.originalname).size (err, value) ->
        console.log value
        if value.width > 700 or value.height > 550
          gm('uploads/' + req.file.originalname)
          .resize(700, 550)
          .transparent('white')
          .quality(100)
          .gravity('Center')
          .extent(700, 550)
          .noProfile()
          .write 'uploads/' + 'mod_' + req.file.originalname, (err) ->
            console.log err
            if !err
              console.log 'done'
              fullUrl = req.protocol + '://' + req.get('host')
              console.log fullUrl
              res.json {success: true, url: fullUrl + '/mod_' + req.file.originalname}
        else    
          gm('uploads/' + req.file.originalname)
          .thumbnail(value.width, value.height)
          .transparent('white')
          .quality(100)
          .gravity('Center')
          .extent(700, 550)
          .noProfile()
          .write 'uploads/' + 'mod_' + req.file.originalname, (err) ->
            console.log err
            if !err
              console.log 'done'
              fullUrl = req.protocol + '://' + req.get('host')
              console.log fullUrl
              res.json {success: true, url: fullUrl + '/mod_' + req.file.originalname}
      return
    src.on 'error', (err) ->
      res.json {error: true}
      return
    src.pipe(dest)  

  # routes
  app.use '/', router

  # start it up
  server = app.listen app.get('port'), ->
    console.log 'Express server listening on port ' + app.get('port')

  callback server