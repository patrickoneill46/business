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
        files: ['{,*/}*.html'],
        tasks: ['includes','htmlbuild:dist']
      },
      less: {
        files: ['less/*.less'],
        tasks: ['less', 'htmlbuild']
      }
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
        src: ['partials/index.html'],
        dest: '.',
        flatten: true,
        cwd: '.'
      },
    },
    htmlbuild:{
      dist: {
        src: 'index.html',
        dest: 'dist/',
        options: {
          beautify: true,
          relative: true,
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
    'watch'
  ]);

};