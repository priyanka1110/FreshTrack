/* eslint-disable */
'use strict';

module.exports = function (context) {
  var fs = require('fs');
  var _ = require('lodash');

  var scheme = 'flowkey';
  var insertIntent = '\n<intent-filter>\n' +
      '   <action android:name="android.nfc.action.NDEF_DISCOVERED" />\n' +
      '   <data android:scheme="vnd.android.nfc" android:host="ext" android:pathPrefix="/infratab.com:"/>\n' +
      '   <category android:name="android.intent.category.DEFAULT" />\n' +
      '</intent-filter>\n';
  var manifestPath = context.opts.projectRoot + '/platforms/android/AndroidManifest.xml';
  var androidManifest = fs.readFileSync(manifestPath).toString();
  if (!androidManifest.includes('android:scheme="' + scheme + '"')) {
      var manifestLines = androidManifest.split(/\r?\n/);
      var lineNo = _.findIndex(manifestLines, function (line) {
          return line.includes('@string/activity_name');
      });
      manifestLines.splice(lineNo + 1, 0, insertIntent);
      fs.writeFileSync(manifestPath, manifestLines.join('\n'));
  }
};
