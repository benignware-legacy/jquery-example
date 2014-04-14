+function ( $, window) {

  var mugine = window.mugine;

  var pluginName = 'example';
  
  var defaults = {
    name: '', 
    className: 'example'
  };
  
  function isCodeTag(elem) {
    return !!(["SCRIPT", "STYLE"].indexOf(elem.nodeName) + 1);
  }
  
  function fixIndent(string) {
    string = string.replace(/^\s*\n/gm, "") ;
    string = string.replace(/(\s+$)/g, '');
    var indent = string.search(/\S/);
    var lines = string.split("\n");
    for (var i = 0, line; line = lines[i]; i++) {
      var regexp = new RegExp("\^\\s\{" + indent + "\}");
      lines[i] = line.replace(regexp, "");
    }
    string = lines.join("\n");
    return string;
  }
  
  function isMarkupNode(elem) {
    return !$(elem).is('script') && !$(elem).is('style') && !isEmptyNode(elem);
  }
  
  function isEmptyNode(elem) {
    return !$(elem).html().trim();
  }
  
  function Example(element, options) {
    
    var name = options.name;
    var matchingExamples = $("*[data-example='" + name + "']");
    
    if ($(element).parents().map(function() {
      return $(this).data('example');
    }).length > 0) return;
    
    var contentElem = $(element).find("*[data-example]")[0] || element;
    var $contentElem = $(contentElem);
    
    var pre = document.createElement('pre');
    pre.className = options.className;
    var clone = $(contentElem.cloneNode(true))
      .removeAttr('data-example')
      .get(0);
    
    var code = isCodeTag(element);
    
    var string = code ? clone.innerHTML : clone.outerHTML;
    string = fixIndent(string);
    
    pre.appendChild(document.createTextNode(string));
    
    var insertPreAt = element;
    
    var prev = $(element).prev();
    if (prev.data(pluginName)) {
      insertPreAt = prev;
    }

    $(pre).insertBefore(insertPreAt);

    if (code && $(clone).attr('type') != 'text/javascript') {
      $(clone).attr('type', 'text/javascript');
      $(clone).insertBefore(element);
    }
   
    if (isMarkupNode(contentElem)) {
      matchingExamples.each(function() {
        if (isEmptyNode(this)) {
          $(this).replaceWith(element);
        }
      });
    }
    
    this.toString = function() {
      return name;
    };
    
  }

  // register component as plugin
  var pluginClass = Example;
  
  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$(this).data(pluginName) || typeof $(this).data(pluginName) == 'string') {
          options = $.extend({}, defaults, options);
          options.name = $(this).data(pluginName);
          $(this).data(pluginName, new pluginClass(this, options));
      }
      return $(this);
    });
  };
  
  $.fn[pluginName].initOnReady = true;
  
  $(function() {
    if ($.fn[pluginName].initOnReady) {
      $('body').find('*[data-example]').example();
    }
  });

}( jQuery, window );