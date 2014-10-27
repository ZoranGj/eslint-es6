/**
 * @fileoverview Observers watching multiple properties should utilize the Ember run-loop
 * @author Jordan Hawker
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
eslintTester.addRuleTest("lib/rules/em-observer-run-once", {

    valid: [
        "var obj = Ember.Object.extend({ x: function () { this.set('stuff', 'things'); }.observes('foo') });",
        "var obj = Ember.Object.extend({ x: function () { Ember.run.once(this, function () {this.set('stuff', 'things');}); }.observes('foo') });",
        "var obj = Ember.Object.extend({ x: function () { Ember.run.once(this, function () {this.set('stuff', 'things');}); }.observes('foo', 'bar') });",
        "var obj = Ember.Object.extend({ x: function () { Ember.run.once(this, this.xHandler); }.observes('foo', 'bar') });",
        "var obj = Ember.Object.extend({ x: function () { Ember.run.debounce(this, function () {this.set('stuff', 'things');}, 2000); }.observes('foo', 'bar') });",
        "var obj = Ember.Object.extend({ x: function () { this.set('stuff', 'things'); }.observes('foo').on('init') });"
    ],

    invalid: [
        { code: "var obj = Ember.Object.extend({ x: function () { this.set('stuff', 'things'); }.observes('foo', 'bar') });", errors: [{ message: "Observer watching multiple properties without using Ember.run.once", type: "CallExpression" }] },
        { code: "var obj = Ember.Object.extend({ x: function xObserver() { this.set('stuff', 'things'); }.observes('foo', 'bar', 'noms') });", errors: [{ message: "Observer watching multiple properties without using Ember.run.once", type: "CallExpression" }] }
    ]
});
