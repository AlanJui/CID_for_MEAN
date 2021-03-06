// Karma configuration
// Generated on Wed Nov 02 2016 12:56:06 GMT+0800 (CST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    plugins: [
      require('karma-jasmine'),
      require('karma-spec-reporter'),
      require('karma-chrome-launcher'),
      require('karma-phantomjs-launcher'),
      require('karma-script-launcher'),
      require('karma-coverage')
    ],

    coverageReporter: {
      reporters: [
        {
          type: 'html', // produces a html document after code is run
          subdir: 'public'
        },
        {
          type: 'json',
          subdir: '.',
          file: 'client-coverage.json'
        }
      ],
      dir: 'coverage/'   // path to created html doc
    },

    // list of files / patterns to load in the browser
    files: [
      'public/bower_components/angular/angular.js',
      'public/bower_components/angular-mocks/angular-mocks.js',
      'public/bower_components/angular-resource/angular-resource.js',
      'public/bower_components/angular-ui-router/release/angular-ui-router.js',
      'public/bower_components/jquery/dist/jquery.js',
      'test/app-test-init.js',
      'public/scripts/**/*.js',
      'test/client/**/*.js'
    ],

    // list of files to exclude
    exclude: [
      // 'public/scripts/app.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // reporters: ['progress'],
    reporters: ['spec', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // browsers: ['Chrome'],
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    // singleRun: false,
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
};

