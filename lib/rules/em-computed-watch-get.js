/**
 * @fileoverview Prevents computed properties from using attributes that are not watched
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
     * @param {Node} node A CallExpression node
     * @returns {boolean} True if the node is a computed property
     */
    function isComputed(node) {
        var source = context.getSource(node),
            match = source.match(/function \(\) \{[\s\S]*}\.property\((['"]([a-zA-Z0-9]*\.?(@each\.|\.\[])?)*['"](, )?)*\),?/);
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
                        return item.replace(/['"]/g, "").replace(/\.\[]/, "").trim();
                    }),
                    found, get, i, j;
                for (i = 0; i < gets.length; i++) {
                    found = false;
                    get = gets[i];
                    for (j = 0; j < props.length; j++) {
                        if (get === props[j]) {
                            found = true;
                        }
                    }
                    if (!found) {
                        context.report(node, "Computed Property gets '{{prop}}' but does not watch it. Please observe all properties accessed by getters.", { prop: get });
                    }
                }
                gets = [];
                inComputedProperty = false;
            }
        }
    };
};
