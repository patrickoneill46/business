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
        tasks: ['less', 'htmlbuild', 'copy:css']
      },
    },
    less: {
      development: {
        files: {
          "css/index.css": "less/index.less"
        }
      }
    },
    includes: {
      files: {
        src: [
          'partials/*.html',
          // 'partials/about-us.html',
          // 'partials/index.html',
          // 'partials/portfolio.html',
          // 'partials/pricing.html',
          // 'partials/services.html',
        ],
        dest: '.',
        flatten: true,
        cwd: '.'
      },
    },
    copy: {
      css: {
        src: 'css/index.css',
        dest: 'dist/css/index.css'
      },
      js : {
        src: 'js/*.js',
        dest: 'dist/'
      },
      fonts: {
        src: 'fonts/*',
        dest: 'dist/'
      },
      images: {
        src: 'images/*',
        dest: 'dist/'
      }
    },
    htmlbuild:{
      dist: {
        src: ['./*.html'],
        // src: ['404.html', 'about-us.html', 'index.html', 'portfolio.html', 'pricing.html', 'services.html'],
        dest: 'dist/',
        options: {
          beautify: true,
          relative: false,
          scripts: {
            bundle: ['js/*.js', '!js/jquery.js'],
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
      }
    },
    concatinclude: {
      dist: {
        files: {
          'dist/built.js': ['js/include.inc']
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  // grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  // grunt.registerTask('default', ['uglify']);
  grunt.registerTask('default', [
    'less',
    'concatinclude:dist',
    'includes',
    'htmlbuild',
    'copy',
    'watch'
  ]);

};