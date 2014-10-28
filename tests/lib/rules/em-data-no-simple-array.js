/**
 * @fileoverview Deprecate uses of DS.attr('array')
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
eslintTester.addRuleTest("lib/rules/em-data-no-simple-array", {

    valid: [
        "var Model = DS.Model.extend({ foo: DS.attr('string') });"
    ],

    invalid: [
        {
            code: "var Model = DS.Model.extend({ foo: DS.attr('array') });",
            errors: [{
                message: "Deprecated use of DS.attr('array').",
                type: "Property"
            }]
        }
    ]
});
