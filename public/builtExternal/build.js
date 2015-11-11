var require;

require = {
  optimize: 'none',
  waitSeconds: 600,
  baseUrl: '../javascripts',
  dir: '../built',
  paths: {
    angularjs: 'vendor/angular',
    flatUi: 'vendor/flatuipro.min',
    jquery: 'vendor/jquery.min',
    fbase: 'vendor/firebase',
    angularroute: 'vendor/angular-route',
    basefileupload: 'vendor/angular-base64-upload',
    marked: 'vendor/marked',
    sanitize: 'vendor/angular-sanitize',
    anganimate: 'vendor/angular-animate',
    moment: 'vendor/moment',
    picker: 'vendor/filepicker',
    afire: 'vendor/afire',
    idle: 'vendor/idle',
    bowser: 'vendor/bowser',
    tagsip: 'vendor/ng-tags-input',
    elasticjs: 'vendor/elastic',
    fbutils: 'vendor/fb-utils'
  },
  shim: {
    angularjs: {
      exports: 'angular'
    },
    angularroute: {
      deps: ['angularjs'],
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
    basefileupload: {
      deps: ['angularjs'],
      exports: 'angular'
    },
    marked: {
      exports: 'marked'
    },
    sanitize: {
      deps: ['angularjs'],
      exports: 'angular'
    },
    anganimate: {
      deps: ['angularjs'],
      exports: 'angular'
    },
    tagsip: {
      deps: ['angularjs'],
      exports: 'angular'
    },
    elasticjs: {
      deps: ['angularjs'],
      exports: 'angular'
    },
    moment: {
      exports: 'moment'
    },
    picker: {
      exports: 'filepicker'
    },
    afire: {
      deps: ['fbase', 'angularjs'],
      exports: 'angular'
    },
    idle: {
      exports: 'ifvisible'
    },
    bowser: {
      exports: 'bowser'
    },
    fbutils: {
      deps: ['fbase'],
      exports: 'Firebase'
    }
  },
  modules: [
    {
      name: "application",
      include: ['main']
    }
  ],
  priority: ['application']
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL1VzZXJzL2tyaXNobmFyb2toYWxlL2NvZGUvbGV2ZWwvbGV2ZWwvcHJvamVjdHMvbW9zYWljZWQvcHVibGljL2phdmFzY3JpcHRzL2J1aWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL2tyaXNobmFyb2toYWxlL2NvZGUvbGV2ZWwvbGV2ZWwvcHJvamVjdHMvbW9zYWljZWQvYXNzZXRzL2phdmFzY3JpcHRzL2J1aWxkLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLE9BQUE7O0FBQUEsT0FBQSxHQUNFO0FBQUEsRUFBQSxRQUFBLEVBQVcsTUFBWDtBQUFBLEVBQ0EsV0FBQSxFQUFhLEdBRGI7QUFBQSxFQUtBLE9BQUEsRUFBVSxnQkFMVjtBQUFBLEVBTUEsR0FBQSxFQUFNLFVBTk47QUFBQSxFQVFBLEtBQUEsRUFDRTtBQUFBLElBQUEsU0FBQSxFQUFZLGdCQUFaO0FBQUEsSUFDQSxNQUFBLEVBQVMsc0JBRFQ7QUFBQSxJQUVBLE1BQUEsRUFBUyxtQkFGVDtBQUFBLElBR0EsS0FBQSxFQUFRLGlCQUhSO0FBQUEsSUFJQSxZQUFBLEVBQWUsc0JBSmY7QUFBQSxJQUtBLGNBQUEsRUFBaUIsOEJBTGpCO0FBQUEsSUFNQSxNQUFBLEVBQVMsZUFOVDtBQUFBLElBT0EsUUFBQSxFQUFXLHlCQVBYO0FBQUEsSUFRQSxVQUFBLEVBQWEsd0JBUmI7QUFBQSxJQVNBLE1BQUEsRUFBUyxlQVRUO0FBQUEsSUFVQSxNQUFBLEVBQVMsbUJBVlQ7QUFBQSxJQVdBLEtBQUEsRUFBUSxjQVhSO0FBQUEsSUFZQSxJQUFBLEVBQU8sYUFaUDtBQUFBLElBYUEsTUFBQSxFQUFTLGVBYlQ7QUFBQSxJQWNBLE1BQUEsRUFBUyxzQkFkVDtBQUFBLElBZUEsU0FBQSxFQUFZLGdCQWZaO0FBQUEsSUFnQkEsT0FBQSxFQUFVLGlCQWhCVjtHQVRGO0FBQUEsRUEyQkEsSUFBQSxFQUNFO0FBQUEsSUFBQSxTQUFBLEVBQ0U7QUFBQSxNQUFBLE9BQUEsRUFBVSxTQUFWO0tBREY7QUFBQSxJQUVBLFlBQUEsRUFDRTtBQUFBLE1BQUEsSUFBQSxFQUFNLENBQUUsV0FBRixDQUFOO0FBQUEsTUFDQSxPQUFBLEVBQVUsU0FEVjtLQUhGO0FBQUEsSUFLQSxNQUFBLEVBQ0U7QUFBQSxNQUFBLE9BQUEsRUFBVSxHQUFWO0FBQUEsTUFDQSxJQUFBLEVBQU0sQ0FBRSxXQUFGLENBRE47S0FORjtBQUFBLElBUUEsTUFBQSxFQUNFO0FBQUEsTUFBQSxJQUFBLEVBQU0sQ0FBRSxRQUFGLEVBQVksV0FBWixDQUFOO0tBVEY7QUFBQSxJQVVBLEtBQUEsRUFDRTtBQUFBLE1BQUEsT0FBQSxFQUFVLFVBQVY7S0FYRjtBQUFBLElBWUEsY0FBQSxFQUNFO0FBQUEsTUFBQSxJQUFBLEVBQU0sQ0FBRSxXQUFGLENBQU47QUFBQSxNQUNBLE9BQUEsRUFBVSxTQURWO0tBYkY7QUFBQSxJQWVBLE1BQUEsRUFDRTtBQUFBLE1BQUEsT0FBQSxFQUFVLFFBQVY7S0FoQkY7QUFBQSxJQWlCQSxRQUFBLEVBQ0U7QUFBQSxNQUFBLElBQUEsRUFBTSxDQUFFLFdBQUYsQ0FBTjtBQUFBLE1BQ0EsT0FBQSxFQUFVLFNBRFY7S0FsQkY7QUFBQSxJQW9CQSxVQUFBLEVBQ0U7QUFBQSxNQUFBLElBQUEsRUFBTSxDQUFFLFdBQUYsQ0FBTjtBQUFBLE1BQ0EsT0FBQSxFQUFVLFNBRFY7S0FyQkY7QUFBQSxJQXVCQSxNQUFBLEVBQ0U7QUFBQSxNQUFBLElBQUEsRUFBTSxDQUFFLFdBQUYsQ0FBTjtBQUFBLE1BQ0EsT0FBQSxFQUFVLFNBRFY7S0F4QkY7QUFBQSxJQTBCQSxTQUFBLEVBQ0U7QUFBQSxNQUFBLElBQUEsRUFBTSxDQUFFLFdBQUYsQ0FBTjtBQUFBLE1BQ0EsT0FBQSxFQUFVLFNBRFY7S0EzQkY7QUFBQSxJQTZCQSxNQUFBLEVBQ0U7QUFBQSxNQUFBLE9BQUEsRUFBVSxRQUFWO0tBOUJGO0FBQUEsSUErQkEsTUFBQSxFQUNFO0FBQUEsTUFBQSxPQUFBLEVBQVUsWUFBVjtLQWhDRjtBQUFBLElBaUNBLEtBQUEsRUFDRTtBQUFBLE1BQUEsSUFBQSxFQUFNLENBQUUsT0FBRixFQUFXLFdBQVgsQ0FBTjtBQUFBLE1BQ0EsT0FBQSxFQUFVLFNBRFY7S0FsQ0Y7QUFBQSxJQW9DQSxJQUFBLEVBQ0U7QUFBQSxNQUFBLE9BQUEsRUFBVSxXQUFWO0tBckNGO0FBQUEsSUFzQ0EsTUFBQSxFQUNFO0FBQUEsTUFBQSxPQUFBLEVBQVUsUUFBVjtLQXZDRjtBQUFBLElBd0NBLE9BQUEsRUFDRTtBQUFBLE1BQUEsSUFBQSxFQUFNLENBQUUsT0FBRixDQUFOO0FBQUEsTUFDQSxPQUFBLEVBQVUsVUFEVjtLQXpDRjtHQTVCRjtBQUFBLEVBeUVBLE9BQUEsRUFBUztJQUNQO0FBQUEsTUFDRSxJQUFBLEVBQU8sYUFEVDtBQUFBLE1BR0UsT0FBQSxFQUFTLENBQ04sTUFETSxDQUhYO0tBRE87R0F6RVQ7QUFBQSxFQW1GQSxRQUFBLEVBQVUsQ0FBRSxhQUFGLENBbkZWO0NBREYsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUgPVxuICBvcHRpbWl6ZTogJ25vbmUnXG4gIHdhaXRTZWNvbmRzOiA2MDBcbiAgI3VybEFyZ3M6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLnRvU3RyaW5nKClcblxuICAjYXBwRGlyOiAnLi4vYXNzZXRzL2phdmFzY3JpcHRzL2FwcCdcbiAgYmFzZVVybDogJy4uL2phdmFzY3JpcHRzJ1xuICBkaXI6ICcuLi9idWlsdCdcblxuICBwYXRoczpcbiAgICBhbmd1bGFyanM6ICd2ZW5kb3IvYW5ndWxhcidcbiAgICBmbGF0VWk6ICd2ZW5kb3IvZmxhdHVpcHJvLm1pbidcbiAgICBqcXVlcnk6ICd2ZW5kb3IvanF1ZXJ5Lm1pbidcbiAgICBmYmFzZTogJ3ZlbmRvci9maXJlYmFzZSdcbiAgICBhbmd1bGFycm91dGU6ICd2ZW5kb3IvYW5ndWxhci1yb3V0ZSdcbiAgICBiYXNlZmlsZXVwbG9hZDogJ3ZlbmRvci9hbmd1bGFyLWJhc2U2NC11cGxvYWQnXG4gICAgbWFya2VkOiAndmVuZG9yL21hcmtlZCdcbiAgICBzYW5pdGl6ZTogJ3ZlbmRvci9hbmd1bGFyLXNhbml0aXplJ1xuICAgIGFuZ2FuaW1hdGU6ICd2ZW5kb3IvYW5ndWxhci1hbmltYXRlJ1xuICAgIG1vbWVudDogJ3ZlbmRvci9tb21lbnQnXG4gICAgcGlja2VyOiAndmVuZG9yL2ZpbGVwaWNrZXInXG4gICAgYWZpcmU6ICd2ZW5kb3IvYWZpcmUnXG4gICAgaWRsZTogJ3ZlbmRvci9pZGxlJ1xuICAgIGJvd3NlcjogJ3ZlbmRvci9ib3dzZXInXG4gICAgdGFnc2lwOiAndmVuZG9yL25nLXRhZ3MtaW5wdXQnXG4gICAgZWxhc3RpY2pzOiAndmVuZG9yL2VsYXN0aWMnXG4gICAgZmJ1dGlsczogJ3ZlbmRvci9mYi11dGlscydcblxuICBzaGltOlxuICAgIGFuZ3VsYXJqczpcbiAgICAgIGV4cG9ydHM6ICdhbmd1bGFyJ1xuICAgIGFuZ3VsYXJyb3V0ZTpcbiAgICAgIGRlcHM6IFsnYW5ndWxhcmpzJ11cbiAgICAgIGV4cG9ydHM6ICdhbmd1bGFyJ1xuICAgIGpxdWVyeTpcbiAgICAgIGV4cG9ydHM6ICckJ1xuICAgICAgZGVwczogWydhbmd1bGFyanMnXVxuICAgIGZsYXRVaTpcbiAgICAgIGRlcHM6IFsnanF1ZXJ5JywgJ2FuZ3VsYXJqcyddXG4gICAgZmJhc2U6XG4gICAgICBleHBvcnRzOiAnRmlyZWJhc2UnXG4gICAgYmFzZWZpbGV1cGxvYWQ6XG4gICAgICBkZXBzOiBbJ2FuZ3VsYXJqcyddXG4gICAgICBleHBvcnRzOiAnYW5ndWxhcidcbiAgICBtYXJrZWQ6XG4gICAgICBleHBvcnRzOiAnbWFya2VkJ1xuICAgIHNhbml0aXplOlxuICAgICAgZGVwczogWydhbmd1bGFyanMnXVxuICAgICAgZXhwb3J0czogJ2FuZ3VsYXInXG4gICAgYW5nYW5pbWF0ZTpcbiAgICAgIGRlcHM6IFsnYW5ndWxhcmpzJ11cbiAgICAgIGV4cG9ydHM6ICdhbmd1bGFyJ1xuICAgIHRhZ3NpcDpcbiAgICAgIGRlcHM6IFsnYW5ndWxhcmpzJ11cbiAgICAgIGV4cG9ydHM6ICdhbmd1bGFyJ1xuICAgIGVsYXN0aWNqczpcbiAgICAgIGRlcHM6IFsnYW5ndWxhcmpzJ11cbiAgICAgIGV4cG9ydHM6ICdhbmd1bGFyJ1xuICAgIG1vbWVudDpcbiAgICAgIGV4cG9ydHM6ICdtb21lbnQnXG4gICAgcGlja2VyOlxuICAgICAgZXhwb3J0czogJ2ZpbGVwaWNrZXInXG4gICAgYWZpcmU6XG4gICAgICBkZXBzOiBbJ2ZiYXNlJywgJ2FuZ3VsYXJqcyddXG4gICAgICBleHBvcnRzOiAnYW5ndWxhcidcbiAgICBpZGxlOlxuICAgICAgZXhwb3J0czogJ2lmdmlzaWJsZSdcbiAgICBib3dzZXI6XG4gICAgICBleHBvcnRzOiAnYm93c2VyJ1xuICAgIGZidXRpbHM6XG4gICAgICBkZXBzOiBbJ2ZiYXNlJ11cbiAgICAgIGV4cG9ydHM6ICdGaXJlYmFzZSdcblxuXG4gIG1vZHVsZXM6IFtcbiAgICB7XG4gICAgICBuYW1lOiBcImFwcGxpY2F0aW9uXCJcblxuICAgICAgaW5jbHVkZTogW1xuICAgICAgICAnbWFpbidcbiAgICAgIF1cbiAgICB9XG5cbiAgXVxuICBwcmlvcml0eTogWydhcHBsaWNhdGlvbiddXG5cblxuXG4iXX0=
