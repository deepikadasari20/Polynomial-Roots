const fs = require('fs');


const data = JSON.parse(fs.readFileSync('polynomial.json', 'utf-8'));
const k = data.keys.k;


let points = [];
for (const key of Object.keys(data)) {
    if (!isNaN(key)) { 
        const x = parseInt(key);
        const base = parseInt(data[key].base);
        const y = parseInt(data[key].value, base); 
        points.push({ x, y });
    }
}


points = points.slice(0, k);

function lagrangeAtZero(points) {
    let result = 0;
    for (let i = 0; i < points.length; i++) {
        let term = points[i].y;
        for (let j = 0; j < points.length; j++) {
            if (j !== i) {
                term *= (0 - points[j].x) / (points[i].x - points[j].x);
            }
        }
        result += term;
    }
    return result;
}

const C = lagrangeAtZero(points);

console.log("Constant C value:", C);
