console.log(`main.js loaded`);

// Elements
const colorGroupsEl = document.querySelector(`[data-element=color-groups]`);

let colorGroupsHtml = ``;

data.forEach(({ name, colors }) => {
  let swatchGroupsHtml = ``;

  colors.forEach(({ name, count, swatches }) => {
    let swatchesHtml = ``;

    const swatchHeadingHtml =
      name != `` ? `<h3 class="swatch-heading">${name}</h3>` : ``;

    swatches.forEach(({ name, hex, rgb, hsl, text }) => {
      //
    });

    swatchGroupsHtml += `<div class="swatch-group">
        ${swatchHeadingHtml}
        <div class="swatches" style="--swatch-count: ${count}"></div>
    </div>`;
  });

  colorGroupsHtml += `
        <div class="color-group">
            <h2 class="color-heading">${name}</h2>
            ${swatchGroupsHtml}
        </div>
    `;
});

colorGroupsEl.innerHTML = colorGroupsHtml;
