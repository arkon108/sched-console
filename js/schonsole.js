/* Sched Module Augmentation */
// Sched console
// uses: jquery, jqconsole, rainbow
var Sched = (function (S) {

    // configuration defaults
    // TODO: describe each
    var defaults = {
      container:    '#schonsole',
      welcome:      'Hello!\n',
      prompt:        '>>>',
      prompt_next:  undefined,
      endpoint:     '',
      toggle_key:   "`", // tilde key,
      close_key:    27,  // ESC key will close the console
    };

    // private methods
    var on = function() {
      $(S.console.config.container).addClass('show');
      S.console.engine.Focus();
    }
    
    var off = function() {
      $(S.console.config.container).removeClass('show');
    }
    
    var isOn = function() {
      return $(S.console.config.container).hasClass('show');
    }
    
    var toggle = function() {
      if (isOn()) { 
        return off();
      }
      return on();
    }
    
    var run = function(input) {
      return $.post(S.console.config.endpoint, 
                    {'schonsole_input':input});
    }
    
    // accept the custom configuration
    // return the augmented complete config
    // FIXME: define and check for minimum config (endpoint?)
    var configure = function(custom) {
      var ret = $.extend({}, defaults, custom);
      return ret;
    }
    
    
    var watch = function() {
      var toggleKey = S.console.config.toggle_key.charCodeAt(0);
      var escKey    = S.console.config.close_key;
      
      // Toggle
      $(document).keypress(function(e) {
        var pressed = e.charCode;
        if (pressed == toggleKey) {
          e.preventDefault();
          e.stopPropagation();
          toggle(); 
        }
      });
      // Escape
      $(document).keyup(function(e) {
        var pressed = e.keyCode || e.which;
        if (pressed == escKey) {
          e.preventDefault();
          e.stopPropagation();
          off();
        }
      }
     );
    }

    var startPrompt = function () {
      var engine = S.console.engine;
      
      engine.Prompt(true, function (input) {
        var _input = input;
        
        run(input)
          .done(function(response) {
            console.log(response);
                
            jqconsole.Write(response + '\n', 'jqconsole-output', false);
            startPrompt();
            
          })
          .fail(function(e) {
            engine.Write('ERROR!\n', 'jqconsole-output');
            startPrompt();
          });
      });
    };

  S.console = {
    
    engage: function() {
      var that    = this;
      var me      = 'js/schonsole.js';
      var $script = $(['script[src*="',me,'"]'].join(''));
      var base    = $script.attr('src').substr(0, $script.attr('src').indexOf(me));
      var cssFile = ['<link rel="stylesheet" href="',base,'css/schonsole.css" type="text/css" />'].join('');
      
      $(cssFile).insertAfter($script);
      $('<div id='+that.config.container+'</div>').insertAfter($script);
      
      $.getScript( base+'js/jqconsole.js' )
        .done(function( script, textStatus ) {
          that.start(window.schonsole_config || {});


        })
        .fail(function( jqxhr, settings, exception ) {
          console.log('Failed to load Sched Console');
      });
    },
    
    // populated at runtime
    config: {},
    
    // jqconsole object is accessible from outside
    // once it's initialized and set here
    engine: false,
  
    start: function(setup) {
      var that = this;
      that.config = configure(setup);
      // react to keypresses
      watch();
      that.engine 
      = jqconsole 
      = $(that.config.container)
        .jqconsole(that.config.welcome, 
                   that.config.prompt, 
                   that.config.prompt_next);
      
      startPrompt();
    },
    
  };
  
  return S;
}(Sched || {})).console.engage();