function doubleit(val) {
    if (parseFloat(val) === val) {
        return val * 2;
    }
}

function tripleit(val) {
    if (parseFloat(val) === val) {
        return val * 3;
    }
}

function subtract(val1, val2) {
    console.log("Subtracting", val1, "and", val2);
    return val1 - val2;
}
export {
    doubleit as
    default, tripleit, subtract
}