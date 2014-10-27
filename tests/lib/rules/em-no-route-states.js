/**
 * @fileoverview Do not set properties on routes, they should be stateless
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
eslintTester.addRuleTest("lib/rules/em-no-route-states", {

    valid: [
        "var Route = Ember.Route.extend({ f: function () { this.redirect(); } });",
        "var Route = Ember.Route.extend({ f: function () { this.controller.set('foo', 'bar'); } });",
        "var Controller = Ember.Controller.extend({ f: function () { this.set('foo', 'bar'); } });"
    ],

    invalid: [
        { code: "var Route = Ember.Route.extend({ f: function () { this.set('foo', 'bar'); } });", errors: [{ message: "Setting property 'foo' on a route.  Routes should be stateless.", type: "CallExpression" }] },
        { code: "var Route = Ember.Route.extend({ f: function () { var self = this; self.set('foo', 'bar'); } });", errors: [{ message: "Setting property 'foo' on a route.  Routes should be stateless.", type: "CallExpression" }] }
    ]
});
