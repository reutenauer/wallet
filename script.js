(function($) {
  $.fn.oas_mailto = function(options) {
    var defaults = {dot : '-dot-', at : '-at-'},
      option= $.extend({ }, defaults, options);

    return this.each(function() {
      var $this = $(this);
      var dot = option.dot; var at=option.at;
      var OldText = $this.text();
      var NewText = '';
      var WhiteSpace = new RegExp("\\s", "g");
      OldText = OldText.replace(WhiteSpace,"");
      var Pattern = "\\b[\\w]+" + at + "[\\w]+" + dot + "[\\w]+";
      var RegPattern = new RegExp(Pattern, "g");
      var DotReg = new RegExp(dot, "g");
      if(RegPattern.test(OldText)) {
        NewText = OldText.replace(at, "@");
        NewText = NewText.replace(DotReg, ".");
        $this.html("<a href=\"mailto:" + NewText + "\">" + NewText + "</a>");
      }
    });
  };
})(jQuery);

function getAnchor(url) {
  if(url.search(/\#/) > 0) {
    var StrAnchor = url.split('#');
    var Result = StrAnchor[1];
    var RegPattern = new RegExp("^\\d");

    if(RegPattern.test(Result)) {
      if(Result.search(/\./)>0) {
        var Dec = Result.split('.');
        Result='section-' + Dec[0];
      } else
        Result='section-'+Result;
    }

    return Result;
  } else
    return false;
  }

function activeFilter(filtered) {
  $('#tab-menu li').removeClass('active-tab');
  $("#tab-menu a[href='" + filtered + "']").parents('li').addClass('active-tab');
}

function tabs(anc) {
  $("div.section").hide().filter(anc).show();
  activeFilter(anc);
}

function Chapter(Result) {
  var RegPattern = new RegExp("^\\d");
  if(RegPattern.test(Result)) {
    if(Result.search(/\./) > 0) {
      var Dec = Result.split('.');
      Result = Dec[0];
    }
  }

  return Result;
}

function autoHeight() {
  var BrowserView = $(window).height();
  var Manual = BrowserView - 170;
  if(Manual < 250)
    Manual = 250;

  var wrapper=$('#sections').height(Manual);
}

$(function() {
  $('#toc a').click(function() {
    var anc = $(this).attr('href');
    var tab = parseInt(anc.substr(1));
    tabs('#section-'+tab);
  });

  $('#tab-menu a').click(function() {
    var anc=$(this).attr('href');
    tabs(anc);
  });

  var CurrentURL = document.location.href;
  if(CurrentURL) {
    var Anchor = getAnchor(CurrentURL);
    if(Anchor)
      tabs('#'+Anchor);
    else
      tabs('#section-0');
  } else
    tabs('#section-0');

  autoHeight();
  $("#email").oas_mailto();});
  $(window).resize(function() {
    autoHeight();
});
