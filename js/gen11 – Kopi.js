// gen11 widgtet object
var gen11 = (function() {

    // settings
    var s = {
        valueOrigin: $('#gen11ValueOrigin'),
        value: $('#gen11value'),
        sessionName: $('#gen11SessionName'),
        submit: $('#gen11Button'),
        output: $('#gen11Out')
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

        if(s.valueOrigin.val() === 'value')
            this.formatedCode = self.generateValue();
        else
            this.formatedCode = self.generatePOSTGET();
        //clearing output
        s.output.html('');
        
        // adding output
        s.output.html(this.formatedCode);
    };
    
    
    // members
    self.generateValue = function() {
        var returnText = '&lt?php' +
            '    <div class="phpComment">//Setter en fast øktverdi (Session) som heter '+s.sessionName.val()+'.</div>'+
            '    $_SESSION["' + s.sessionName.val() + '"] = "' + s.value.val() + '";\n'+
            '?&gt';
        return returnText;
    };
    self.generatePOSTGET = function() {
        var returnText = '&lt?php' +
            '    <div class="phpComment">//Setter en øktverdi (Session) som heter ' + s.sessionName.val() + ', hentet fra en HTTP-' +  s.valueOrigin.val().substring(2) +'.</div>'+
            '    $_SESSION["' + s.sessionName.val() + '"] = ' + s.valueOrigin.val() + '["' + s.value.val() + '"];\n'+
            '?&gt';
        return returnText;
    };


    // init
    self.init = function() {
        self.setupBindings();
    };

    // return self
    return self;
}());
                
                