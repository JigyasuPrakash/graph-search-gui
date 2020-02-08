var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var map = document.getElementById('map');

const sTitle = document.getElementById('source');
const dTitle = document.getElementById('destination');
var counter = 0;
var positions = [];

const nodes = [
    {
        "name": "Arad",
        "x": 81,
        "y": 226,
        "edges": ["Oradea", "Deva", "Timisoara"]
    },
    {
        "name": "Timisoara",
        "x": 74,
        "y": 272,
        "edges": ["Resita", "Deva", "Drobeta Turnu"]
    },
    {
        "name": "Oradea",
        "x": 125,
        "y": 137,
        "edges": ["Satu Mare", "Turda", "Deva"]
    },
    {
        "name": "Satu Mare",
        "x": 193,
        "y": 57,
        "edges": ["Zalau", "Baia Mare"]
    },
    {
        "name": "Baia Mare",
        "x": 245,
        "y": 72,
        "edges": ["Sighetu", "Bistrita", "Cluj Napoca"]
    },
    {
        "name": "Zalau",
        "x": 207,
        "y": 122,
        "edges": ["Cluj Napoca"]
    },
    {
        "name": "Cluj Napoca",
        "x": 248,
        "y": 166,
        "edges": ["Turda"]
    },
    {
        "name": "Turda",
        "x": 260,
        "y": 189,
        "edges": ["Alba Iulia", "Targu Mures"]
    },
    {
        "name": "Deva",
        "x": 197,
        "y": 260,
        "edges": ["Hunedoara", "Alba Iulia"]
    },
    {
        "name": "Alba Iulia",
        "x": 245,
        "y": 240,
        "edges": ["Sibiu"]
    },
    {
        "name": "Sighetu",
        "x": 268,
        "y": 42,
        "edges": []
    },
    {
        "name": "Bistrita",
        "x": 311,
        "y": 128,
        "edges": ["Vatra Dornei", "Targu Mures"]
    },
    {
        "name": "Hunedoara",
        "x": 196,
        "y": 273,
        "edges": ["Targu Jiu"]
    },
    {
        "name": "Sibiu",
        "x": 286,
        "y": 268,
        "edges": ["Ramnicu Valcea"]
    },
    {
        "name": "Brasov",
        "x": 391,
        "y": 282,
        "edges": ["Sfantu Gheorghe", "Sighisoara", "Sinaia", "Pitesti"]
    },
    {
        "name": "Targu Mures",
        "x": 315,
        "y": 191,
        "edges": ["Sighisoara"]
    },
    {
        "name": "Vatra Dornei",
        "x": 372,
        "y": 106,
        "edges": ["Suceava"]
    },
    {
        "name": "Radauti",
        "x": 413,
        "y": 53,
        "edges": ["Suceava"]
    },
    {
        "name": "Suceava",
        "x": 439,
        "y": 72,
        "edges": ["Botosani", "Piatra Neamt"]
    },
    {
        "name": "Botosani",
        "x": 466,
        "y": 63,
        "edges": ["Iasi"]
    },
    {
        "name": "Piatra Neamt",
        "x": 447,
        "y": 150,
        "edges": ["Bacau"]
    },
    {
        "name": "Iasi",
        "x": 534,
        "y": 125,
        "edges": ["Vaslui", "Bacau"]
    },
    {
        "name": "Bacau",
        "x": 485,
        "y": 188,
        "edges": ["Onesti", "Vaslui", "Focsani"]
    },
    {
        "name": "Vaslui",
        "x": 544,
        "y": 181,
        "edges": ["Barlad"]
    },
    {
        "name": "Onesti",
        "x": 476,
        "y": 220,
        "edges": ["Sfantu Gheorghe"]
    },
    {
        "name": "Barlad",
        "x": 540,
        "y": 224,
        "edges": ["Focsani"]
    },
    {
        "name": "Focsani",
        "x": 505,
        "y": 280,
        "edges": ["Buzau"]
    },
    {
        "name": "Galat",
        "x": 564,
        "y": 306,
        "edges": ["Braila"]
    },
    {
        "name": "Braila",
        "x": 560,
        "y": 323,
        "edges": ["Buzau", "Tulcea", "Calarasi"]
    },
    {
        "name": "Tulcea",
        "x": 621,
        "y": 331,
        "edges": ["Izmail", "Constanta"]
    },
    {
        "name": "Izmail",
        "x": 625,
        "y": 315,
        "edges": []
    },
    {
        "name": "Constanta",
        "x": 610,
        "y": 436,
        "edges": ["Mangalia", "Calarasi", "Bucharest"]
    },
    {
        "name": "Mangalia",
        "x": 605,
        "y": 471,
        "edges": []
    },
    {
        "name": "Calarasi",
        "x": 514,
        "y": 432,
        "edges": ["Bucharest"]
    },
    {
        "name": "Bucharest",
        "x": 427,
        "y": 408,
        "edges": ["Buzau", "Pitesti", "Ploiesti", "Ruse Pyce", "Craiova"]
    },
    {
        "name": "Buzau",
        "x": 479,
        "y": 336,
        "edges": ["Ploiesti"]
    },
    {
        "name": "Ploiesti",
        "x": 421,
        "y": 356,
        "edges": ["Sinaia", "Targoviste"]
    },
    {
        "name": "Sighisoara",
        "x": 332,
        "y": 225,
        "edges": []
    },
    {
        "name": "Sfantu Gheorghe",
        "x": 403,
        "y": 262,
        "edges": []
    },
    {
        "name": "Sinaia",
        "x": 387,
        "y": 317,
        "edges": []
    },
    {
        "name": "Targoviste",
        "x": 380,
        "y": 359,
        "edges": []
    },
    {
        "name": "Pitesti",
        "x": 338,
        "y": 365,
        "edges": ["Ramnicu Valcea", "Slatina"]
    },
    {
        "name": "Ramnicu Valcea",
        "x": 302,
        "y": 341,
        "edges": []
    },
    {
        "name": "Slatina",
        "x": 302,
        "y": 409,
        "edges": ["Craiova"]
    },
    {
        "name": "Craiova",
        "x": 260,
        "y": 420,
        "edges": ["Targu Jiu", "Vidin", "Drobeta Turnu"]
    },
    {
        "name": "Targu Jiu",
        "x": 223,
        "y": 348,
        "edges": []
    },
    {
        "name": "Vidin",
        "x": 194,
        "y": 453,
        "edges": []
    },
    {
        "name": "Drobeta Turnu",
        "x": 178,
        "y": 388,
        "edges": []
    },
    {
        "name": "Resita",
        "x": 120,
        "y": 305,
        "edges": []
    },
    {
        "name": "Ruse Pyce",
        "x": 417,
        "y": 467,
        "edges": []
    },
];


