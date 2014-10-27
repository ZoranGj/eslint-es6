/**
 * @fileoverview Repeated calls to set() should be replaced with a single call to setProperties()
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
eslintTester.addRuleTest("lib/rules/em-no-repeated-sets", {

    valid: [
        "function f() { this.set('foo', 'bar'); }",
        "function f() { this.set('foo', 'bar'); this.router.set('things', 'stuff'); }",
        "function f() { if (this.get('foo')) { this.set('bar', 'stuff'); } else { this.set('things', 'stuff'); } }",
        "function f() { if (this.get('foo')) { this.set('bar', 'stuff'); } this.set('things', 'stuff'); }",
        "function f() { var router = this.router; function doStuff() { router.set('bar', 'stuff'); } router.set('things', 'stuff'); if (this.get('foo')) { doStuff(); } }"
    ],

    invalid: [
        { code: "function f() { this.set('foo', 'bar'); this.set('things', 'stuff'); }", errors: [{ message: "Object 'this' has 2 calls to set().  Please use setProperties() instead.", type: "BlockStatement" }] },
        { code: "function f() { this.set('foo', 'bar'); this.router.set('things', 'stuff'); this.set('monkey', 'bars'); this.router.set('bar', 'foo'); }", errors: [
            { message: "Object 'this' has 2 calls to set().  Please use setProperties() instead.", type: "BlockStatement" },
            { message: "Object 'this.router' has 2 calls to set().  Please use setProperties() instead.", type: "BlockStatement" }
        ] },
        { code: "function f() { var router = this.router; function doStuff() { router.set('bar', 'stuff'); router.set('stuff', 'things'); } router.set('things', 'stuff'); router.set('foo', 'bar'); if (this.get('foo')) { doStuff(); } }", errors: [
            { message: "Object 'router' has 2 calls to set().  Please use setProperties() instead.", type: "BlockStatement" },
            { message: "Object 'router' has 2 calls to set().  Please use setProperties() instead.", type: "BlockStatement" }
        ] }
    ]
});
