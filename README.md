jquery-example
==============

Quickly create html inline examples


Usage
-----

Declare any script-, style- or markup-block as an example by adding a data-example-attribute with an identifier to the corresponding element.

```
<script data-example="example1" type="text/javascript">
  // your working script here
  $(function() {
    $("#div").doSomethingCool();
  });
</script>
```

```
<style data-example="example1">
  /* your working style declarations here */
  #div {
    ...
  }
</style>
```

```
<div id="div" data-example="example1">Hello, I'm a div</div>
```

The provided code will be inserted as a pre-tag in place.

You can customize the insertion point of your original working demo by specifying 'before' or 'after' on the 'example-insert'-data-attribute. Defaults to 'after'.
```
<div id="div" data-example="example1" data-example-insert="before">Hello, I'm a div</div>
```

#### Manually initialize the example-plugin
By default, jquery-example auto-initializes examples on document.ready. If you don't want this behavior, you can switch it off by setting the "initOnReady"-Option directly after the script is loaded:
```
$.fn['example'].initOnReady = false;
```

You'll then need to initialize example-elements on your own: 
```
$(function() {
  $("*[data-example]").example();
});

```

