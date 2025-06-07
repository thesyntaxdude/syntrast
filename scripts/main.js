// let hex = prompt("Enter a Hex Value: ", "");

//          CHECK CONTRAST BUTTON

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

    return red, green, blue;
}

function getSrgb(color) {
  // this function converts the values of its arguments into sRGB.
  // using values provided by the W3 WCAG 2.1 Contrast Guidelines.
    return (color =
    color <= 0.04045 ? color / 12.92 : ((color + 0.055) / 1.055) ** 2.4);
}

function getLuminance(red, green, blue){
    red /= 255;
    green /= 255;
    blue /= 255;

    getSrgb(red);
    getSrgb(green);
    getSrgb(blue);
    console.log();

    const luminance = (0.2126 * red) + (0.7152 * green) + (0.0722 * blue);
    return luminance;
}

function getContrastRatio(lum1, lum2){
    let lighter = Math.max(lum1, lum2);
    let darker = Math.min(lum1, lum2);
    return (lighter + 0.05) / (darker + 0.05); // Adding "0.05" to prevent potentially dividing by 0. Also provided by W3 WCAG 2.1 Guidelines.
}

function checkContrast(textHex, bgHex) {
    const textRgb = hexToRgb(textHex);
    const bgRgb = hexToRgb(bgHex);
    const textLum = getLuminance(textRgb);
    const bgLum = getLuminance(bgRgb);

    const contrastRatio = getContrastRatio(textLum, bgLum);

    if (contrastRatio >= 7){
        return "✅ AAA Compliant";
    }
    else if (contrastRatio >= 4.5){
        return "✔️ AA Compliant";
    }
    else{
        return "🤮 Brother Ugh ... What was that?";
    }
}
