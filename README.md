jquery-example
==============

Quickly create html inline examples


Basic usage
-----------

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

You can customize the insertion point of your original working demo by adding an empty example-element targeting the example group identifier like this:
```
<div data-example="example1"></div>
```