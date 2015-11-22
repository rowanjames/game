Firebase = require('firebase')
_ = require('underscore')
# Emailer = require('../lib/mail_sender')

moment = require 'moment'
# cron = require('cron')
# needle = require('needle')



class AppVars

  options: {}

  constructor: (@options) ->


  getVars: () =>
    theVars = {}
    theVars._ = _
    # theVars.Emailer = Emailer
    theVars.moment = moment
    # theVars.cron = cron

    theVars.tokApiKey = '45384692'
    theVars.tokSecret = '22997d656e7c634285dc9b96080ee97758f1eac6'


    if @options.app.settings.env == 'production'
      # currentServer = 'http://www.gilders.in'
      # rootUrl = 'https://dev-mosaiced.firebaseio.com/'
      rootUrl = 'https://prod-mosaiced.firebaseio.com'
#      rootUrl = 'https://test-gilders.firebaseio.com/'
      rootRef = new Firebase(rootUrl)

      mailgunUser = "postmaster@gilders.in"
      mailgunPassword = "2c4d81e60d6a3ebb25a553293ef40572"

      currentEnv = 'production'

      pdfServer = "http://128.199.211.157:8080"

      faceBookAppId = '655542997911641'

#      cronJobKeepAlive = cron.job "0 30 * * * *", () =>
#        needle.get "http://www.gilders.in", (error, response) ->
#      cronJobKeepAlive.start()



    else
      # rootUrl = 'https://dev-mosaiced.firebaseio.com/'
      rootUrl = 'https://prod-mosaiced.firebaseio.com'
      rootRef = new Firebase(rootUrl)

      currentServer = 'http://localhost:3000'

      mailgunUser = "postmaster@gilders.in"
      mailgunPassword = "2c4d81e60d6a3ebb25a553293ef40572"


      currentEnv = 'development'


      pdfServer = "http://128.199.211.157:8080"

      faceBookAppId = '655542997911641'




    theVars.Firebase = Firebase
    theVars.rootRef = rootRef
    theVars.rootUrl = rootUrl

    theVars.currentServer = currentServer
    theVars.mailgunUser = mailgunUser
    theVars.mailgunPassword = mailgunPassword

    theVars.currentEnv = currentEnv

    theVars.pdfServer = pdfServer
    theVars.faceBookAppId = faceBookAppId



    #move to prod only
    # gilderTriggers = require './gilders_triggers'
    # gilderTriggers.gildersTriggers(theVars)
#    firebaseCrons = require './crons'

#    cronJob = cron.job "0 0 0 * * 1", () =>
#      firebaseCrons.firebaseCrons(theVars)
#    cronJob.start()

    theVars



exports = module.exports = AppVars