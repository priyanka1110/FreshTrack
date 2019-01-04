module.exports = function (grunt) {
  var environment = grunt.option('target') || 'dev';
  var defineEnvTask = {
    name: 'define-environment',
    search: '// @environment',
    replace: 'var environment = \'' + environment + '\';',
    flags: 'g'
  };
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      main: ['www/*'],
      dev: ['www/templates/*.hbs', 'www/templates/*/*.hbs'],
      staging: ['www/templates/*/*.hbs', 'www/templates/*.hbs', 'www/js/*', '!www/js/*.min.js', 'www/lib/js/*', '!www/lib/js/require-2.0.0.js'],
      production: ['www/templates/*/*.hbs', 'www/templates/*.hbs', 'www/js/*', '!www/lib/require-2.0.0.js']
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: ['**/*', '!**/html/**', '!**/sass/**', '!**/index-preview.html', '!**/js/config-*.*'],
            dest: 'www'
          }
        ]
      },
      dev: {
        files: [
          {
            src: 'src/js/config-variables-development.js',
            dest: 'www/js/config-variables.js'
          }
        ]
      },
      staging: {
        files: [
          {
            src: 'src/js/config-variables-staging.js',
            dest: 'www/js/config-variables.js'
          }
        ]
      },
      production: {
        files: [
          {
            src: 'src/js/config-variables-production.js',
            dest: 'www/js/config-variables.js'
          }
        ]
      }
    },
    sass: {
      dev: {
        options: {
          style: 'compressed'
        },
        files: {
          'www/css/windows.css': 'src/sass/windows.scss',
          'www/css/android.css': 'src/sass/android.scss',
          'www/css/jellyBean.css': 'src/sass/jellyBean.scss'
        }
      },
      staging: {
        options: {
          style: 'compressed'
        },
        files: {
          'www/css/windows.css': 'src/sass/windows.scss',
          'www/css/android.css': 'src/sass/android.scss',
          'www/css/jellyBean.css': 'src/sass/jellyBean.scss'
        }
      }
    },
    handlebars: {
      compile: {
        options: {
          namespace: 'JST',
          amd: ['handlebars', 'js/applicationUtilities/handlebarsHelpers']
        },
        files: {
          'www/templates/compiledTemplates.js': ['www/templates/*.hbs', 'www/templates/*/*.hbs']
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          mainConfigFile: 'www/js/config.js',
          baseUrl: 'www/js',
          include: ['config'],
          name: 'config',
          out: 'www/js/app.min.js'
        }
      }
    },
    'regex-replace': {
      all: {
        src: ['www/js/applicationUtilities/apiClient.js'],
        actions: [{
          name: 'define-environment',
          search: '// @environment',
          replace: 'var environment = \'' + environment + '\'',
          flags: 'g'
        }]
      },
      dev: {
        src: ['www/templates/compiledTemplates.js', 'www/js/applicationUtilities/apiClient.js'],
        actions: [{
          name: 'replace-www',
          search: 'www/',
          replace: '',
          flags: 'g'
        }, defineEnvTask]
      },
      staging: {
        src: ['www/templates/compiledTemplates.js', 'www/js/index.js', 'www/js/applicationUtilities/apiClient.js'],
        actions: [{
          name: 'replace-www',
          search: 'www/',
          replace: '',
          flags: 'g'
        }, {
          name: 'replace-raven',
          search: '// @sentry code',
          replace: 'Raven.config(\'https://6a091a9f0ce64ec59d1e4f1678827f3b@sentry.io/98590\', { release: ver, environment: \'' + environment + '\' }).install();',
          flags: 'g'
        }, defineEnvTask]
      },
      production: {
        src: ['www/templates/compiledTemplates.js', 'www/js/index.js', 'www/js/views/landingPageView.js', 'www/js/applicationUtilities/apiClient.js'],
        actions: [{
          name: 'replace-www',
          search: 'www/',
          replace: '',
          flags: 'g'
        }, {
          name: 'replace-raven',
          search: '// @sentry code',
          replace: 'Raven.config(\'https://6a091a9f0ce64ec59d1e4f1678827f3b@sentry.io/98590\', { release: ver, environment: \'' + environment + '\' }).install();',
          flags: 'g'
        }, {
          name: 'replace-mixpanel',
          search: '// @mixpanel',
          replace: '',
          flags: 'g'
        }, defineEnvTask]
      }
    },
    exec: {
      'dev-android': {
        command: 'cordova run android',
        stdout: true,
        stderr: true
      },
      'staging-android': {
        command: 'cordova build android --release --buildConfig=build.json',
        stdout: true,
        stderr: true
      },
      'production-android': {
        command: 'cordova build android --release --buildConfig=build.json',
        stdout: true,
        stderr: true
      },
      'setup-android': {
        command: 'cordova platform add android@6.3.0',
        stdout: true,
        stderr: true
      },
      'dev-windows': {
        command: 'cordova run windows -- --phone',
        stdout: true,
        stderr: true
      },
      'staging-windows': {
        command: 'cordova build windows -- --phone --release --buildConfig=build.json && cordova plugin remove org.jshybugger.cordova',
        stdout: true,
        stderr: true

      },
      'production-windows': {
        command: 'cordova build windows -- --phone --release --buildConfig=build.json',
        stdout: true,
        stderr: true
      },
      'setup-windows': {
        command: 'cordova platform add windows',
        stdout: true,
        stderr: true
      }
    },
    uglify: {
      main: {
        files: {
          'www/js/vendor.min.js': [
            'src/lib/js/lock-9.1.4.min.js', 'src/lib/js/winstore-jscompat.js',
            'src/lib/js/jwt-decode.min.js', 'src/lib/js/fastclick.js',
            'src/js/**/base64Decoder.js', 'src/lib/js/offline.min.js', 'www/js/config-variables.js'
          ]
        }
      }
    },
    processhtml: {
      dev: {
        files: {
          'www/index.html': ['src/index.html']
        }
      },
      staging: {
        files: {
          'www/index.html': ['src/index.html']
        }
      },
      production: {
        files: {
          'www/index.html': ['src/index.html']
        }
      }
    },
    eslint: {
      src: ['src/js/**/*.js'],
      options: {
        configFile: '../.eslintrc'
      }
    },
    scsslint: {
      src: [
        'src/sass/pages/common/*.scss',
        'src/sass/abstracts/*.scss',
        'src/sass/components/*.scss'
      ],
      options: {
        config: '../sass-lint.yml',
        colorizeOutput: true
      }
    },
    'release-it': {
      options: {
        pkgFiles: ['package.json'],
        commitMessage: 'Release %s',
        tagName: '%s',
        tagAnnotation: 'Release %s',
        buildCommand: false
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-regex-replace');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('gruntify-eslint');
  grunt.loadNpmTasks('grunt-release-it');
  grunt.loadNpmTasks('grunt-scss-lint');


  grunt.registerTask('build', [
    // 'eslint',
    // 'scsslint',
    'clean:main',
    'copy:' + environment,
    'copy:main',
    'handlebars',
    'regex-replace:dev',
    'clean:dev',
    'processhtml:dev'
  ]);

  grunt.registerTask('build-android', [
    'build',
    'exec:' + environment + '-android'
  ]);
};
