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

        // Append swatches to palette set via id
        const main = $('main');
        switch(set.name) {
            case 'Material Colors':
                main.append(
                    '<section id="set-' + name.kebab + '" class="palette-set">' +
                    '\t<h2 class="palette-title">' + set.name + '</h2>' +
                    '</section>'
                );

                let sets = '';
                set.colors.forEach(color => {
                    const nameLower = color.name.toLowerCase();
                    sets += '<div>' +
                    '\t<h3 class="swatches-title">' + color.name + '</h3>' +
                    '\t<div id="set-' + name.kebab + '-' +  nameLower + '-swatches" class="palette-swatches">' +
                    '\t</div>' +
                    '</div>';

                });
                $('#set-' + name.kebab).append(sets);

                set.colors.forEach(color => {

                    const nameLower = color.name.toLowerCase();
                    let swatches = '';
                    color.swatches.forEach(swatch => {
                        swatches += '<div class="palette-swatch" style="color: #000000; background-color: ' + swatch.value + '">' +
                        '\t<p class="swatch-name">' + swatch.name + '</p>' +
                        '\t<p class="swatch-value">' + swatch.value + '</p>' +
                        '</div>';
                    });
                    console.log('#set-' + name.kebab + '-' + nameLower + '-swatches');
                    console.log(swatches);
                    $('#set-' + name.kebab + '-' + nameLower + '-swatches').append(swatches);

                });
                break;

            default:
                // Append palette set to <main>
                main.append(
                    '<section id="set-' + name.kebab + '" class="palette-set">' +
                    '\t<h2 class="palette-title">' + set.name + '</h2>' +
                    '\t' +
                    '\t\t<div id="set-' + name.kebab + '-swatches" class="palette-swatches">' +
                    '\t\t\t' +
                    '\t\t</div>' +
                    '</section>'
                );

                let swatches = '';
                set.colors.forEach(color => {
                    swatches += '<div class="palette-swatch" style="color: ' + color.text + '; background-color: ' + color.value + '">' +
                    '\t<p class="swatch-name">' + color.name + '</p>' +
                    '\t<p class="swatch-value">' + color.value + '</p>' +
                    '</div>';
                })
                $('#set-' + name.kebab + '-swatches').append(swatches);
                break;
        }
        
    });

});