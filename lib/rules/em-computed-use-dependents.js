/**
 * @fileoverview Disallow watching of unused attributes by computed properties
 * @author Jordan Hawker
 * @copyright 2014 Jordan Hawker. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
    var gets = [],
        inComputedProperty = false;

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Evaluate the source of a node to see if it is a computed property
     *
     * @param {Node} node A CallExpressionNode
     * @returns {boolean} True if node is a computed property
     */
    function isComputed(node) {
        var source = context.getSource(node),
            match = source.match(/function \(\) \{[\s\S]*}\.property\((['"]([a-zA-Z0-9]*\.?(@each\.|\.\[\])?)*['"](, )?)*\),?/);
        return node.parent.type === "Property" && match && match.length;
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "CallExpression": function (node) {
            if (!inComputedProperty && isComputed(node)) {
                inComputedProperty = true;
                gets = [];
            } else if (inComputedProperty) {
                var source = context.getSource(node),
                    getMatch = source.match(/^([a-zA-Z0-9]*\.)*get\((['"]([a-zA-Z0-9]*\.?)*['"])*\)[,;]?/);
                if (getMatch && getMatch.length) {
                    gets.push(getMatch[0].split("get(")[1].split(")")[0].replace(/['"]/g, "").trim());
                }
            }
        },
        "CallExpression:exit": function(node) {
            if (inComputedProperty && isComputed(node)) {
                var source = context.getSource(node),
                    props = source.split(".property(")[1].split(")")[0].split(",").map(function(item) {
                        return item.replace(/['"]/g, "").replace(/\.\[\]/, "").trim();
                    }),
                    found, prop, i, j;
                for (i = 0; i < props.length; i++) {
                    found = false;
                    prop = props[i];
                    for (j = 0; j < gets.length; j++) {
                        if (prop === gets[j] || prop === "") {
                            found = true;
                        }
                    }
                    if (!found) {
                        context.report(node, "Computed Property watches '{{prop}}' but does not use it. Unused dependencies are unnecessary.", { prop: prop });
                    }
                }
                gets = [];
                inComputedProperty = false;
            }
        }
    };
};
