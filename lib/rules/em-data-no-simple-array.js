/**
 * @fileoverview Deprecate uses of DS.attr('array')
 * @author Jordan Hawker
 * @copyright 2014 Jordan Hawker. All rights reserved.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "Property": function (node) {
            var source = context.getSource(node),
                match = source.match(/DS\.attr\(['"]array['"]\)/);
            if (match && match.length) {
                context.report(node, "Deprecated use of DS.attr('array').");
            }
        }
    };
};
