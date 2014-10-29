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
    var inRoute = false;

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Evaluate the source of a node to find out if it is a Route
     *
     * @param {Node} node A CallExpression node
     * @returns {boolean} True if the node is a route
     */
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
            } else if (inRoute) {
                var match = context.getSource(node).match(/^(this|self)\.set\(['"][a-zA-Z0-9]*['"],/);
                if (match && match.length) {
                    var prop = match[0].split("set(")[1].split(")")[0].split(",")[0].replace(/['"]/g, "").trim();
                    context.report(node, "Setting property '{{prop}}' on a route.  Routes should be stateless.", { prop: prop });
                }
            }
        },
        "CallExpression:exit": function(node) {
            if (inRoute && isRoute(node)) {
                inRoute = false;
            }
        }
    };
};
