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

console.log(hexToRgb(hex));