function update(ctx, node) {
    ctx.drawImage(map, 0, 0);
    drawInitEdges(ctx)
    drawUpdateNodes(ctx, node)
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}


canvas.addEventListener('mouseup', function (evt) {
    var mousePos = getMousePos(canvas, evt);
    var name = "";
    if (counter < 2) {
        nodes.forEach(n => {
            if ((mousePos.x - 6) < n.x && n.x < (mousePos.x + 6) && (mousePos.y - 6) < n.y && n.y < (mousePos.y + 6)) {
                update(ctx, n);
                counter++;
            }
        })
    }
}, false);



function drawUpdateNodes(ctx, node) {
    drawInitNodes(ctx);
    positions.push(node);
    let source = positions[0];
    let destination = positions[1];
    if (destination === undefined) {
        ctx.beginPath();
        ctx.arc(source.x, source.y, 7, 0, Math.PI * 2, false)
        ctx.fillStyle = 'rgb(0,255,0)';
        ctx.fill();
        ctx.closePath();
        sTitle.textContent = source.name;
    } else {
        ctx.beginPath();
        ctx.arc(source.x, source.y, 7, 0, Math.PI * 2, false)
        ctx.fillStyle = 'rgb(0,255,0)';
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(destination.x, destination.y, 7, 0, Math.PI * 2, false)
        ctx.fillStyle = 'rgb(255,0,0)';
        ctx.fill();
        ctx.closePath();
        dTitle.textContent = destination.name;
    }
}






//Static functions dont touch
function drawInitEdges(ctx) {

    nodes.forEach(n => {
        n.edges.forEach(e => {
            nodes.forEach(next => {
                if (next.name === e) {
                    ctx.beginPath();
                    ctx.moveTo(n.x, n.y);
                    ctx.lineTo(next.x, next.y);
                    ctx.strokeStyle = 'rgb(0,0,0)';
                    ctx.closePath();
                    ctx.stroke()
                }
            })
        })
    })
}

function drawInitNodes(ctx) {
    nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 4, 0, Math.PI * 2, false)
        ctx.fillStyle = 'rgb(0,0,255)';
        ctx.fill();
        ctx.closePath();
    });
}
var queue = [];
var visited = [];

function init() {
    counter = 0;
    positions = [];
    queue = [];
    visited = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(map, 0, 0);
    drawInitEdges(ctx);
    drawInitNodes(ctx);
}





////////////////////Main Algorithm here
function initSearching() {
    if (positions.length < 2) {
        alert("Please first select Source and Destination to continue");
    } else {
        startSearching(positions[0], positions[1]);
    }
}

function contains(name) {
    if (visited.includes(name)) {
        return true;
    }
    return false;
}

function pushToQueue(name) {
    nodes.forEach(n => {
        if (n.name === name) {
            queue.push(n);
        }
    })
}

function tracePath(parent, name) {
    nodes.forEach(n => {
        if (n.name === name) {
            ctx.beginPath();
            ctx.moveTo(parent.x, parent.y);
            ctx.lineTo(n.x, n.y);
            ctx.strokeStyle = 'rgb(255,0,255)'
            ctx.closePath();
            ctx.stroke()
        }
    })
}

function startSearching(source, destination) {
    var path = "";
    visited.push(source.name);
    queue.push(source);
    while (queue.length !== 0) {
        source = queue.shift();
        path += source.name + ", ";
        if (source.name === destination.name) {
            console.log("Path is: " + path)
            console.log(queue)
            return;
        }
        source.edges.forEach(e => {
            if (!contains(e)) {
                visited.push(e);
                pushToQueue(e);
                tracePath(source, e);
            }
        })
    }
    console.log("Path Not Found!!");
}


//Starting function here
ctx.drawImage(map, 0, 0);
drawInitEdges(ctx);
drawInitNodes(ctx);