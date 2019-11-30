$(document).ready(function () {
    $.getJSON('./../db/colors.json', function(colorSets) {
        // console.log(colors);

        const main = $('main');

        colorSets.forEach((set, index) => {
            console.log(set.name);
            main.append(
                '<section id="set-' + index + '" class="palette-set">' +
                '\t<h2 class="palette-title">' + set.name + '</h2>' +
                '\t' +
                '\t\t<div id="set-' + index + '-swatches" class="palette-swatches">' +
                '\t\t\t' +
                '\t\t</div>' +
                '</section>'
            );

            let swatches = '';
            set.colors.forEach(color => {
                console.log(color.name, color.value);
                swatches += '<div class="palette-swatch" style="color: ' + color.text + '; background-color: ' + color.value + '">' +
                '\t<p class="swatch-name">' + color.name + '</p>' +
                '\t<p class="swatch-value">' + color.value + '</p>' +
                '</div>';
            })
            $('#set-' + index + '-swatches').append(swatches);
        });
    });
});