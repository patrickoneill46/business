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
        files: ['*.html'],
        tasks: ['htmlbuild']
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
              header: 'partials/header.html',
              footer: 'partials/footer.html'
            },
            head: 'partials/head.html'
          }
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
    'htmlbuild',
    'watch'
  ]);

};