/******************************************************
 * PATTERN LAB NODE
 * EDITION-NODE-GRUNT
 * The grunt wrapper around patternlab-node core, providing tasks to interact with the core library and move supporting frontend assets.
******************************************************/

module.exports = function (grunt) {

  var path = require('path'),
      argv = require('minimist')(process.argv.slice(2));

  // load all grunt tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-sass');

  /******************************************************
   * PATTERN LAB CONFIGURATION
  ******************************************************/

  //read all paths from our namespaced config file
  var config = require('./patternlab-config.json'),
    pl = require('patternlab-node')(config);

  function paths() {
    return config.paths;
  }

  function getConfiguredCleanOption() {
    return config.cleanPublic;
  }

  grunt.registerTask('patternlab', 'create design systems with atomic design', function (arg) {

    if (arguments.length === 0) {
      pl.build(function(){}, getConfiguredCleanOption());
    }

    if (arg && arg === 'version') {
      pl.version();
    }

    if (arg && arg === "patternsonly") {
      pl.patternsonly(function(){},getConfiguredCleanOption());
    }

    if (arg && arg === "help") {
      pl.help();
    }

    if (arg && arg === "starterkit-list") {
      pl.liststarterkits();
    }

    if (arg && arg === "starterkit-load") {
      pl.loadstarterkit(argv.kit);
    }

    if (arg && (arg !== "version" && arg !== "patternsonly" && arg !== "help" && arg !== "starterkit-list" && arg !== "starterkit-load")) {
      pl.help();
    }
  });


  grunt.initConfig({

    /******************************************************
     * COPY TASKS
    ******************************************************/
    copy: {
      main: {
        files: [
          { expand: true, cwd: path.resolve(paths().source.js), src: '**/*.js', dest: path.resolve(paths().public.js) },
          { expand: true, cwd: path.resolve(paths().source.images), src: '*', dest: path.resolve(paths().public.images) },
          { expand: true, cwd: path.resolve(paths().source.fonts), src: '*', dest: path.resolve(paths().public.fonts) },
          { expand: true, cwd: path.resolve(paths().source.root), src: 'favicon.ico', dest: path.resolve(paths().public.root) },
          { expand: true, cwd: path.resolve(paths().source.styleguide), src: ['*', '**'], dest: path.resolve(paths().public.root) },
          // slightly inefficient to do this again - I am not a grunt glob master. someone fix
          { expand: true, flatten: true, cwd: path.resolve(paths().source.styleguide, 'styleguide', 'css', 'custom'), src: '*.css)', dest: path.resolve(paths().public.styleguide, 'css') }
        ]
      },
      scss: {
        files: [
          { expand: true, cwd: path.resolve(paths().source.scss), src: '*.scss', dest: path.resolve(paths().cache.scss) },
        ]
      }
    },

    concat: {
      // concat all scss files
      scss: {
        options: {
          // add the sourcefile as comment
          process: function(src, filepath) {
            return '/* Source: ' + filepath + '*/\n' + src
          }
        },
        files: [
          {
            src:[
              './source/**/*.scss',
              '!./source/scss/**/*.scss'
            ],
            dest: path.resolve(paths().cache.scssall) + '/scssall.scss'
          }
        ]
      },
      csscombined: {
        files: [
          {
            src:[
              path.resolve(paths().cache.css) + '/main.css',
              path.resolve(paths().cache.css) + '/scssall.css'
            ],
            dest: path.resolve(paths().public.css) + '/style.css'
          }
        ]
      }
    },

    sass: {
      cache: {
        files: [
          {
            src: path.resolve(paths().cache.scss) + '/main.scss',
            dest: path.resolve(paths().cache.css) + '/main.css'
          }
        ]
      },
      sassall: {
        files: [
          {
            src: path.resolve(paths().cache.scssall) + '/scssall.scss',
            dest: path.resolve(paths().cache.css) + '/scssall.css'
          }
        ]
      }
    },
    /******************************************************
     * SERVER AND WATCH TASKS
    ******************************************************/
    watch: {
      all: {
        files: [
          path.resolve(paths().source.scss + '**/*.scss'),
          path.resolve(paths().source.styleguide + 'scss/*.scss'),
          path.resolve(paths().source.patterns + '**/*'),
          path.resolve(paths().source.fonts + '/*'),
          path.resolve(paths().source.images + '/*'),
          path.resolve(paths().source.data + '*.json'),
          path.resolve(paths().source.js + '/*.js'),
          path.resolve(paths().source.root + '/*.ico')
        ],
        tasks: ['default', 'bsReload:css']
      }
    },
    browserSync: {
      dev: {
        options: {
          server:  path.resolve(paths().public.root),
          watchTask: true,
          watchOptions: {
            ignoreInitial: true,
            ignored: '*.html'
          },
          snippetOptions: {
            // Ignore all HTML files within the templates folder
            blacklist: ['/index.html', '/', '/?*']
          },
          plugins: [
            {
              module: 'bs-html-injector',
              options: {
                files: [path.resolve(paths().public.root + '/index.html'), path.resolve(paths().public.styleguide + '/styleguide.html')]
              }
            }
          ],
          notify: {
            styles: [
              'display: none',
              'padding: 15px',
              'font-family: sans-serif',
              'position: fixed',
              'font-size: 1em',
              'z-index: 9999',
              'bottom: 0px',
              'right: 0px',
              'border-top-left-radius: 5px',
              'background-color: #1B2032',
              'opacity: 0.4',
              'margin: 0',
              'color: white',
              'text-align: center'
            ]
          }
        }
      }
    },
    bsReload: {
      css: path.resolve(paths().public.root + '**/*.css')
    }
  });

  /******************************************************
   * COMPOUND TASKS
  ******************************************************/

  grunt.registerTask('default', ['patternlab', 'copy:main', 'manage:sass']);
  grunt.registerTask('manage:sass', ['copy:scss', 'sass:cache', 'concat:scss', 'sass:sassall', 'concat:csscombined']);
  grunt.registerTask('patternlab:build', ['patternlab', 'copy:main', 'manage:sass']);
  grunt.registerTask('patternlab:watch', ['patternlab', 'copy:main', 'manage:sass', 'watch:all']);
  grunt.registerTask('patternlab:serve', ['patternlab', 'copy:main', 'manage:sass', 'browserSync', 'watch:all']);

};
