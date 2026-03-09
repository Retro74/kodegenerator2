// gen17 widgtet object
var gen17 = (function() {

    // settings
    var s = {
        submit: $('#gen17Button'),
        output: $('#gen17Out')
    };

    // self object
    var self = {};


    // bindings
    self.setupBindings = function() {
        s.submit.on('click', function() {
            self.generate();
        });
    };

    //handlers
    self.generate = function() {
        var formatedCode = '&lt?php\n'+
            '<div class="phpComment">    //Denne linjen skriver ut hele oppsettet til PHP på websiden</div>' +
            '<div class="phpComment">    //Legg spesielt merke til <strong>"Loaded Configuration File"</strong>,</div>' +
            '<div class="phpComment">    //at <strong>"output_buffering"</strong> som bør stå til <strong>"4096"</strong></div>' +
            '<div class="phpComment">    //og at <strong>"session.auto_start"</strong> som bør stå til <strong>"On"</strong></div>' +
            '    phpinfo();\n' +
            '?&gt';

        s.output.html(formatedCode);
    };

    // init
    self.init = function() {
        self.setupBindings();
    };

    // return self
    return self;
}());
                
                