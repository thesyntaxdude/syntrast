let hex = prompt("Enter a Hex Value: ", "");

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

// console.log(hexToRgb(hex));

function getLuminance(red, green, blue){
    red /= 255;
    green /= 255;
    blue /= 255;
    
    red = (red <= 0.03928) ? red / 12.92 : (((red + 0.055) /1.055) ** 2.4);
    green = green <= 0.03928 ? green / 12.92 : ((green + 0.055) / 1.055) ** 2.4;
    blue = blue <= 0.03928 ? blue / 12.92 : ((blue + 0.055) / 1.055) ** 2.4;

    const luminance = (0.2126 * red) + (0.7152 * green) + (0.0722 * blue);
    return luminance;
}

// console.log(getLuminance(220, 30, 40));