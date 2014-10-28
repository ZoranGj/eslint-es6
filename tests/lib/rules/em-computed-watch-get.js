/**
 * @fileoverview Prevents computed properties from using attributes that are not watched
 * @author Jordan Hawker
 * @copyright 2014 Jordan Hawker. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require("../../../lib/eslint"),
    ESLintTester = require("eslint-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest("lib/rules/em-computed-watch-get", {

    valid: [
        "var obj = Ember.Object.extend({ x: function () { return this.get('foo'); }.property('foo') });"
    ],

    invalid: [
        { code: "var obj = Ember.Object.extend({ x: function () { return this.get('foo') + this.get('bar'); }.property('foo') });", errors: [{ message: "Computed Property gets 'bar' but does not watch it. Please observe all properties accessed by getters.", type: "CallExpression" }] }
    ]
});
