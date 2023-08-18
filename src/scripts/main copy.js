/* Sections:
 * - A. Render Nav Links & Swatches
 * - B. Show Color Details
 * - C. Copy Color Value to Clipboard
 */
console.log(`main.js loaded`)

// A. Render Nav Links & Swatches
const headerCenterNavEl = document.querySelector(
  `[data-element=header-center-nav]`
)
const colorGroupsEl = document.querySelector(`[data-element=color-groups]`)

let headerNavListHtml = ``
let colorGroupsHtml = ``

data.forEach(({ name, colors }, index) => {
  const colorGroupName = name
  let swatchGroupsHtml = ``
  let swatchGroupCountHtml = ``

  colors.forEach(({ name, count, swatches }) => {
    let swatchesHtml = ``

    let swatchHeadingHtml = ``
    if (name != "") {
      swatchHeadingHtml = `<h3 class="swatch-heading">${name} (${count})</h3>`
    } else {
      swatchGroupCountHtml = ` (${count})`
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
        <div class="swatches" style="--swatch-count: ${count}">${swatchesHtml}</div>
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

function updateDetails(dataset) {
  const { hex, rgb, hsl } = dataset

  valueHexEl.innerHTML = hex
  valueRgbEl.innerHTML = rgb
  valueHslEl.innerHTML = hsl

  detailsSwatchDarkTextEl.setAttribute(
    `style`,
    `--clr-details-swatch: #000; --clr-details-swatch-bg: ${hex};`
  )
  detailsSwatchLightTextEl.setAttribute(
    `style`,
    `--clr-details-swatch: #fff; --clr-details-swatch-bg: ${hex};`
  )
  detailsSwatchDarkBgEl.setAttribute(
    `style`,
    `--clr-details-swatch: ${hex}; --clr-details-swatch-bg: #000;`
  )
  detailsSwatchLightBgEl.setAttribute(
    `style`,
    `--clr-details-swatch: ${hex}; --clr-details-swatch-bg: #fff;`
  )
}

function toggleToast(message = ``) {
  console.log(`toggleToast`)
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

// C. Copy Color Value to Clipboard
const copyHexBtnEl = document.querySelector(`[data-element=copy-hex]`)
const copyRgbBtnEl = document.querySelector(`[data-element=copy-rgb]`)
const copyHslBtnEl = document.querySelector(`[data-element=copy-hsl]`)

// navigator.clipboard.writeText(copyText.value);

copyHexBtnEl.addEventListener(`click`, (e) => {
  console.log(`Copy-hex button clicked`)

  const value = valueHexEl.innerHTML
  navigator.clipboard.writeText(value)
  toggleToast(`Copied ${value}`)
})

copyRgbBtnEl.addEventListener(`click`, (e) => {
  console.log(`Copy-rgb button clicked`)

  const value = valueRgbEl.innerHTML
  navigator.clipboard.writeText(value)
  toggleToast(`Copied ${value}`)
})

copyHslBtnEl.addEventListener(`click`, (e) => {
  console.log(`Copy-hsl button clicked`)

  const value = valueHslEl.innerHTML
  navigator.clipboard.writeText(value)
  toggleToast(`Copied ${value}`)
})
