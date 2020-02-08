function Graph() {
    this.nodes = [];
    this.graph = {};
    this.end = null;
    this.start = null;
}

Graph.prototype.reset = function () {
    for (var i = 0; i < this.nodes.length; i++) {
        this.nodes[i].searched = false;
        this.nodes[i].parent = null;
    }
}

Graph.prototype.addNode = function (n) {
    // Node into Array
    this.nodes.push(n);
    var name = n.value;
    // Node into "Hash"
    this.graph[name] = n;
}

Graph.prototype.getNode = function (name) {
    var n = this.graph[name];
    return n;
}

Graph.prototype.setStart = function (name) {
    this.start = this.graph[name];
    return this.start;
}

Graph.prototype.setEnd = function (name) {
    this.end = this.graph[name];
    return this.end;
}