module.exports = function (grunt) {

  var path = require('path');

  function paths() {
    return require('./patternlab-config.json').paths;
  }

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        stripBanners: true,
        banner: '/* \n * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy") %> \n * \n * <%= pkg.author %>, and the web community.\n * Licensed under the <%= pkg.license %> license. \n * \n * Many thanks to Brad Frost and Dave Olsen for inspiration, encouragement, and advice. \n *\n */\n\n',
      },
      patternlab: {
        src: './core/lib/patternlab.js',
        dest: './core/lib/patternlab.js'
      },
      object_factory: {
        src: './core/lib/object_factory.js',
        dest: './core/lib/object_factory.js'
      },
      lineage: {
        src: './core/lib/lineage_hunter.js',
        dest: './core/lib/lineage_hunter.js'
      },
      media_hunter: {
        src: './core/lib/media_hunter.js',
        dest: './core/lib/media_hunter.js'
      },
      patternlab_grunt: {
        src: './core/lib/patternlab_grunt.js',
        dest: './core/lib/patternlab_grunt.js'
      },
      patternlab_gulp: {
        src: './core/lib/patternlab_gulp.js',
        dest: './core/lib/patternlab_gulp.js'
      },
      parameter_hunter: {
        src: './core/lib/parameter_hunter.js',
        dest: './core/lib/parameter_hunter.js'
      },
      pattern_exporter: {
        src: './core/lib/pattern_exporter.js',
        dest: './core/lib/pattern_exporter.js'
      },
      pattern_assembler: {
        src: './core/lib/pattern_assembler.js',
        dest: './core/lib/pattern_assembler.js'
      },
      pseudopattern_hunter: {
        src: './core/lib/pseudopattern_hunter.js',
        dest: './core/lib/pseudopattern_hunter.js'
      },
      list_item_hunter: {
        src: './core/lib/list_item_hunter.js',
        dest: './core/lib/list_item_hunter.js'
      },
      style_modifier_hunter: {
        src: './core/lib/style_modifier_hunter.js',
        dest: './core/lib/style_modifier_hunter.js'
      }
    },
    copy: {
      main: {
        files: [
          { expand: true, cwd: path.resolve(paths().source.js), src: '*.js', dest: path.resolve(paths().public.js) },
          { expand: true, cwd: path.resolve(paths().source.css), src: '*.css', dest: path.resolve(paths().public.css) },
          { expand: true, cwd: path.resolve(paths().source.images), src: ['**/*.png', '**/*.jpg', '**/*.gif', '**/*.jpeg'], dest: path.resolve(paths().public.images) },
          { expand: true, cwd: path.resolve(paths().source.fonts), src: '*', dest: path.resolve(paths().public.fonts) },
          { expand: true, cwd: path.resolve(paths().source.data), src: 'annotations.js', dest: path.resolve(paths().public.data) }
        ]
      },
      styleguide: {
        files: [
          { expand: true, cwd: path.resolve(paths().source.styleguide), src: ['*.*', '**/*.*'], dest: path.resolve(paths().public.styleguide) }
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: path.resolve(paths().source.fonts),
            src: '*', 
            dest: path.resolve(paths().public.dist + '/fonts') 
          },
          {
            expand: true,
            cwd: path.resolve(paths().source.images),
            src: '*', dest: path.resolve(paths().public.dist + '/images') 
          }
        ]
      }
    },
    watch: {
      all: {
        files: [
          path.resolve(paths().source.css + '**/*.css'),
          path.resolve(paths().source.styleguide + 'css/*.css'),
          path.resolve(paths().source.sass + '**/*.scss'),
          path.resolve(paths().source.patterns + '**/*.mustache'),
          path.resolve(paths().source.patterns + '**/*.json'),
          path.resolve(paths().source.fonts + '/*'),
          path.resolve(paths().source.images + '**/*'),
          path.resolve(paths().source.data + '*.json'),
          path.resolve(paths().source.js + '/src/**/*.js')
        ],
        tasks: ['default', 'bsReload:css']
      }
    },
    nodeunit: {
      all: ['test/*_tests.js']
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
    eslint: {
      options: {
        configFile: './.eslintrc'
      },
      target: ['./core/lib/*']
    },
    bsReload: {
      css: path.resolve(paths().public.root + '**/*.css')
    },
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'source/css/style.css': 'source/sass/styleguide-stm.scss',
          // 'core/styleguide/css/sm-answers.css': 'source/sass/sm-answers.scss',
          // 'core/styleguide/css/sm-drive.css': 'source/sass/sm-drive.scss',
          // 'core/styleguide/css/sm-research.css': 'source/sass/sm-research.scss',
          // 'core/styleguide/css/sm-texty.css': 'source/sass/sm-texty.scss'
        }
      }
    },
    
    scsslint: {
      allFiles: [
        path.resolve(paths().source.sass + '**/*.scss'),
      ],
      options: {
        config: '.scss-lint.yml',
        reporterOutput: 'scss-lint-report.xml',
        colorizeOutput: true,
        exclude: [
            '**/*_icons.scss',
            '**/*_grid.scss',
        ]
      },
    },
    
    cssmin: {
      options: {
        keepSpecialComments: 0
      },
      vendor : {
        expand: true,
        cwd: 'public/css/',
        src: ['*.css'],
        dest: 'public/dist/css/',
        ext: '.min.css'
      },
    },
    
    uglify: {
      options: {
        sourceMap: true
      },
      distMin: {
        files: {
          'public/dist/js/tabs.min.js': ['public/dist/js/tabs.js']
        }
      },
    },
    
    browserify: {
      dist: {
        options: {
          transform: [
            [
              'babelify',
              {
                "presets": ["es2015"]
              }
            ]
          ],
        },
        files: {
          'public/dist/js/tabs.js': ['source/js/src/tabs.js']
        }
      }
    },
    
    aws: grunt.file.readJSON('.aws.json'),
    
    s3: {
      options: {
        accessKeyId: "<%= aws.accessKeyId %>",
        secretAccessKey: "<%= aws.secretAccessKey %>",
        bucket: "<%= aws.bucket %>"
      },
      build: {
        cwd: "public/dist",
        src: "**"
      }
    },
  });
  
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-scss-lint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-aws');

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  //load the patternlab task
  grunt.task.loadTasks('./core/lib/');

  grunt.registerTask('default', ['scsslint', 'sass', 'patternlab', 'copy:main', 'copy:styleguide', 'browserify']);
  
  grunt.registerTask('nolint', [ 'sass', 'patternlab', 'copy:main', 'copy:styleguide']);
  grunt.registerTask('minify', [ 'cssmin', 'uglify' ]);

  //travis CI task
  grunt.registerTask('travis', ['nodeunit', 'eslint', 'patternlab']);

  grunt.registerTask('serve', ['patternlab', 'copy:main', 'copy:styleguide', 'browserSync', 'watch:all']);

  grunt.registerTask('build', ['nodeunit', 'eslint', 'concat', 'cssmin', 'browserify', 'minify', 'copy:dist']);

};

