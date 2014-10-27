/**
 * @fileoverview Views shouldn't interact with the store
 * @author Jordan Hawker
 * @copyright 2014 Jordan Hawker. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
    var inView = false;

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Check if this node is a view
     *
     * @param {Node} node The node being evaluated
     * @returns {boolean} True if the node is a View
     */
    function isView(node) {
        var source = context.getSource(node),
            hasMatch = source.match(/^([a-zA-Z0-9]*\.?)*[vV]iew\.extend\(/);
        return hasMatch && hasMatch.length;
    }

    /**
     * Generate a report if this node accesses the store
     *
     * @param {Node} node The node being evaluated
     * @returns {void}
     */
    function checkForStore(node) {
       if (inView) { // Don't bother even running the regex if we're not in a View
            var source = context.getSource(node),
                hasMatch = source.match(/\.store/);
            if (hasMatch && hasMatch.length) {
                context.report(node, "Views shouldn't interact with the store.");
            }
        }
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "VariableDeclaration": checkForStore,
        "CallExpression": function (node) {
            if (!inView && isView(node)) {
                inView = true;
            } else if (inView) {
                checkForStore(node);
            }
        },
        "CallExpression:exit": function (node) {
            if (inView && isView(node)) {
                inView = false;
            }
        }
    };
};
