# Observers watching multiple properties should utilize the Ember run-loop (em-observer-run-once)

If an Observer is watching multiple properties, its code can be fired multiple times in succession if multiple properties are changed, causing unwanted results.
By wrapping the functionality in Ember.run.once, we allow the run-loop to catch any changes to the properties and fire them all together on the observer.

## Rule Details

The following patterns are considered warnings:

```js
badObserver: function () {
    this.set('stuff', 'things');
}.observes('foo', 'bar'),

```

The following patterns are not warnings:

```js
singleObserver: function () {
    this.set('foo', this.get('bar'));
}.observes('bar'),

goodObserver: function () {
    Ember.run.once(this, function () {
        this.set('stuff', 'things');
    });
}.observes('foo', 'bar')

debounceObserver: function () {
    Ember.run.debounce(this, function () {
        this.set('stuff', 'things');
    }, 2000);
}.observes('foo', 'bar'),

betterObserver: function () {
    Ember.run.once(this, this.betterHandler);
}.observes('foo', 'bar'),
betterHandler: function () {
    this.set('stuff', 'things');
}
```
