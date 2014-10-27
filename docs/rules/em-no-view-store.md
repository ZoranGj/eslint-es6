# Views shouldn't interact with the store (em-no-view-store)

Views should not interact directly with the store, as it violates separation of concerns

## Rule Details

The following patterns are considered warnings:

```js
var View = Ember.View.extend({
    badStore: function () {
        return this.store.find('monkeys');
    },

    otherBadStore: function () {
        var store = this.store;
        return store.find('foo');
    }
});
```

## When Not To Use It

This rule is not applicable to Ember projects that are not utilizing the Ember-Data store
