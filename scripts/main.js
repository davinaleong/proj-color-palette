$(document).ready(function () {

    colors.forEach((set, index) => {
        // Convert name to kebab-case
        const name = {
            original: set.name,
            split: set.name.toLowerCase().split(' ')
        };
        name.kebab = '';
        name.split.forEach((word, index) => {
            if (index >= name.split.length - 1) {
                name.kebab += word;
            } else {
                name.kebab += word + '-';
            }
        });

        
        // Append links to <nav>
        $('ul.nav-links').append(
            '\t<li><a href="#set-' + name.kebab + '">' + set.name + '</a></li>'
        );

        // Append palette set to <main>
        $('main').append(
            '<section id="set-' + name.kebab + '" class="palette-set">' +
            '\t<h2 class="palette-title">' + set.name + '</h2>' +
            '\t' +
            '\t\t<div id="set-' + index + '-swatches" class="palette-swatches">' +
            '\t\t\t' +
            '\t\t</div>' +
            '</section>'
        );

        // Append swatches to palette set via id
        let swatches = '';
        set.colors.forEach(color => {
            swatches += '<div class="palette-swatch" style="color: ' + color.text + '; background-color: ' + color.value + '">' +
            '\t<p class="swatch-name">' + color.name + '</p>' +
            '\t<p class="swatch-value">' + color.value + '</p>' +
            '</div>';
        })
        $('#set-' + index + '-swatches').append(swatches);
    });
});