/**
 * @fileoverview Views shouldn't interact with the store
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
eslintTester.addRuleTest("lib/rules/em-no-view-store", {

    valid: [
        "var View = Ember.View.extend({ notStore: function () { this.set('foo', 'bar'); } });",
        "var Route = Ember.Route.extend({ model: function () { return this.store.find('foo'); } });"
    ],

    invalid: [
        { code: "var View = Ember.View.extend({ badStore: function () { return this.store.find('foo'); } });", errors: [{ message: "Views shouldn't interact with the store.", type: "CallExpression" }] },
        { code: "var View = Ember.View.extend({ badStore: function () { var store = this.store; return store.find('foo'); } });", errors: [{ message: "Views shouldn't interact with the store.", type: "VariableDeclaration" }] }
    ]
});
