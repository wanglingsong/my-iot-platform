export class Link {

	constructor(source, target, formatter) {
		this.source = null;
		this.target = null;
		this.formatter = formatter;
		let p = this;
		source.onConnected(function () {
			p.setSource(source);
		});
		source.onDisconnected(function () {
			p.setSource(null);
		});
		target.onConnected(function () {
			p.setTarget(target);
		});
		target.onDisconnected(function () {
			p.setTarget(null);
		});
	}

	setSource(source) {
		if (source && this.target && !this.source) {
			this.source = source;
			this.link();
		} else {
			this.source = source;
		}
		if (!this.source) {
			this.delink();
		}
	}

	setTarget(target) {
		if (target && this.source && !this.target) {
			this.target = target;
			this.link();
		} else {
			this.target = target;
		}
		if (!this.target) {
			this.delink();
		}
	}

	link() {
		console.log('linked');
		let p = this;
		this.source.startReading(function (data) {
			p.target.write(p.formatter ? p.formatter.format(data) : data);
		});
	}

	delink() {
		this.source.stopReading();
	}

}