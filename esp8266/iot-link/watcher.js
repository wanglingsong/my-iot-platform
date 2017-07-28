function Watcher() {
    this.s = null;
    this.t = null;
}

Watcher.prototype.sourceReady = function(s) {
    var linkedBefore = this.s && this.t;
    this.s = s;
    var linkedAfter = this.s && this.t;
    if (!linkedBefore && linkedAfter) {
        this.link();
    }
    if (linkedBefore && !linkedAfter) {
        this.delink();
    }
};

Watcher.prototype.targetReady = function(t) {
    var linkedBefore = this.s && this.t;
    this.t = t;
    var linkedAfter = this.s && this.t;
    if (!linkedBefore && linkedAfter) {
        this.link();
    }
    if (linkedBefore && !linkedAfter) {
        this.delink();
    }
}

Watcher.prototype.link = function() {
    console.log('linked');
    var p = this;
    p.s.startReading(function(data) {
        p.t.write(data);
    });
}

Watcher.prototype.delink = function() {
    this.s.stop();
    this.t.stop();
}

exports.createWatcher = function() {
    return new Watcher();
}