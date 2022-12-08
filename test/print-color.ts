console.log("! print colors")

/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue 0 - 360
 * @param   Number  s       The saturation 0 - 1
 * @param   Number  v       The value 0 - 1
 * @return  Array           The RGB representation
 */
function hsvToRgb(h, s, v) {
  var r, g, b;
 
  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
    default: r = 0, g = 0, b = 0; break;
  }

  return [ Math.round(r * 255), Math.round(g * 255), Math.round(b * 255) ];
}

var iteration = 100
var percent = 100 / iteration
const hue = 360 / iteration

for(let i = 0;i < iteration+1;i++){
    // const rgb = hsvToRgb(hue*i,0.32,0.60)
    const rgb = hsvToRgb(hue*i,0.80,0.80)
    // let rgb_plus_1;
    // if((hue * (i+1)) > 360){
    //     rgb_plus_1 = hsvToRgb(0,0.32,0.60)
    // }
    // else{
    //     rgb_plus_1 = hsvToRgb(hue*(i+1),0.32,0.60)
    // }
    console.log(
        `${percent * i}%{
            border-color: rgb(${rgb[0]},${rgb[1]},${rgb[2]})
        }
        
        `
    )
    // for(let k = 0;k < rgb.length;k++){
    //     if(rgb[k] !== rgb_plus_1[k]){
    //         console.log("rgb",rgb[k])
    //         console.log("rgb_plus_1",rgb_plus_1[k])
    //     }
    // }
    // console.log(
    //     `${percent * i}%{
    //         background-color: radial-gradient(circle, rgb(${rgb[0]},${rgb[1]},${rgb[2]}) 36%, rgb(${rgb_plus_1[0]},${rgb_plus_1[1]},${rgb_plus_1[2]}) 100%);
    //     }
        
    //     `
    // )

}

// console.log(
// `0%{
//         background: radial-gradient(circle, #ff0000 36%, #ff9900 100%);
// }`)