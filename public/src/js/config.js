/* global requirejs, AmCharts*/

requirejs.config({
  paths: {
    js: '.',
    templates: '../templates',
    jquery: '../lib/js/jquery.min',
    jqueryMobile: '../lib/js/jquery.mobile.custom',
    underscore: '../lib/js/underscore.min',
    backbone: '../lib/js/backbone',
    handlebars: '../lib/js/handlebars',
    marionette: '../lib/js/backbone.marionette.min',
    'backbone.radio': '../lib/js/backbone.radio',
    // date libraries
    moment: '../lib/js/moment',
    humanizeDuration: '../lib/js/humanize-duration',

    ambrosus: '../lib/js/ambrosus.min',
    web3: '../lib/js/web3.min',
    // string manipulation
    string: '../lib/js/string',

    // qr code generation
    qrcode: '../lib/js/jquery.qrcode.min'
  },
  waitSeconds: 0
});
require(['js/index']);
