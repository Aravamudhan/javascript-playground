import details from "./mod1.js";
import {
    default as doubleMe,
    subtract,
    tripleit as tripleMe
} from "./mod2.js"

function testMe() {
    details();
    console.log(doubleMe(100));
    console.log(tripleMe(100));
    console.log(subtract(200, 10));
}
let apples = {
    color: "red",
    place: "kashmir"
};
export {
    testMe as
    default,
    apples
};