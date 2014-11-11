Package.describe({
  name: 'electricjesus:blocky',
  summary: 'Easy and editable CMS blocks for Meteor',
  version: '0.1.0',
  git: 'https://github.com/electricjesus/meteor-blocky'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.1.1');
  api.use(['meteor','mongo','mongo-livedata'],['client','server']);
  api.use(['templating'], 'client');
  api.addFiles('electricjesus:blocky-common.js',['client','server']);
  api.addFiles('electricjesus:blocky-server.js','server');
  api.addFiles([
  	'electricjesus:blocky.js',
  	'electricjesus:blocky.html'
  ],'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('electricjesus:blocky');
  api.addFiles('electricjesus:blocky-tests.js');
});