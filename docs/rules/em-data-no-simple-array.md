# Deprecate uses of DS.attr('array') (em-data-no-simple-array)

Adding simple arrays to models via DS.attr('array') is a deprecated pattern.

## Rule Details

The following patterns are considered warnings:

```js
var Model = DS.Model.extend({
    foo: DS.attr('array')
});
```

The following patterns are not warnings:

```js
var Model = DS.Model.extend({
    foo: DS.attr('string')
});
```
