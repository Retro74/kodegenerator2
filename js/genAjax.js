// genAjax widget object
var genAjax = (function () {

    // settings
    var s = {
        phpFile:      $('#genAjaxPhpFile'),
        inputField:   $('#genAjaxInputField'),
        lookupField:  $('#genAjaxLookupField'),
        returnField:  $('#genAjaxReturnField'),
        resultDiv:    $('#genAjaxResultDiv'),
        submit:       $('#genAjaxButton'),
        output:       $('#genAjaxOut')
    };

    var self = {};

    // bindings
    self.setupBindings = function () {
        s.submit.on('click', function () {
            self.generate();
        });
    };

    // handlers
    self.generate = function () {

        var phpFile     = s.phpFile.val().trim();
        var inputField  = s.inputField.val().trim();
        var lookupField = s.lookupField.val().trim();
        var returnField = s.returnField.val().trim();
        var resultDiv   = s.resultDiv.val().trim();

        var code = '';

        // ---- HTML inputfelt ----
        code += '<div class="phpComment">&lt;!-- Husk å legge inn inputfelt for Ajax-oppslag med:\n';
        code += '       id="' + inputField + '"\n';
        code += '       name="' + inputField + '"\n';
        code += '       --&gt;</div>\n\n';

        // ---- Resultdiv ----
        code += '<div class="phpComment">&lt;!-- Og et element som kan vise resultatet med \n';
        code += 'id="' + resultDiv + '"--&gt;</div>\n\n';

        // ---- Resultdiv ----
        code += '<div class="phpComment">&lt;!-- Og en hidden input CSRF-token--&gt;</div>\n\n';

        // ---- JavaScript / jQuery Ajax ----
        code += '<div class="phpComment">&lt;!-- Ajax-kall med jQuery --&gt;</div>\n';
        code += '&lt;script&gt;\n';
        code += '$(document).ready(function () {\n\n';
        code += '    <div class="phpComment">// Kjør Ajax-oppslag når brukeren skriver i inputfeltet</div>\n';
        code += '    $("#' + inputField + '").on("input", function () {\n\n';
        code += '        var verdi = $(this).val().trim();\n\n';
        code += '        <div class="phpComment">// Ikke slå opp hvis feltet er tomt</div>\n';
        code += '        if (verdi === "") {\n';
        code += '            $("#' + resultDiv + '").html("");\n';
        code += '            return;\n';
        code += '        }\n\n';
        code += '        <div class="phpComment">// Send Ajax POST-forespørsel til PHP-siden</div>\n';
        code += '        $.ajax({\n';
        code += '            url:  "' + phpFile + '",\n';
        code += '            type: "POST",\n';
        code += '            data: {\n';
        code += '                ' + lookupField + ': verdi,\n';
        code += '                csrf_token: $("input[name=\'csrf_token\']").val()\n';
        code += '            },\n';
        code += '            dataType: "json",\n\n';
        code += '            success: function (svar) {\n';
        code += '                <div class="phpComment">// Oppdater resultdiven basert på svaret fra PHP</div>\n';
        code += '                if (svar.funnet) {\n';
        code += '                    $("#' + resultDiv + '").html(\n';
        code += '                        "' + lookupField + ' finnes. ' + returnField + ': " + svar.' + returnField + '\n';
        code += '                    );\n';
        code += '                } else {\n';
        code += '                    $("#' + resultDiv + '").html("' + lookupField + ' ble ikke funnet.");\n';
        code += '                }\n';
        code += '            },\n\n';
        code += '            error: function () {\n';
        code += '                $("#' + resultDiv + '").html("Feil ved oppslag. Prøv igjen.");\n';
        code += '            }\n';
        code += '        });\n';
        code += '    });\n';
        code += '});\n';
        code += '&lt;/script&gt;';

        // Output
        s.output.html('');
        s.output.html(code);
    };

    // init
    self.init = function () {
        self.setupBindings();
    };

    return self;
}());
