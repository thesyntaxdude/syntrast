document.addEventListener("DOMContentLoaded", () => {
  const textColorInput = document.getElementById("text-color");
  const bgColorInput = document.getElementById("background-color");
  const sampleText = document.querySelector(".sample-text");
  const resultSpan = document.querySelector(".results span");
  const checkContrastBtn = document.querySelector(
    ".btn-wrapper .btn:nth-child(1)"
  );
  const copyHexBtn = document.querySelector(".btn-wrapper .btn:nth-child(2)");
  const swapColorsBtn = document.querySelector(
    ".btn-wrapper .btn:nth-child(3)"
  );
  const modeToggle = document.querySelector(".fa-moon");

  function updateSampleText() {
    sampleText.style.color = textColorInput.value;
    sampleText.style.backgroundColor = bgColorInput.value;
  }

  function hexToRgb(hex) {
    hex = hex.substring(1);
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((char) => char + char)
        .join("");
    }

    let red = parseInt(hex[0] + hex[1], 16);
    let green = parseInt(hex[2] + hex[3], 16);
    let blue = parseInt(hex[4] + hex[5], 16);

    return { red, green, blue };
  }

  function getSrgb(color) {
    return color <= 0.04045 ? color / 12.92 : ((color + 0.055) / 1.055) ** 2.4;
  }

  function getLuminance({ red, green, blue }) {
    red /= 255;
    green /= 255;
    blue /= 255;

    red = getSrgb(red);
    green = getSrgb(green);
    blue = getSrgb(blue);

    return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
  }

  function getContrastRatio(lum1, lum2) {
    let lighter = Math.max(lum1, lum2);
    let darker = Math.min(lum1, lum2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  function checkContrast(textHex, bgHex) {
    const textRgb = hexToRgb(textHex);
    const bgRgb = hexToRgb(bgHex);
    const textLum = getLuminance(textRgb);
    const bgLum = getLuminance(bgRgb);

    const contrastRatio = getContrastRatio(textLum, bgLum);

    if (contrastRatio >= 7) {
      return "✅ AAA Compliant";
    } else if (contrastRatio >= 4.5) {
      return "✔️ AA Compliant";
    } else {
      return "🤮 Brother Ugh ... What was that?";
    }
  }

  function copyHexValues() {
    const hexValues = `${textColorInput.value},${bgColorInput.value}`;
    navigator.clipboard.writeText(hexValues);
    copyHexBtn.textContent = "Copied!";
    copyHexBtn.style.backgroundColor = "#28a745";
    setTimeout(() => {
      copyHexBtn.textContent = "Copy HEX";
      copyHexBtn.style.backgroundColor = "var(--accent-color)";
    }, 1000);
  }

  function swapColors() {
    const tempColor = textColorInput.value;
    textColorInput.value = bgColorInput.value;
    bgColorInput.value = tempColor;
    updateSampleText();
  }

  function toggleMode() {
    document.body.classList.toggle("light-mode");
    modeToggle.classList.toggle("fa-sun");
    modeToggle.classList.toggle("fa-moon");
  }

  textColorInput.addEventListener("input", updateSampleText);
  bgColorInput.addEventListener("input", updateSampleText);
  checkContrastBtn.addEventListener("click", () => {
    const result = checkContrast(textColorInput.value, bgColorInput.value);
    resultSpan.textContent = result;
  });
  copyHexBtn.addEventListener("click", copyHexValues);
  swapColorsBtn.addEventListener("click", swapColors);
  modeToggle.addEventListener("click", toggleMode);

  updateSampleText();
});
