require =
  optimize: 'none'
  waitSeconds: 600
  #urlArgs: new Date().getTime().toString()

  #appDir: '../assets/javascripts/app'
  baseUrl: '../javascripts'
  dir: '../builtExternal'

  paths:
    angularjs: 'vendor/angular'
    flatUi: 'vendor/flatuipro.min'
    jquery: 'vendor/jquery.min'
    fbase: 'vendor/firebase'
    moment: 'vendor/moment'
    anganimate: 'vendor/angular-animate'
    sanitize: 'vendor/angular-sanitize'
    afire: 'vendor/afire'
    picker: 'vendor/filepicker'

  shim:
    angularjs:
      exports: 'angular'
    jquery:
      exports: '$'
      deps: ['angularjs']
    flatUi:
      deps: ['jquery', 'angularjs']
    fbase:
      exports: 'Firebase'
    moment:
      exports: 'moment'
    afire:
      deps: ['fbase', 'angularjs']
      exports: 'angular'  
    sanitize:
      deps: ['angularjs']
      exports: 'angular'
    anganimate:
      deps: ['angularjs']
      exports: 'angular'
    picker:
      exports: 'filepicker'  



  modules: [
    {
      name: "applicationExternal"

      include: [
        'mainExternal'
      ]
    }

  ]
  priority: ['applicationExternal']



