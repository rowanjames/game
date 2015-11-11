{
  optimize: 'none',
  waitSeconds: 600,
  baseUrl: '../javascripts',
  dir: '../builtExternal',
  paths: {
    angularjs: 'vendor/angular',
    flatUi: 'vendor/flatuipro.min',
    jquery: 'vendor/jquery.min',
    fbase: 'vendor/firebase',
    moment: 'vendor/moment',
    anganimate: 'vendor/angular-animate',
    sanitize: 'vendor/angular-sanitize',
    afire: 'vendor/afire',
    picker: 'vendor/filepicker',
    pica: 'vendor/pica',
    exif: 'vendor/angular-canvas-ext/exif.min',
    mega: 'vendor/angular-canvas-ext/megapix-image.min',
    ext: 'vendor/angular-canvas-ext/angular-canvas-ext.min',
    ngupload: 'vendor/ng-file-upload'
  },
  shim: {
    angularjs: {
      exports: 'angular'
    },
    jquery: {
      exports: '$',
      deps: ['angularjs']
    },
    flatUi: {
      deps: ['jquery', 'angularjs']
    },
    fbase: {
      exports: 'Firebase'
    },
    moment: {
      exports: 'moment'
    },
    afire: {
      deps: ['fbase', 'angularjs'],
      exports: 'angular'
    },
    sanitize: {
      deps: ['angularjs'],
      exports: 'angular'
    },
    anganimate: {
      deps: ['angularjs'],
      exports: 'angular'
    },
    picker: {
      exports: 'filepicker'
    },
    pica: {
      exports: 'pica'
    },
    ext: {
      deps: ['angularjs', 'exif', 'mega']
    },
    ngupload: {
      deps: ['angularjs']
    }
  },
  modules: [
    {
      name: "applicationExternal",
      include: ['mainExternal']
    }
  ],
  priority: ['applicationExternal']
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL1VzZXJzL2tyaXNobmFyb2toYWxlL2NvZGUvbGV2ZWwvbGV2ZWwvcHJvamVjdHMvbW9zYWljZWQvcHVibGljL2phdmFzY3JpcHRzL2J1aWxkRXh0ZXJuYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIvVXNlcnMva3Jpc2huYXJva2hhbGUvY29kZS9sZXZlbC9sZXZlbC9wcm9qZWN0cy9tb3NhaWNlZC9hc3NldHMvamF2YXNjcmlwdHMvYnVpbGRFeHRlcm5hbC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxPQUFBOztBQUFBLE9BQUEsR0FDRTtBQUFBLEVBQUEsUUFBQSxFQUFXLE1BQVg7QUFBQSxFQUNBLFdBQUEsRUFBYSxHQURiO0FBQUEsRUFLQSxPQUFBLEVBQVUsZ0JBTFY7QUFBQSxFQU1BLEdBQUEsRUFBTSxrQkFOTjtBQUFBLEVBUUEsS0FBQSxFQUNFO0FBQUEsSUFBQSxTQUFBLEVBQVksZ0JBQVo7QUFBQSxJQUNBLE1BQUEsRUFBUyxzQkFEVDtBQUFBLElBRUEsTUFBQSxFQUFTLG1CQUZUO0FBQUEsSUFHQSxLQUFBLEVBQVEsaUJBSFI7QUFBQSxJQUlBLE1BQUEsRUFBUyxlQUpUO0FBQUEsSUFLQSxVQUFBLEVBQWEsd0JBTGI7QUFBQSxJQU1BLFFBQUEsRUFBVyx5QkFOWDtBQUFBLElBT0EsS0FBQSxFQUFRLGNBUFI7QUFBQSxJQVFBLE1BQUEsRUFBUyxtQkFSVDtBQUFBLElBU0EsSUFBQSxFQUFPLGFBVFA7QUFBQSxJQVVBLElBQUEsRUFBTyxvQ0FWUDtBQUFBLElBV0EsSUFBQSxFQUFPLDZDQVhQO0FBQUEsSUFZQSxHQUFBLEVBQU0sa0RBWk47QUFBQSxJQWFBLFFBQUEsRUFBVyx1QkFiWDtHQVRGO0FBQUEsRUF3QkEsSUFBQSxFQUNFO0FBQUEsSUFBQSxTQUFBLEVBQ0U7QUFBQSxNQUFBLE9BQUEsRUFBVSxTQUFWO0tBREY7QUFBQSxJQUVBLE1BQUEsRUFDRTtBQUFBLE1BQUEsT0FBQSxFQUFVLEdBQVY7QUFBQSxNQUNBLElBQUEsRUFBTSxDQUFFLFdBQUYsQ0FETjtLQUhGO0FBQUEsSUFLQSxNQUFBLEVBQ0U7QUFBQSxNQUFBLElBQUEsRUFBTSxDQUFFLFFBQUYsRUFBWSxXQUFaLENBQU47S0FORjtBQUFBLElBT0EsS0FBQSxFQUNFO0FBQUEsTUFBQSxPQUFBLEVBQVUsVUFBVjtLQVJGO0FBQUEsSUFTQSxNQUFBLEVBQ0U7QUFBQSxNQUFBLE9BQUEsRUFBVSxRQUFWO0tBVkY7QUFBQSxJQVdBLEtBQUEsRUFDRTtBQUFBLE1BQUEsSUFBQSxFQUFNLENBQUUsT0FBRixFQUFXLFdBQVgsQ0FBTjtBQUFBLE1BQ0EsT0FBQSxFQUFVLFNBRFY7S0FaRjtBQUFBLElBY0EsUUFBQSxFQUNFO0FBQUEsTUFBQSxJQUFBLEVBQU0sQ0FBRSxXQUFGLENBQU47QUFBQSxNQUNBLE9BQUEsRUFBVSxTQURWO0tBZkY7QUFBQSxJQWlCQSxVQUFBLEVBQ0U7QUFBQSxNQUFBLElBQUEsRUFBTSxDQUFFLFdBQUYsQ0FBTjtBQUFBLE1BQ0EsT0FBQSxFQUFVLFNBRFY7S0FsQkY7QUFBQSxJQW9CQSxNQUFBLEVBQ0U7QUFBQSxNQUFBLE9BQUEsRUFBVSxZQUFWO0tBckJGO0FBQUEsSUFzQkEsSUFBQSxFQUNFO0FBQUEsTUFBQSxPQUFBLEVBQVUsTUFBVjtLQXZCRjtBQUFBLElBd0JBLEdBQUEsRUFDRTtBQUFBLE1BQUEsSUFBQSxFQUFNLENBQUUsV0FBRixFQUFjLE1BQWQsRUFBc0IsTUFBdEIsQ0FBTjtLQXpCRjtBQUFBLElBMEJBLFFBQUEsRUFDRTtBQUFBLE1BQUEsSUFBQSxFQUFNLENBQUUsV0FBRixDQUFOO0tBM0JGO0dBekJGO0FBQUEsRUF3REEsT0FBQSxFQUFTO0lBQ1A7QUFBQSxNQUNFLElBQUEsRUFBTyxxQkFEVDtBQUFBLE1BR0UsT0FBQSxFQUFTLENBQ04sY0FETSxDQUhYO0tBRE87R0F4RFQ7QUFBQSxFQWtFQSxRQUFBLEVBQVUsQ0FBRSxxQkFBRixDQWxFVjtDQURGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlID1cbiAgb3B0aW1pemU6ICdub25lJ1xuICB3YWl0U2Vjb25kczogNjAwXG4gICN1cmxBcmdzOiBuZXcgRGF0ZSgpLmdldFRpbWUoKS50b1N0cmluZygpXG5cbiAgI2FwcERpcjogJy4uL2Fzc2V0cy9qYXZhc2NyaXB0cy9hcHAnXG4gIGJhc2VVcmw6ICcuLi9qYXZhc2NyaXB0cydcbiAgZGlyOiAnLi4vYnVpbHRFeHRlcm5hbCdcblxuICBwYXRoczpcbiAgICBhbmd1bGFyanM6ICd2ZW5kb3IvYW5ndWxhcidcbiAgICBmbGF0VWk6ICd2ZW5kb3IvZmxhdHVpcHJvLm1pbidcbiAgICBqcXVlcnk6ICd2ZW5kb3IvanF1ZXJ5Lm1pbidcbiAgICBmYmFzZTogJ3ZlbmRvci9maXJlYmFzZSdcbiAgICBtb21lbnQ6ICd2ZW5kb3IvbW9tZW50J1xuICAgIGFuZ2FuaW1hdGU6ICd2ZW5kb3IvYW5ndWxhci1hbmltYXRlJ1xuICAgIHNhbml0aXplOiAndmVuZG9yL2FuZ3VsYXItc2FuaXRpemUnXG4gICAgYWZpcmU6ICd2ZW5kb3IvYWZpcmUnXG4gICAgcGlja2VyOiAndmVuZG9yL2ZpbGVwaWNrZXInXG4gICAgcGljYTogJ3ZlbmRvci9waWNhJ1xuICAgIGV4aWY6ICd2ZW5kb3IvYW5ndWxhci1jYW52YXMtZXh0L2V4aWYubWluJ1xuICAgIG1lZ2E6ICd2ZW5kb3IvYW5ndWxhci1jYW52YXMtZXh0L21lZ2FwaXgtaW1hZ2UubWluJ1xuICAgIGV4dDogJ3ZlbmRvci9hbmd1bGFyLWNhbnZhcy1leHQvYW5ndWxhci1jYW52YXMtZXh0Lm1pbidcbiAgICBuZ3VwbG9hZDogJ3ZlbmRvci9uZy1maWxlLXVwbG9hZCdcblxuICBzaGltOlxuICAgIGFuZ3VsYXJqczpcbiAgICAgIGV4cG9ydHM6ICdhbmd1bGFyJ1xuICAgIGpxdWVyeTpcbiAgICAgIGV4cG9ydHM6ICckJ1xuICAgICAgZGVwczogWydhbmd1bGFyanMnXVxuICAgIGZsYXRVaTpcbiAgICAgIGRlcHM6IFsnanF1ZXJ5JywgJ2FuZ3VsYXJqcyddXG4gICAgZmJhc2U6XG4gICAgICBleHBvcnRzOiAnRmlyZWJhc2UnXG4gICAgbW9tZW50OlxuICAgICAgZXhwb3J0czogJ21vbWVudCdcbiAgICBhZmlyZTpcbiAgICAgIGRlcHM6IFsnZmJhc2UnLCAnYW5ndWxhcmpzJ11cbiAgICAgIGV4cG9ydHM6ICdhbmd1bGFyJyAgXG4gICAgc2FuaXRpemU6XG4gICAgICBkZXBzOiBbJ2FuZ3VsYXJqcyddXG4gICAgICBleHBvcnRzOiAnYW5ndWxhcidcbiAgICBhbmdhbmltYXRlOlxuICAgICAgZGVwczogWydhbmd1bGFyanMnXVxuICAgICAgZXhwb3J0czogJ2FuZ3VsYXInXG4gICAgcGlja2VyOlxuICAgICAgZXhwb3J0czogJ2ZpbGVwaWNrZXInXG4gICAgcGljYTpcbiAgICAgIGV4cG9ydHM6ICdwaWNhJyBcbiAgICBleHQ6IFxuICAgICAgZGVwczogWydhbmd1bGFyanMnLCdleGlmJywgJ21lZ2EnXSAgICAgXG4gICAgbmd1cGxvYWQ6XG4gICAgICBkZXBzOiBbJ2FuZ3VsYXJqcyddICBcblxuXG5cbiAgbW9kdWxlczogW1xuICAgIHtcbiAgICAgIG5hbWU6IFwiYXBwbGljYXRpb25FeHRlcm5hbFwiXG5cbiAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgJ21haW5FeHRlcm5hbCdcbiAgICAgIF1cbiAgICB9XG5cbiAgXVxuICBwcmlvcml0eTogWydhcHBsaWNhdGlvbkV4dGVybmFsJ11cblxuXG5cbiJdfQ==
