var assert = require("assert");
var generator = require("../bin/ssg");
var docpad = require('docpad');

var docpadInstanceConfiguration = {};

describe('static site namespace', function(){
  describe('site generator', function(){
    it('a site object should exist', function(){
      var site = generator.static_site;
      assert(site);
    })

    it('site options should be set', function(){
      var site = generator.static_site;
      var testOpts = {
        text: 'here is some **markdown**',
        filename:'markdown',
        renderSingleExtensions:true
      };
      site.setOpts(testOpts);
      assert.deepEqual(testOpts, site.getOpts())
  })
})
})