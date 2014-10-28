# Prevents computed properties from using attributes that are not watched (em-computed-watch-get)

## Rule Details

This rule aims to prevent bugs by requiring computed properties to watch all properties being accessed via getters

The following patterns are considered warnings:

```js
var obj = Ember.Object.extend({
    x: function () {
        return this.get('foo') + this.get('bar');
    }.property('foo')
});
```

The following patterns are not warnings:

```js
var obj = Ember.Object.extend({
    x: function () {
        return this.get('foo') + this.get('bar');
    }.property('foo', 'bar')
});
```
