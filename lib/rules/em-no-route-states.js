/**
 * @fileoverview Do not set properties on routes, they should be stateless
 * @author Jordan Hawker
 * @copyright 2014 Jordan Hawker. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
    var sets = [],
        inRoute = false;

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    function isRoute(node) {
        var source = context.getSource(node),
            hasMatch = source.match(/^([a-zA-Z0-9]*\.?)*[rR]oute\.extend\(/);
        return hasMatch && hasMatch.length;
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "CallExpression": function (node) {
            if (!inRoute && isRoute(node)) {
                inRoute = true;
                sets = [];
            } else if (inRoute) {
                var match = context.getSource(node).match(/^(this|self)\.set\(['"][a-zA-Z0-9]*['"],/);
                if (match && match.length) {
                    sets.push(match[0].split("set(")[1].split(")")[0].split(",")[0].replace(/['"]/g, "").trim());
                }
            }
        },
        "CallExpression:exit": function(node) {
            if (inRoute && isRoute(node)) {
                var length = sets.length;
                if (length) {
                    for (var i = 0; i < length; i++) {
                        context.report(node, "Setting property '{{prop}}' on a route.  Routes should be stateless.", { prop: sets[i] });
                    }
                }
                sets = [];
                inRoute = false;
            }
        }
    };
};
