function compareJSON() {
    try {
        const json1 = JSON.parse(document.getElementById("json1").value);
        const json2 = JSON.parse(document.getElementById("json2").value);
        const diff = findDifferences(json1, json2);
        document.getElementById("result").textContent = JSON.stringify(diff, null, 2);
    } catch (e) {
        document.getElementById("result").textContent = "Invalid JSON input!";
    }
}

function findDifferences(obj1, obj2) {
    let diffs = {};
    
    function compare(o1, o2, path = "") {
        for (let key in o1) {
            if (!(key in o2)) {
                diffs[path + key] = { removed: o1[key] };
            } else if (typeof o1[key] === "object" && typeof o2[key] === "object") {
                compare(o1[key], o2[key], path + key + ".");
            } else if (o1[key] !== o2[key]) {
                diffs[path + key] = { from: o1[key], to: o2[key] };
            }
        }
        
        for (let key in o2) {
            if (!(key in o1)) {
                diffs[path + key] = { added: o2[key] };
            }
        }
    }
    
    compare(obj1, obj2);
    return diffs;
}
