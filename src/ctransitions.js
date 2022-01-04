export function MovePosition(node, {
    delay = 0,
    duration = 200,
    fx = 0,
    fy = 0,
    tx = 0,
    ty = 0,
    left = true,
    top = true,
    unit = "px"
}) {
    let horizontalProp = left? "left":"right";
    let vertProp = top? "top":"bottom";
    let unitH = unit!="v"? unit:"vw";
    let unitV = unit!="v"? unit:"vh";

    return {
        delay,
        duration,
        css: t => {

            return `
            position: absolute;
            ${horizontalProp}: ${(fx + (tx - fx) * t)}${unitH}; 
            ${vertProp}: ${(fy + (ty - fy) * t)}${unitV}; `

        }
    };
}