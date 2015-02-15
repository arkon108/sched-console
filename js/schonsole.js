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
      close_key:    27,  // ESC TODO
    },

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
                    {'schonsole.input':input});
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
                
            /*Rainbow.color(response, 'php', function(styled) {
              jqconsole.Write(styled + '\n', 'jqconsole-output', false);
              startPrompt();
            });*/
            jqconsole.Write(styled + '\n', 'jqconsole-output', false);
            startPrompt();
            
          })
          .fail(function(e) {
            engine.Write('ERROR!\n', 'jqconsole-output');
            startPrompt();
          });
      });
    };

  /*
          
          Reasoning:
            Sometimes we need to quickly prototype a piece of code or just dump some value
            I wished for something like this for years, tried php-i, tried php-a,
            asked Ante, he was using index.php to make sure he doesn't forget to clean up
            Sometimes I just wanted to see if a code idea would work and the upload would take forever
            There is no convention. 
            Introducing: Schonsole 0.1 - The Sched Console
            
            Scope and focus?
              - it's not an editor replacement
            
          Time: 2-3
          -> TODO: clicking on the body hides the console
          -> Sched Console v.0.1 (some useful data?)
          -> Welcome X, 
          -> custom prompts for every superadmin :)
          -> move away if the rich characters mess things up
          //     ☞ ☛ » ✌︎ ⚇ ≫ ⫸ ❱ ⭐️ 😾 💭 🎼 🔜 ►
          - define the continue_label as well
          - Ctrl+H prints help?
          - timeout for requests
          - log commands? load the previous history?
          - time the response time and display as status
          - inspector mode? like, dump globals and shit
          - remembers user's history
          - pretty print for big dumps? convenience function for that?
            
          - move entire JS into a bootstrapping file
            - make script tags for jqconsole
            - ajax call to load up the globals
          - can I get the debug data from the exitCode() or similar shit?
          - syntax highlighting?
            http://craig.is/making/rainbows
            https://highlightjs.org/usage/
            https://code.google.com/p/google-code-prettify/
            http://prismjs.com/
          - safeguard the eval, wrap, establish error handling
          - auto add ;
          - make sure empty doesn't get sent
          - quick 'n' dirty syntax check to prevent syntax errors before sending?
          - autocomplete?
            http://complete-ly.appspot.com/examples/web.browser.console.html
            https://twitter.github.io/typeahead.js/
          - pick up the data about the current page?
          - blinking cursor?
          - TODO: CTRL+F = full screen
          - OMFG collaborative mode!?
            - send a link to Amal, see when he opens it
            - messaging
            - examples I think about when chatting? -> console injection?
            - YES! typing into each other's fucking console!
          - consider making it truly independent, with a PHP endpoint to only be placed somewhere
          - separate github?
          - escape should close too
          - make sure it works on editor too
          - next step Scheditor lol
        */

  S.console = {
    
    exp:{on:on, off:off, isOn:isOn},
    
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
}(Sched || {}));
