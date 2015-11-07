require =
  optimize: 'none'
  waitSeconds: 600
  #urlArgs: new Date().getTime().toString()

  #appDir: '../assets/javascripts/app'
  baseUrl: '../javascripts'
  dir: '../built'

  paths:
    angularjs: 'vendor/angular'
    flatUi: 'vendor/flatuipro.min'
    jquery: 'vendor/jquery.min'
    fbase: 'vendor/firebase'
    angularroute: 'vendor/angular-route'
    basefileupload: 'vendor/angular-base64-upload'
    marked: 'vendor/marked'
    sanitize: 'vendor/angular-sanitize'
    anganimate: 'vendor/angular-animate'
    moment: 'vendor/moment'
    picker: 'vendor/filepicker'
    afire: 'vendor/afire'
    idle: 'vendor/idle'
    bowser: 'vendor/bowser'
    tagsip: 'vendor/ng-tags-input'
    elasticjs: 'vendor/elastic'
    fbutils: 'vendor/fb-utils'

  shim:
    angularjs:
      exports: 'angular'
    angularroute:
      deps: ['angularjs']
      exports: 'angular'
    jquery:
      exports: '$'
      deps: ['angularjs']
    flatUi:
      deps: ['jquery', 'angularjs']
    fbase:
      exports: 'Firebase'
    basefileupload:
      deps: ['angularjs']
      exports: 'angular'
    marked:
      exports: 'marked'
    sanitize:
      deps: ['angularjs']
      exports: 'angular'
    anganimate:
      deps: ['angularjs']
      exports: 'angular'
    tagsip:
      deps: ['angularjs']
      exports: 'angular'
    elasticjs:
      deps: ['angularjs']
      exports: 'angular'
    moment:
      exports: 'moment'
    picker:
      exports: 'filepicker'
    afire:
      deps: ['fbase', 'angularjs']
      exports: 'angular'
    idle:
      exports: 'ifvisible'
    bowser:
      exports: 'bowser'
    fbutils:
      deps: ['fbase']
      exports: 'Firebase'


  modules: [
    {
      name: "application"

      include: [
        'main'
      ]
    }

  ]
  priority: ['application']



