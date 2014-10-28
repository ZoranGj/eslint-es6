# Avoid overriding init on Ember objects (em-no-init-override)

Overriding init() on Ember object can often have unforeseen consequences

## Rule Details

This rule aims to prevent potential bugs by encouraging the use of the .on('init') hook or setupController() instead of overriding the init method

The following patterns are considered warnings:

```js
var Route = Ember.Route.extend({
    init: function () {
        this.doStuff();
    }
});

var Controller = Ember.Controller.extend({
    init: function () {
        this.doStuff();
    }
});

var View = Ember.View.extend({
    init: function () {
        this.doStuff();
    }
});
```

The following patterns are not warnings:

```js
// instead of overriding Route.init()
var Route = Ember.Route.extend({
    onInit: function () {
        this.doStuff();
    }.on('init')
});

// instead of overriding Controller.init()
var Route = Ember.Route.extend({
    setupController: function (controller) {
        controller.doStuff();
    }
});

// instead of overriding View.init()
var View = Ember.View.extend({
    onInit: function () {
        this.doStuff();
    }.on('init')
});
```

## When Not To Use It

If you feel the need to override init() anyway, make sure to call this._super.apply(this, arguments) somewhere in your method in order to preserve Ember's implementation of that method

