var data;
var graph;
let img;

function preload() {
    data = loadJSON('romania.json');
    img = loadImage('img/romania.png');
}

function setup() {
    graph = new Graph();
    var canvas = createCanvas(696, 491);
    image(img, 0, 0);
    var cities = data.cities;

    for (var i = 0; i < cities.length; i++) {
        var name = cities[i].name;
        var neighbor = cities[i].connected;
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
}


function bfs() {
    graph.reset();

    var start = graph.setStart("Arad");
    var end = graph.setEnd("Ruse Pyce");

    var queue = [];

    start.searched = true;
    queue.push(start);

    while (queue.length > 0) {
        var current = queue.shift();
        if (current == end) {
            console.log("Found " + current.value);
            break;
        }
        var edges = current.edges;
        for (var i = 0; i < edges.length; i++) {
            var neighbor = edges[i];
            if (!neighbor.searched) {
                neighbor.searched = true;
                neighbor.parent = current;
                queue.push(neighbor);
            }
        }
    }

    var path = [];

    path.push(end);
    var next = end.parent;

    while (next != null) {
        path.push(next);
        next = next.parent;
    }

    console.log(path)
}

function draw() {
}