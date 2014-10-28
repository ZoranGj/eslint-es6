/**
 * @fileoverview Avoid overriding init on Ember objects
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
eslintTester.addRuleTest("lib/rules/em-no-init-override", {

    valid: [
        "var Random = SomeClass.extend({ init: function () { this.redirect(); } });",
        "var View = Ember.View.extend({ onInit: function () { this.doStuff(); }.on('init') });",
        "var Route = Ember.Route.extend({ setupController: function (controller) { controller.set('foo', 'bar'); } });",
        "var Controller = Ember.Controller.extend({ f: function () { this.doStuff(); } });"
    ],

    invalid: [
        { code: "var Route = Ember.Route.extend({ init: function () { this.redirect(); } });", errors: [{ message: "Avoid overriding init.  Please use \"onInit: function() { /* code */ }.on('init')\" or, if this is a controller, call setupController from the associated route.", type: "Property" }] },
        { code: "var Controller = Ember.Controller.extend({ init: function () { this.doStuff(); } });", errors: [{ message: "Avoid overriding init.  Please use \"onInit: function() { /* code */ }.on('init')\" or, if this is a controller, call setupController from the associated route.", type: "Property" }] },
        { code: "var Model = Ember.Model.extend({ init: function () { this.doStuff(); } });", errors: [{ message: "Avoid overriding init.  Please use \"onInit: function() { /* code */ }.on('init')\" or, if this is a controller, call setupController from the associated route.", type: "Property" }] },
        { code: "var Mixin = Ember.Mixin.extend({ init: function () { this.doStuff(); } });", errors: [{ message: "Avoid overriding init.  Please use \"onInit: function() { /* code */ }.on('init')\" or, if this is a controller, call setupController from the associated route.", type: "Property" }] },
        { code: "var View = Ember.View.extend({ init: function () { this.doStuff(); } });", errors: [{ message: "Avoid overriding init.  Please use \"onInit: function() { /* code */ }.on('init')\" or, if this is a controller, call setupController from the associated route.", type: "Property" }] },
        { code: "var Component = Ember.Component.extend({ init: function () { this.doStuff(); } });", errors: [{ message: "Avoid overriding init.  Please use \"onInit: function() { /* code */ }.on('init')\" or, if this is a controller, call setupController from the associated route.", type: "Property" }] },
        { code: "var Object = Ember.Object.extend({ init: function () { this.doStuff(); } });", errors: [{ message: "Avoid overriding init.  Please use \"onInit: function() { /* code */ }.on('init')\" or, if this is a controller, call setupController from the associated route.", type: "Property" }] },
        { code: "var Serializer = DS.Serializer.extend({ init: function () { this.doStuff(); } });", errors: [{ message: "Avoid overriding init.  Please use \"onInit: function() { /* code */ }.on('init')\" or, if this is a controller, call setupController from the associated route.", type: "Property" }] },
        { code: "var Adapter = DS.Adapter.extend({ init: function () { this.doStuff(); } });", errors: [{ message: "Avoid overriding init.  Please use \"onInit: function() { /* code */ }.on('init')\" or, if this is a controller, call setupController from the associated route.", type: "Property" }] }
    ]
});
