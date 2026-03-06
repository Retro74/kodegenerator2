// gen4_2 widget object (REVIDERT, SIKKER OG FUNGERENDE VERSJON)
var gen4_2 = (function () {

    var s = {
        tabellNavn: $('#gen4_2tabellNavn'),
        fields: $('#gen4_2Fields'),
        pk_field: $('#gen4_2PK_Field'),
        chb_insert: $('#gen4_2chb_insert'),
        chb_update: $('#gen4_2chb_update'),
        chb_delete: $('#gen4_2chb_delete'),
        submit: $('#gen4_2Button'),
        output: $('#gen4_2Out')
    };

    var self = {};

    self.setupBindings = function () {
        s.submit.on('click', self.generate);
    };

    self.generate = function () {

        let table = s.tabellNavn.val().trim();
        let fields = s.fields.val().split(',').map(f => f.trim());
        let pk = s.pk_field.val().trim();

        let placeholders = fields.map(() => "?").join(", ");
        let updateSet = fields.map(f => `${f} = ?`).join(", ");

        let php = `<?php

// --------------- INSERT -------------------------------------
if (isset($_GET["command"]) && $_GET["command"] === "insert") {

    $stmt = $tilkobling->prepare("INSERT INTO ${table} (${fields.join(", ")}) VALUES (${placeholders})");
    if (!$stmt) { die("Prepare-feil: " . $tilkobling->error); }

    $stmt->bind_param("${"s".repeat(fields.length)}",
${fields.map(f => `        $_GET["${f}"]`).join(",\n")}
    );

    $stmt->execute();
    $stmt->close();
}


// --------------- UPDATE -------------------------------------
if (isset($_GET["command"]) && $_GET["command"] === "do_update") {

    $stmt = $tilkobling->prepare("UPDATE ${table} SET ${updateSet} WHERE ${pk} = ?");
    if (!$stmt) { die("Prepare-feil: " . $tilkobling->error); }

    $stmt->bind_param("${"s".repeat(fields.length)}s",
${fields.map(f => `        $_GET["${f}"]`).join(",\n")},
        $_GET["${pk}"]
    );

    $stmt->execute();
    $stmt->close();
}


// --------------- DELETE --------------------------------------
if (isset($_GET["command"]) && $_GET["command"] === "delete") {

    $stmt = $tilkobling->prepare("DELETE FROM ${table} WHERE ${pk} = ?");
    if (!$stmt) { die("Prepare-feil: " . $tilkobling->error); }

    $stmt->bind_param("s", $_GET["${pk}"]);
    $stmt->execute();
    $stmt->close();
}


// --------------- SELECT --------------------------------------
$stmt = $tilkobling->prepare("SELECT ${fields.join(", ")}, ${pk} FROM ${table}");
$stmt->execute();
$datasett = $stmt->get_result();
?>

<!-- -----------------------------------------------------------
     TABELLVISNING MED INLINE OPPDATERING (REDIGERING)
     Alle verdier vises XSS-sikkert med htmlspecialchars()
------------------------------------------------------------ -->

<table border="1">
    <tr>
${fields.map(f => `        <th>${f.charAt(0).toUpperCase() + f.slice(1)}</th>`).join("\n")}
        <th>${pk}</th>
        ${s.chb_update.is(":checked") ? "<th>Rediger</th>" : ""}
        ${s.chb_delete.is(":checked") ? "<th>Slett</th>" : ""}
    </tr>

<?php while ($rad = $datasett->fetch_assoc()) { ?>
    <tr>
        <form method="GET">
            <input type="hidden" name="command" value="do_update">
            <input type="hidden" name="${pk}" value="<?= htmlspecialchars($rad["${pk}"], ENT_QUOTES) ?>">

<?php foreach([${fields.map(f => `"${f}"`).join(", ")}] as $felt): ?>

    <?php if (isset($_GET["command"]) 
              && $_GET["command"] === "update"
              && $_GET["${pk}"] === $rad["${pk}"]): ?>

        <td>
            <input type="text"
                   name="<?= $felt ?>"
                   value="<?= htmlspecialchars($rad[$felt], ENT_QUOTES) ?>"
                   style="background-color:#d1d1d1;">
        </td>

    <?php else: ?>
        <td><?= htmlspecialchars($rad[$felt], ENT_QUOTES) ?></td>
    <?php endif; ?>

<?php endforeach; ?>

    <?php if (isset($_GET["command"])
              && $_GET["command"] === "update"
              && $_GET["${pk}"] === $rad["${pk}"]): ?>

        <td><input type="submit" value="Endre"></td>

    <?php else: ?>
        ${s.chb_update.is(":checked") ?
`<td><a href="?command=update&${pk}=<?= urlencode($rad["${pk}"]) ?>">Rediger</a></td>` : ""}
    <?php endif; ?>

    <?php if (${s.chb_delete.is(":checked") ? "true" : "false"}): ?>
        <td><a href="?command=delete&${pk}=<?= urlencode($rad["${pk}"]) ?>">Slett</a></td>
    <?php endif; ?>

        </form>
    </tr>
<?php } ?>


<?php if (${s.chb_insert.is(":checked") ? "true" : "false"}): ?>
<form method="GET">
    <input type="hidden" name="command" value="insert">
    <tr>
${fields.map(f => 
`        <td><input type="text" name="${f}" style="background-color:#d1d1d1;"></td>`
).join("\n")}
        <td><input type="submit" value="Ny"></td>
    </tr>
</form>
<?php endif; ?>

</table>
`;

        s.output.text(php);
    };

    self.init = function () {
        self.setupBindings();
    };

    return self;

}());