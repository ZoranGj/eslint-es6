# Repeated calls to set() should be replaced with a single call to setProperties() (em-no-repeated-sets)

Multiple calls to set() on the same object can potentially trigger computed properties and observers multiple times, causing unwanted side effects.  The setProperties() method exists specifically to avoid this run-loop issue by setting all the properties before triggering any events based on the changes.

## Rule Details

The following patterns are considered warnings:

```js
function () {
    this.set('foo', 'bar');
    this.set('things', 'stuff');
}

function () {
    this.set('foo', 'bar');
    this.router.set('things', 'stuff');
    this.set('monkey', 'bars');
    this.router.set('bar', 'foo');
}

// Throws two separate errors
function () {
    var router = this.router;
    function doStuff() {
        router.set('foo', 'bar');
        router.set('bar', 'foo');
    }
    router.set('stuff', 'things');
    router.set('things', 'stuff');

    if (this.get('foo')) {
        doStuff();
    }
}
```

The following patterns are not warnings:

```js
function () {
    this.set('foo', 'bar');
    this.router.set('things', 'stuff');
}

function () {
    if (this.get('foo')) {
        this.set('bar', 'stuff');
    } else {
        this.set('things', 'stuff');
    }
}

function () {
    this.set('foo', 'bar');
    if (this.get('bar')) {
        this.set('things', 'stuff');
    }
}

function () {
    var router = this.router;
    function doStuff() {
        router.set('foo', 'bar');
    }
        router.set('stuff', 'things');

    if (this.get('foo')) {
        doStuff();
    }
}
```

## When Not To Use It

A possible exception to this rule is if you are using a boolean property as a locking mechanism (isSaving, isRefreshing, isLoading, etc) and set() it twice within the same code block (flipping true/false values).  

In cases like this, just use eslint-disable to turn off the rule temporarily for that code block.