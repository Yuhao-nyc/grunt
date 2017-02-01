module.exports = function(grunt) {

  // configure the one or more tasks
  grunt.initConfig({
    stylus: {
      build: {
        options: {
          linenos: true,
          compress: false
        },
        files: [{
          expand: true,
          cwd: 'source',
          src: [ '**/*.styl' ],
          dest: 'build',
          ext: '.css'
        }]
      }
    },

    cssmin: {
      build: {
        files: {
          'build/minified.css': [ 'build/css/*.css' ]
        }
      }
    },

    uglify: {
      build: {
        options: {
          mangle: false
        },
        files: {
          'build/minified.js': [ 'build/js/*.js' ]
        }
      }
    },

    connect: {
        server: {
          options: {
            port: 4000,
            base: 'build',
            hostname: '*'
          }
        }
    },

    watch: {
      stylesheets: {
        files: 'source/**/*.styl',
        tasks: [ 'stylesheets' ]
      },
      scripts: {
        files: 'source/**/*.coffee',
        tasks: [ 'scripts' ]
      },
      copy: {
        files: [ 'source/**', '!source/**/*.styl', '!source/**/*.coffee', '!source/**/*.jade' ],
        tasks: [ 'copy' ]
      }
    },

  });

  // load the tasks
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');


  // define the tasks seperate tasks, call each ones when necessary. different tasks put in one task
  grunt.registerTask(
    'css',
    'Compiles all of the assets and copies the files to the build directory.',
    ['cssmin', 'stylus' ]
  );

  grunt.registerTask(
    'script',
    'Compiles the JavaScript files.',
    ['uglify' ]
  );

  grunt.registerTask(
    'default',
    'Watches the project for changes, automatically builds them and runs a server.',
    ['watch' ]
  );

};