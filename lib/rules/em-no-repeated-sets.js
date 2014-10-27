/**
 * @fileoverview Repeated calls to set() should be replaced with a single call to setProperties()
 * @author Jordan Hawker
 * @copyright 2014 Jordan Hawker. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
    var inFunction = 0,
        mapSets = [];

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Check this node for calls to set and increase the count
     *
     * @param {Node} node The node containing potential calls to set()
     * @returns {void}
     */
    function increaseSets(node) {
        if (inFunction > 0 && mapSets.length > 0) {
            var sets = mapSets[mapSets.length - 1],
                source = context.getSource(node),
                match = source.match(/^([a-zA-Z0-9]*\.)*set\(/),
                objName;
            if (match && match.length) {
                objName = match[0].split(".set(")[0];
                if (!sets[objName]) {
                    sets[objName] = 1;
                } else {
                    sets[objName] += 1;
                }
            }
        }
    }

    /**
     * Add a new hash to the map array for this block
     *
     * @returns {void}
     */
    function startBlock() {
        mapSets.push({});
    }

    /**
     * At the end of each block, check to see if it had any objects with multiple calls to set()
     *
     * @param {Node} node A BlockStatement node
     * @returns {void}
     */
    function endBlock(node) {
        var sets = mapSets.pop(),
            numSets;
        for (var key in sets) {
            if (sets.hasOwnProperty(key)) {
                numSets = sets[key];
                if (numSets > 1) {
                    context.report(node, "Object '{{name}}' has {{numSets}} calls to set().  Please use setProperties() instead.", {
                        name: key,
                        numSets: numSets
                    });
                }
            }
        }
    }

    /**
     * Track whether or not we are inside a function to avoid running the matching regex on large blocks
     *
     * @returns {void}
     */
    function startFunction() {
        inFunction++;
    }

    /**
     * Track whether or not we are inside a function to avoid running the matching regex on large blocks
     *
     * @returns {void}
     */
    function endFunction() {
        inFunction--;
    }


    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "FunctionDeclaration": startFunction,
        "FunctionExpression": startFunction,
        "FunctionDeclaration:exit": endFunction,
        "FunctionExpression:exit": endFunction,
        "BlockStatement": startBlock,
        "BlockStatement:exit": endBlock,
        "CallExpression": increaseSets
    };

};
