module.exports = function(grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserSync: {
      bsFiles: ['httpdocs/*', '!**/node_modules/**/*'],
      options: {
        server: {
          baseDir: './httpdocs/'
        },
        port: 8000,
        open: true
      }
    },

    pug: {
      compile: {
        options: {
          pretty: true,
          data: {
            debug: false
          }
        },
        files: [{
          expand: true,
          cwd: 'src/pages/',
          src: ['**/*.pug'],
          dest: 'httpdocs/',
          rename: function (dest, src) {
            return dest + src.split('.', 2)[0] + '.html';
          }
        }]
      }
    },

    watch: {
      pug: {
        files: ['src/**/*'],
        tasks: ['pug'],
        options: {
          interrupt: false,
          spawn: false
        }
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true,
        limit: 10
      },
      monitor: {
        tasks: [
          'watch:pug',
          'server'
        ]
      }
    },
  });

  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('monitor', ['concurrent:monitor']);
  grunt.registerTask('server', ['browserSync']);
  //grunt.registerTask('default', ['watch']);
};