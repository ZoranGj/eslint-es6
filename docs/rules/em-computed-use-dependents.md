# Disallow watching of unused attributes by computed properties (em-computed-use-dependents)

## Rule Details

This rule aims to prevent computed properties from being re-evaluated unnecessarily by removing unused watched properties.

The following patterns are considered warnings:

```js
var obj = Ember.Object.extend({
    x: function () {
        return this.get('foo');
    }.property('foo', 'bar')
});
```

The following patterns are not warnings:

```js
var obj = Ember.Object.extend({
    x: function () {
        return this.get('foo');
    }.property('foo')
});
```
