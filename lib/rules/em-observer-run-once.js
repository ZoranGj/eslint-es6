/**
 * @fileoverview Observers watching multiple properties should utilize the Ember run-loop
 * @author Jordan Hawker
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
        "CallExpression": function (node) {
            var source = context.getSource(node),
                isObserver = source.match(/function \(\) \{[\s\S]*}\.observes\((['"][a-zA-Z0-9]*['"](, )?)+\),?/);
            if (node.parent.type === "Property" && isObserver && isObserver.length) { // This node is an observer
                var props = source.split(".observes(")[1].split(")")[0];
                if (props.split(",").length > 1) { // More than one property being observed
                    var hasRunOnce = source.match(/Ember\.run\.(once|debounce)\(/);
                    if (!(hasRunOnce && hasRunOnce.length)) {
                        context.report(node, "Observer watching multiple properties without using Ember.run.once");
                    }
                }
            }
        }
    };
};
