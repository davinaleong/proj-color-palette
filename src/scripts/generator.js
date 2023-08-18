console.log(`generator.js loaded`)

/// Variables
const dataElementAttr = `data-element`
const outputEl = document.querySelector(`[${dataElementAttr}="output"]`)

/// Functions
function main() {
  console.log(`fn: main`)

  if (outputEl) {
    let variables = ``
    let classes = ``

    colors.forEach(function (color, colorIndex) {
      variables += `
        /* ${colorIndex + 1}. ${color.name} */
        `
      classes += `
        /* ${colorIndex + 1}. ${color.name} */
        `

      color.groups.forEach(function (group, groupIndex) {
        if (group.name !== ``) {
          variables += `
                /* ${colorIndex + 1}.${groupIndex + 1}. ${group.name} */
            `
          classes += `
                /* ${colorIndex + 1}.${groupIndex + 1}. ${group.name} */
            `
        }

        group.swatches.forEach(function (swatch) {
          if (group.key === ``) {
            variables += `--clr-${color.key}-${swatch.key}: ${swatch.hsl};
            `

            classes += `
                .text-${color.key}-${swatch.key} {
                    color: var(--clr-${color.key}-${swatch.key});
                }

                .bg-${color.key}-${swatch.key} {
                    background-color: var(--clr-${color.key}-${swatch.key});
                }

                .fill-${color.key}-${swatch.key} {
                    fill: var(--clr-${color.key}-${swatch.key});
                }
            `
          } else {
            variables += `--clr-${color.key}-${group.key}-${swatch.key}: ${swatch.hsl};
            `

            classes += `
                .text-${color.key}-${group.key}-${swatch.key} {
                    color: var(--clr-${color.key}-${group.key}-${swatch.key});
                }

                .bg-${color.key}-${group.key}-${swatch.key} {
                    background-color: var(--clr-${color.key}-${group.key}-${swatch.key});
                }

                .fill-${color.key}-${group.key}-${swatch.key} {
                    fill: var(--clr-${color.key}-${group.key}-${swatch.key});
                }
            `
          }
        })
      })
    })

    outputEl.innerHTML = `
        :root {
            ${variables}
        }

        ${classes}
    `
  }
}

/// Execution
main()
