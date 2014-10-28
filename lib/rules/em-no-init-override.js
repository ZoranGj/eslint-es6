/**
 * @fileoverview Avoid overriding init on Ember objects
 * @author Jordan Hawker
 * @copyright 2014 Jordan Hawker. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
    var inExtend = false;

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    /**
     * Evaluate the source of a node to find out if it is extending an Ember class
     *
     * @param {Node} node A CallExpression node
     * @returns {boolean} True if the node is extending an Ember class
     */
    function extendingEmberClass(node) {
        var source = context.getSource(node),
            isExtend = source.match(/([a-zA-Z0-9]*\.?)*([rR]oute|[cC]ontroller|[vV]iew|[mM]odel|[mM]ixin|[cC]omponent|[sS]erializer|[aA]dapter|[oO]bject)\.extend\(/);
        return isExtend && isExtend.length;
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "Property": function (node) {
            if (inExtend) {
                var source = context.getSource(node),
                    match = source.match(/^init ?: ?function/);
                if (match && match.length) {
                    context.report(node, "Avoid overriding init.  Please use \"onInit: function() { /* code */ }.on('init')\" or, if this is a controller, call setupController from the associated route.");
                }
            }
        },
        "CallExpression": function (node) {
            if (!inExtend && extendingEmberClass(node)) {
                inExtend = true;
            }
        },
        "CallExpression:exit": function (node) {
            if (inExtend && extendingEmberClass(node)) {
                inExtend = false;
            }
        }
    };

};
