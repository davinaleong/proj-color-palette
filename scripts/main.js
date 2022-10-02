console.log(`main.js loaded`);

// Elements
const headerCenterNavEl = document.querySelector(
  `[data-element=header-center-nav]`
);
const colorGroupsEl = document.querySelector(`[data-element=color-groups]`);

let headerNavListHtml = ``;
let colorGroupsHtml = ``;

data.forEach(({ name, colors }, index) => {
  const colorGroupName = name;
  let swatchGroupsHtml = ``;

  colors.forEach(({ name, count, swatches }) => {
    let swatchesHtml = ``;

    const swatchHeadingHtml =
      name != `` ? `<h3 class="swatch-heading">${name}</h3>` : ``;

    swatches.forEach(({ name, hex, rgb, hsl, text }) => {
      swatchesHtml += `
            <div class="swatch" style="--clr-swatch: ${text}; --clr-swatch-bg: ${hex};"
                data-group="${colorGroupName}" data-name="${name}" data-hex="${hex}" data-rgb="${rgb}" data-hsl="${hsl}"
                >
                <div class="swatch-title">${name}</div>
                <div class="swatch-value">${hex}</div>
            </div>
        `;
    });

    swatchGroupsHtml += `<div class="swatch-group">
        ${swatchHeadingHtml}
        <div class="swatches" style="--swatch-count: ${count}">${swatchesHtml}</div>
    </div>`;
  });

  headerNavListHtml += `
    <li class="nav-list-item">
        <a href="#cg-${index + 1}" class="btn btn-grey-outline">${name}</a>
    </li>
  `;

  colorGroupsHtml += `
        <div id="cg-${index + 1}" class="color-group">
            <h2 class="color-heading">${name}</h2>
            ${swatchGroupsHtml}
        </div>
    `;
});

headerCenterNavEl.innerHTML = headerNavListHtml;
colorGroupsEl.innerHTML = colorGroupsHtml;
