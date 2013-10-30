// Generated on 2013-10-21 using generator-angular 0.4.0
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var mountFolder = function (connect, dir) {
   return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
   require('load-grunt-tasks')(grunt);
   require('time-grunt')(grunt);

   grunt.loadNpmTasks('grunt-ng-constant');
   grunt.loadNpmTasks('grunt-angular-templates');

   // configurable paths
   var yeomanConfig = {
      module: 'protoApp',
      src: 'src',
      app: 'app',
      dist: 'dist',
      assets: {
         'css': 'assets/css',
         'img': 'assets/img',
         'locale': 'assets/locale'
      },
      ngTemplatesFile: '.tmp/templates/templates.js',
      bowerComponent: 'bower_components'
   };

   try {
      yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
   } catch (e) {
   }

   var getNgConstant = function(env) {
      return {
         dest: '<%= yeoman.src %>/<%= yeoman.app %>/config.js',
         name: 'config',
         constants: {
            Config: grunt.file.readJSON('config/' + env + '.json')
         }
      };
   };

   var getBuild = function(env) {
      return [
         'clean:dist',
         'ngtemplates',
         'ngconstant:' + env,
         'useminPrepare',
         'concurrent:dist',
         'autoprefixer',
         'concat',
         'copy:dist',
         'cdnify',
         'ngmin',
         'cssmin',
         'uglify',
         'rev',
         'usemin',
         'clean:distBower'
      ];
   };

   grunt.registerTask('server', function (target) {
      if (target === 'dist') {
         return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
      }

      grunt.task.run([
         'clean:server',
         'ngconstant:dev',
         'concurrent:server',
         'autoprefixer',
         'connect:livereload',
         'open',
         'watch'
      ]);
   });

   grunt.registerTask('test', [ 'clean:server', 'concurrent:test', 'autoprefixer', 'connect:test', 'karma' ]);

   grunt.registerTask('dev', getBuild('dev'));
   grunt.registerTask('prod', getBuild('prod'));
   grunt.registerTask('build', getBuild('prod'));

   grunt.registerTask('default', [ 'jshint', 'test', 'build' ]);

   grunt.initConfig({
      yeoman: yeomanConfig,
      ngconstant: {
         options: {
            // Task-specific options go here.
         },
         dev: getNgConstant('dev'),
         prod: getNgConstant('prod')
      },
      ngtemplates: {
         app: {
            options: {
               module: '<%= yeoman.module %>'
            },
            cwd: '<%= yeoman.src %>',
            src: '<%= yeoman.app %>/**/*.html',
            dest: '<%= yeoman.ngTemplatesFile %>'
         }
      },
      watch: {
         styles: {
            files: ['<%= yeoman.src %>/<%= yeoman.assets.css %>/{,*/}*.css'],
            tasks: ['copy:styles', 'autoprefixer']
         },
         livereload: {
            options: {
               livereload: LIVERELOAD_PORT
            },
            files: [
               '<%= yeoman.src %>/{,*/}*.html',
               '<%= yeoman.src %>/<%= yeoman.app %>/**/*.html',
               '.tmp/<%= yeoman.assets.css %>/{,*/}*.css',
               '{.tmp,<%= yeoman.src %>}/<%= yeoman.app %>/{,*/}*.js',
               '<%= yeoman.src %>/<%= yeoman.assets.img %>/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
               '<%= yeoman.src %>/<%= yeoman.assets.locale %>/*.json'
            ]
         }
      },
      autoprefixer: {
         options: ['last 1 version'],
         dist: {
            files: [
               {
                  expand: true,
                  cwd: '.tmp/<%= yeoman.assets.css %>/',
                  src: '{,*/}*.css',
                  dest: '.tmp/<%= yeoman.assets.css %>/'
               }
            ]
         }
      },
      connect: {
         options: {
            port: 9000,
            // Change this to '0.0.0.0' to access the server from outside.
            hostname: 'localhost'
         },
         livereload: {
            options: {
               middleware: function (connect) {
                  return [
                     lrSnippet,
                     mountFolder(connect, '.tmp'),
                     mountFolder(connect, yeomanConfig.src)
                  ];
               }
            }
         },
         test: {
            options: {
               middleware: function (connect) {
                  return [
                     mountFolder(connect, '.tmp'),
                     mountFolder(connect, 'test')
                  ];
               }
            }
         },
         dist: {
            options: {
               middleware: function (connect) {
                  return [
                     mountFolder(connect, yeomanConfig.dist)
                  ];
               }
            }
         }
      },
      open: {
         server: {
            url: 'http://localhost:<%= connect.options.port %>'
         }
      },
      clean: {
         dist: {
            files: [
               {
                  dot: true,
                  src: [
                     '.tmp',
                     '<%= yeoman.dist %>/*',
                     '!<%= yeoman.dist %>/.git*'
                  ]
               }
            ]
         },
         distBower: {
            files: [
               {
                  src: [
                     '<%= yeoman.dist %>/<%= yeoman.bowerComponent %>'
                  ]
               }
            ]
         },
         server: '.tmp'
      },
      jshint: {
         options: {
            jshintrc: '.jshintrc'
         },
         all: [
            'Gruntfile.js',
            '<%= yeoman.src %>/<%= yeoman.app %>/{,*/}*.js'
         ]
      },
      // not used since Uglify task does concat,
      // but still available if needed
      /*concat: { }*/
      rev: {
         dist: {
            options: {
               algorithm: 'sha1',
               length: 4
            },
            files: {
               src: [
                  '<%= yeoman.dist %>/<%= yeoman.app %>/{,*/}*.js',
                  '<%= yeoman.dist %>/<%= yeoman.assets.css %>/{,*/}*.css'
               ]
            }
         }
      },
      useminPrepare: {
         html: '<%= yeoman.src %>/index.html',
         options: {
            dest: '<%= yeoman.dist %>'
         }
      },
      usemin: {
         html: ['<%= yeoman.dist %>/{,*/}*.html'],
         css: ['<%= yeoman.dist %>/<%= yeoman.assets.css %>/{,*/}*.css'],
         options: {
            dirs: ['<%= yeoman.dist %>']
         }
      },
      imagemin: {
         dist: {
            files: [
               {
                  expand: true,
                  cwd: '<%= yeoman.src %>/<%= yeoman.assets.img %>',
                  src: '{,*/}*.{png,jpg,jpeg}',
                  dest: '<%= yeoman.dist %>/<%= yeoman.assets.img %>'
               }
            ]
         }
      },
      svgmin: {
         dist: {
            files: [
               {
                  expand: true,
                  cwd: '<%= yeoman.src %>/<%= yeoman.assets.img %>',
                  src: '{,*/}*.svg',
                  dest: '<%= yeoman.dist %>/<%= yeoman.assets.img %>'
               }
            ]
         }
      },
      cssmin: {
         // By default, your `index.html` <!-- Usemin Block --> will take care of
         // minification. This option is pre-configured if you do not wish to use
         // Usemin blocks.
         // dist: {
         //   files: {
         //     '<%= yeoman.dist %>/styles/main.css': [
         //       '.tmp/styles/{,*/}*.css',
         //       '<%= yeoman.src %>/styles/{,*/}*.css'
         //     ]
         //   }
         // }
      },
      htmlmin: {
         dist: {
            options: {
               /*removeCommentsFromCDATA: true,
                // https://github.com/yeoman/grunt-usemin/issues/44
                //collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true*/
            },
            files: [
               {
                  expand: true,
                  cwd: '<%= yeoman.src %>',
                  src: ['*.html', 'views/*.html'],
                  dest: '<%= yeoman.dist %>'
               }
            ]
         }
      },
      // Put files not handled in other tasks here
      copy: {
         dist: {
            files: [
               {
                  expand: true,
                  dot: true,
                  cwd: '<%= yeoman.src %>',
                  dest: '<%= yeoman.dist %>',
                  src: [
                     '*.{ico,png,txt}',
                     '.htaccess',
                     '<%= yeoman.bowerComponent %>/**/*',
                     '<%= yeoman.assets.img %>/{,*/}*.{gif,webp}',
                     '<%= yeoman.assets.css %>/fonts/*',
                     '<%= yeoman.assets.locale %>/*.json',
                  ]
               },
               {
                  expand: true,
                  cwd: '.tmp/<%= yeoman.assets.img %>',
                  dest: '<%= yeoman.dist %>/<%= yeoman.assets.img %>',
                  src: [
                     'generated/*'
                  ]
               }
            ]
         },
         styles: {
            expand: true,
            cwd: '<%= yeoman.src %>/<%= yeoman.assets.css %>',
            dest: '.tmp/<%= yeoman.assets.css %>/',
            src: '{,*/}*.css'
         }
      },
      concurrent: {
         server: [
            'copy:styles'
         ],
         test: [
            'copy:styles'
         ],
         dist: [
            'copy:styles',
            'imagemin',
            'svgmin',
            'htmlmin'
         ]
      },
      karma: {
         unit: {
            configFile: 'karma.conf.js',
            singleRun: true
         }
      },
      cdnify: {
         dist: {
            html: ['<%= yeoman.dist %>/*.html']
         }
      },
      ngmin: {
         dist: {
            files: [
               {
                  expand: true,
                  cwd: '<%= yeoman.dist %>/<%= yeoman.app %>',
                  src: '*.js',
                  dest: '<%= yeoman.dist %>/<%= yeoman.app %>'
               }
            ]
         }
      },
      uglify: {
         dist: {
            files: {
               '<%= yeoman.dist %>/<%= yeoman.app %>/app.js': [
                  '<%= yeoman.dist %>/<%= yeoman.app %>/app.js',
                  '<%= yeoman.ngTemplatesFile %>'
               ]
            }
         }
      }
   });
};
