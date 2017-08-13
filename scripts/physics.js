function Physics() {
	this.pos = createVector(width/2, height/1.2)
	this.vel = createVector(0, -0.1)
	
	this.update = function(acc) {
		this.vel.add(acc)
		this.pos.add(this.vel)
	}
}