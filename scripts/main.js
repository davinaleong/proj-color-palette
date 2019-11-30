$(document).ready(function () {
    $.getJSON('./../db/colors.json', function(colors) {
        // console.log(colors);

        const main = $('main');

        colors.forEach(color => {
            // console.log(color.set);
            main.append(
                '<section class="palette-set">' +
                '\t<h2 class="palette-title">' + color.set + '</h2>' +
                '\t' +
                '\t\t<div class="palette-swatches">' +
                '\t\t\t' +
                '\t\t</div>' +
                '</section>'
            );
        });
    });
});