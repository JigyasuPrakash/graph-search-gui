var data;
var graph;
let img;
var start;
var end;
var isStart = false;
var isEnd = false;

function preload() {
    data = loadJSON('romania.json');
    img = loadImage('img/romania.png');
    noLoop();
}

function setup() {
    graph = new Graph();
    var canvas = createCanvas(696, 491);
    canvas.parent('sketch-holder');
    var cities = data.cities;

    for (var i = 0; i < cities.length; i++) {
        var node = cities[i];
        var name = node.name;
        var neighbor = node.connected;

        var cityNode = graph.getNode(name);
        if (cityNode == undefined) {
            cityNode = new Node(name);
            graph.addNode(cityNode);
        }
        for (var j = 0; j < neighbor.length; j++) {
            var neighborName = neighbor[j];
            var neighborNode = graph.getNode(neighborName);
            if (neighborNode == undefined) {
                neighborNode = new Node(neighborName);
                graph.addNode(neighborNode);
            }
            cityNode.addEdge(neighborNode);
        }
    }

    //Add coordinates to each node in graph
    for (var i = 0; i < cities.length; i++) {
        var node = cities[i];
        var name = node.name;
        var x = node.x;
        var y = node.y;
        graph.addCoordinate(name, x, y);
    }
}

function preDraw() {
    // Background Romania Map
    image(img, 0, 0);

    // Connecting Edges in Map
    data.cities.forEach(n => {
        n.connected.forEach(e => {
            data.cities.forEach(next => {
                if (next.name === e) {
                    stroke(0, 0, 0, 150);
                    strokeWeight(1);
                    line(n.x, n.y, next.x, next.y);

                }
            })
        })
    });

    // Node Points
    for (var i = 0; i < data.cities.length; i++) {
        var city = data.cities[i].name;
        var node = graph.graph[city];
        fill(0, 0, 255);
        circle(node.x, node.y, 7);
    }

    if (isStart) {
        fill(0, 255, 0);
        circle(start.x, start.y, 11);
    }
    if (isEnd) {
        fill(255, 0, 0);
        circle(end.x, end.y, 11);
    }
}

function mouseClicked() {
    if (!isStart || !isEnd) {
        // mouseX & mouseY
        for (var i = 0; i < data.cities.length; i++) {
            var city = data.cities[i];
            if ((mouseX - 6) < city.x && city.x < (mouseX + 6) && (mouseY - 6) < city.y && city.y < (mouseY + 6)) {
                if (!isStart && !isEnd) {
                    start = graph.setStart(city.name);
                    isStart = true;
                    fill(0, 255, 0);
                    circle(start.x, start.y, 11);
                    return;
                } else if (!isEnd) {
                    end = graph.setEnd(city.name);
                    isEnd = true;
                    fill(255, 0, 0);
                    circle(end.x, end.y, 11);
                    return;
                }
            }
        }
    } else {
        return;
    }
}

var path = [];
var inPath = {};
var maxx = 0;
var m = -1;
var completed = false;

function draw() {

    frameRate(3);
    preDraw();

    var counter = 0;
    while (counter < m) {
        var px = inPath[counter].px;
        var py = inPath[counter].py;
        var cx = inPath[counter].cx;
        var cy = inPath[counter].cy;

        stroke(255, 0, 0)
        strokeWeight(3);
        line(px, py, cx, cy);
        counter++;
    }
    m++;
    if (m > maxx) {
        m = maxx;
        completed = true;
    }

    if (completed) {
        path.forEach(p => {
            var px = p.x;
            var py = p.y;
            var cx = p.x;
            var cy = p.y;
            if (p.parent != null) {
                cx = p.parent.x;
                cy = p.parent.y;
            }
            stroke(0, 255, 0)
            strokeWeight(4);
            line(px, py, cx, cy);
        });
        noLoop();
    }
}

function reset() {
    window.location.reload();
}

function bfs() {
    if (isStart && isEnd) {
        var queue = [];

        start.searched = true;
        queue.push(start);

        while (queue.length > 0) {
            var current = queue.shift();
            var px = current.x;
            var py = current.y;
            // if (current == end) {
            //     console.log("Found " + current.value);
            //     done();
            //     return;
            // }
            var edges = current.edges;
            for (var i = 0; i < edges.length; i++) {
                var neighbor = edges[i];
                if (!neighbor.searched) {
                    neighbor.searched = true;
                    neighbor.parent = current;
                    var cx = neighbor.x;
                    var cy = neighbor.y;
                    inPath[maxx] = { px, py, cx, cy };
                    maxx++;
                    queue.push(neighbor);
                    if (neighbor == end) {
                        console.log("Found " + neighbor.value);
                        done();
                        return;
                    }
                }
            }
        }

        function done() {
            path.push(end);
            var next = end.parent;
            while (next != null) {
                path.push(next);
                next = next.parent;
            }
            loop();
        }

    } else {
        alert("Start / End Node not Defined!!");
    }
}
