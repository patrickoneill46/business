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

      },
      less: {
        files: ['less/*.less'],
        tasks: ['less']
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
          relative: true
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
    'htmlbuild',
    'watch'
  ]);

};