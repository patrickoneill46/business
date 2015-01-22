module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // uglify: {
    //   options: {
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    //   },
    //   build: {
    //     src: 'src/<%= pkg.name %>.js',
    //     dest: 'build/<%= pkg.name %>.min.js'
    //   }
    // }
    watch: {
      html: {
        files: ['partials/{,*/}*.html'],
        tasks: ['includes','htmlbuild:dist']
      },
      less: {
        files: ['less/*.less'],
        tasks: ['less', 'copy:css']
      },
    },
    less: {
      development: {
        files: {
          "css/index.css": "less/index.less"
        }
      }
    },
    uncss : {
      prod: {
        files: {
          'tmp/css/index.css': ['prod/*.html']
        }
      }
    },
    cssmin: {
      prod: {
        files: {
          'prod/css/index.min.css': ['tmp/css/index.css']
        },
      }
    },
    includes: {
      files: {
        src: [
          'partials/*.html',
        ],
        dest: '.',
        flatten: true,
        cwd: '.'
      },
    },
    clean: {
      dist: ['dist/{,*/}*.{html,css,js}'],
      prod: ['prod/{,*/}*.{html,css,js}'],
    },
    copy: {
      css: {
        src: 'css/index.css',
        dest: 'dist/css/index.css'
      },
      // js : {
      //   src: 'js/*.js',
      //   dest: 'dist/'
      // },
      // fonts: {
      //   src: 'fonts/*',
      //   dest: 'dist/'
      // },
      // images: {
      //   src: 'images/*',
      //   dest: 'dist/'
      // },
      dist: {
        files: [
          { src: 'css/index.css', dest: 'dist/css/index.css'},
          { src: 'images/{,*/,**/}*', dest: 'dist/'},
          { src: 'fonts/*', dest: 'dist/'},
          { src: 'js/jquery.js', dest: 'dist/js/jquery.js'}
        ]
      },
      prod: {
        files: [
          { src: 'css/index.css', dest: 'prod/css/index.css'},
          { src: 'images/{,*/,**/}*', dest: 'prod/'},
          { src: 'fonts/*', dest: 'prod/'},
          { src: 'js/jquery.js', dest: 'prod/js/jquery.js'}
        ]
      }
    },
    htmlbuild:{
      dist: {
        src: ['./*.html'],
        dest: 'dist/',
        options: {
          beautify: true,
          relative: false,
          scripts: {
            bundle: ['js/built.js'],
            jquery: ['js/jquery.js']
          },
          styles: {
            bundle: 'css/index.css'
          },
          sections: {
            layout: {
              head: 'partials/head.html',
              header: 'partials/header.html',
              footer: 'partials/footer.html',
              meta: 'partials/meta.html'
            },
            head: 'partials/head.html'
          },
          data: {
            homepageTitle: 'Default Title',
            meta: {
              description: "O'Neill IT1",
              author: "Patrick O'Neill"
            }
          }
        }
      },
      prod: {
        src: ['*.html'],
        dest: 'prod/',
        options: {
          beautify: true,
          relative: false,
          scripts: {
            bundle: ['js/built.js'],
            jquery: ['js/jquery.js']
          },
          styles: {
            bundle: 'css/index.css'
          },
          data: {
            homepageTitle: 'Default Title',
            meta: {
              description: "O'Neill IT",
              author: "Patrick O'Neill"
            }
          }
        }
      }
    },
    concatinclude: {
      dist: {
        files: {
          'dist/js/built.js': ['js/include.inc']
        }
      },
      prod: {
        files: {
          'prod/js/built.js': ['js/include.inc']
        }
      }
    },
    uglify: {
      prod: {
        files: {
          'prod/js/built.min.js': ['prod/js/built.js']
        }
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', [
    'clean:dist',
    'less',
    'concatinclude:dist',
    'includes',
    'copy:dist',
    'htmlbuild:dist',
    'watch'
  ]);

  grunt.registerTask('production', [
    'clean:prod',
    'includes',
    'htmlbuild:prod',
    'concatinclude:prod',
    'uglify:prod',
    'less',
    'copy:prod',
    'uncss:prod',
    'cssmin:prod',
  ]);

};