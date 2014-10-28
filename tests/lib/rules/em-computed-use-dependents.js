/**
 * @fileoverview Disallow watching of unused attributes by computed properties
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
eslintTester.addRuleTest("lib/rules/em-computed-use-dependents", {

    valid: [
        "var obj = Ember.Object.extend({ x: function () { return this.get('foo'); }.property('foo') });"
    ],

    invalid: [
        { code: "var obj = Ember.Object.extend({ x: function () { return this.get('foo'); }.property('foo', 'bar') });", errors: [{ message: "Computed Property watches 'bar' but does not use it. Unused dependencies are unnecessary.", type: "CallExpression" }] }
    ]
});
