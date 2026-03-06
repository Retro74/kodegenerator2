// gen3_2 widget object (revidert hybrid-versjon)
var gen3_2 = (function () {

    var s = {
        sql: $('#gen3_2SQL'),
        values: $('#gen3_2Value'),
        type: $('#gen3_2Type'),
        submit: $('#gen3_2Button'),
        output: $('#gen3_2Out')
    };

    var self = {};

    self.setupBindings = function () {
        s.submit.on('click', self.generate);
    };

    self.generate = function () {

        var sql    = (s.sql.val()    || "").trim();
        var type   = s.type.val();  // GET / POST / SESSION
        var fields = s.values.val().split(",").map(v => v.trim());

        // Lag like mange ? som variabler
        // Elevene må skrive %s i SQL i dag – men vi oversetter til ?
        // (f.eks. 3 verdier: "?,?,?")
        var placeholders = fields.map(() => "?").join(", ");

        // Erstatt alle '%s' i SQL med '?'
        // Lite hack, men viktig for retro-kompatibilitet
        sql = sql.replace(/%s/g, "?");

        // Typestreng — antall parametre, alle i denne generatoren er strenger
        var types = "s".repeat(fields.length);

        // PHP-kode
        var php = `<?php
                // Forberedt spørring med flere parametere
                $stmt = $tilkobling->prepare("${sql}");
                if(!$stmt){
                    die("Prepare-feil: " . $tilkobling->error);
                }

                // Bind-verdier
                $stmt->bind_param(
                    "${types}",
                ${fields.map(f => `    $_${type}["${f}"]`).join(",\n")}
                );

                $stmt->execute();
                $datasett = $stmt->get_result();

                if(!$datasett){
                    die("SQL-feil: " . $tilkobling->error);
                }
                ?>`;

        s.output.text(php);
    };

    self.init = function () {
        self.setupBindings();
    };

    return self;

}());