console.log(`main.js loaded`)

/// Variables
const dataElementAttr = `data-element`
const dataActiveAttr = `data-active`

/// Elements
const headerCenterNavEl = document.querySelector(
  `[${dataElementAttr}="header-center-nav"]`
)
const colorGroupsEl = document.querySelector(
  `[${dataElementAttr}="color-groups"]`
)

const swatchEls = document.querySelectorAll(`[${dataElementAttr}="swatch"]`)
const swatchChildEls = document.querySelectorAll(
  `[${dataElementAttr}="swatch"] > :where(.swatch-title, .swatch-value)`
)

const valueHexEl = document.querySelector(`[${dataElementAttr}="value-hex"]`)
const valueRgbEl = document.querySelector(`[${dataElementAttr}="value-rgb"]`)
const valueHslEl = document.querySelector(`[${dataElementAttr}="value-hsl"]`)

const detailsSwatchDarkTextEl = document.querySelector(
  `[${dataElementAttr}="details-swatch-dark-text"]`
)
const detailsSwatchLightTextEl = document.querySelector(
  `[${dataElementAttr}="details-swatch-light-text"]`
)
const detailsSwatchDarkBgEl = document.querySelector(
  `[${dataElementAttr}="details-swatch-dark-bg"]`
)
const detailsSwatchLightBgEl = document.querySelector(
  `[${dataElementAttr}="details-swatch-light-bg"]`
)

/// Functions
function logFunction(name = `Function`, params = {}) {
  console.log(`fn: ${name}(${JSON.stringify(params)})`)
}

function toggleToast(message = ``) {
  logFunction(`toggleToast`, { message })
  const toastEl = document.querySelector(`[data-element=toast]`)

  if (!toastEl) {
    return
  }

  if (message && message !== ``) {
    toastEl.querySelector(`p`).innerText = message
    toastEl.setAttribute(`data-active`, true)
    setInterval(function () {
      toastEl.removeAttribute(`data-active`)
    }, 3000)
  } else {
    toastEl.removeAttribute(`data-active`)
  }
}

function updateDetails(dataset) {
  logFunction(`updateDetails`, { dataset })
  const { hex, rgb, hsl } = dataset

  if (valueHexEl) {
    valueHexEl.innerHTML = hex
  }

  if (valueRgbEl) {
    valueRgbEl.innerHTML = rgb
  }

  if (valueHslEl) {
    valueHslEl.innerHTML = hsl
  }

  if (detailsSwatchDarkTextEl) {
    detailsSwatchDarkTextEl.setAttribute(
      `style`,
      `--clr-details-swatch: #000; --clr-details-swatch-bg: ${hex};`
    )
  }

  if (detailsSwatchLightTextEl) {
    detailsSwatchLightTextEl.setAttribute(
      `style`,
      `--clr-details-swatch: #fff; --clr-details-swatch-bg: ${hex};`
    )
  }

  if (detailsSwatchDarkBgEl) {
    detailsSwatchDarkBgEl.setAttribute(
      `style`,
      `--clr-details-swatch: ${hex}; --clr-details-swatch-bg: #000;`
    )
  }

  if (detailsSwatchLightBgEl) {
    detailsSwatchLightBgEl.setAttribute(
      `style`,
      `--clr-details-swatch: ${hex}; --clr-details-swatch-bg: #fff;`
    )
  }
}

function main() {
  logFunction(`main`)

  let headerNavListHtml = ``
  let colorGroupsHtml = ``

  /// Logic
  colors.forEach(function ({ name, groups }, index) {
    const colorGroupName = name
    let swatchGroupsHtml = ``
    let swatchGroupCountHtml = ``

    groups.forEach(({ name, count, swatches }) => {
      let swatchesHtml = ``

      let swatchHeadingHtml = ``
      if (name != "") {
        swatchHeadingHtml = `<h3 class="swatch-heading">${name} (${swatches.length})</h3>`
      } else {
        swatchGroupCountHtml = ` (${swatches.length})`
      }

      swatches.forEach(({ name, hex, rgb, hsl, text }) => {
        swatchesHtml += `
              <div class="swatch" style="--clr-swatch: ${text}; --clr-swatch-bg: ${hex};"
                  data-group="${colorGroupName}" data-name="${name}" data-hex="${hex}" data-rgb="${rgb}" data-hsl="${hsl}" data-element="swatch"
                  >
                  <div class="swatch-title">${name}</div>
                  <div class="swatch-value">${hex}</div>
              </div>
          `
      })

      swatchGroupsHtml += `<div class="swatch-group">
          ${swatchHeadingHtml}
          <div class="swatches" style="--swatch-count: ${swatches.length}">${swatchesHtml}</div>
      </div>`
    })

    headerNavListHtml += `
      <li class="nav-list-item">
          <a href="#cg-${index + 1}" class="btn btn-gray-outline">${name}</a>
      </li>
    `

    colorGroupsHtml += `
          <div id="cg-${index + 1}" class="color-group">
              <h2 class="color-heading">${name}${swatchGroupCountHtml}</h2>
              ${swatchGroupsHtml}
          </div>
      `
  })

  headerCenterNavEl.innerHTML = headerNavListHtml
  colorGroupsEl.innerHTML = colorGroupsHtml

  const detailsSwatchDarkTextEl = document.querySelector(
    `[data-element=details-swatch-dark-text]`
  )
  const detailsSwatchLightTextEl = document.querySelector(
    `[data-element=details-swatch-light-text]`
  )
  const detailsSwatchDarkBgEl = document.querySelector(
    `[data-element=details-swatch-dark-bg]`
  )
  const detailsSwatchLightBgEl = document.querySelector(
    `[data-element=details-swatch-light-bg]`
  )

  // B. Show Color Details
  const valueHexEl = document.querySelector(`[data-element=value-hex]`)
  const valueRgbEl = document.querySelector(`[data-element=value-rgb]`)
  const valueHslEl = document.querySelector(`[data-element=value-hsl]`)

  const swatchEls = document.querySelectorAll(`[data-element=swatch]`)
  const swatchChildEls = document.querySelectorAll(
    `[data-element=swatch] > :where(.swatch-title, .swatch-value)`
  )

  swatchEls.forEach((swatchEl) => {
    swatchEl.addEventListener(`click`, (e) => {
      updateDetails(e.target.dataset)
    })
  })
}

/// Logic
main()
