function Rocket(ticks) {
	this.transform = new Physics()
	this.boosters = []
	this.completed = false
	this.dead = false
	this.mutationprob = 0.01
	
	this.initbooster = function(i) {
		let scale = 0.5
		this.boosters[i] = createVector(random(scale)-scale/2, random(scale)-scale/2)
	}
	
	this.init = function() {
		for (let i = 0; i < ticks; i++)
			this.initbooster(i)
	}
	
	this.update = function(t) {
		if (!this.dead)
			this.transform.update(this.boosters[t])
		if (this.transform.pos.x > width || this.transform.pos.x < 0 ||
			this.transform.pos.y > height || this.transform.pos.y < 0)
			this.die()
	}
	
	this.show = function() {
		push()
		noStroke()
		fill(0, 255, 0)
		translate(this.transform.pos.x, this.transform.pos.y)
		rotate(this.transform.vel.heading())
		triangle(8, 0,
				 -5, 4,
				 -5, -4)
		pop()
	}
	
	this.merge = function(r) {
		let rocketret = new Rocket(ticks)
		for (let i = 0; i < ticks; i++) {
			if (random(1) < 0.5)
				rocketret.boosters.push(this.boosters[i])
			else 
				rocketret.boosters.push(r.boosters[i])
			if (random(1) < this.mutationprob)
					rocketret.initbooster(i)
		}
		return rocketret
	}
	
	this.merge2 = function(r) {
		let rocketret = new Rocket(ticks)
		mid = ticks/2
		for (let i = 0; i < ticks; i++) {
			if (i < mid)
				rocketret.boosters.push(this.boosters[i])
			else 
				rocketret.boosters.push(r.boosters[i])
			if (random(1) < this.mutationprob)
					rocketret.initbooster(i)
		}
		return rocketret
	}
	
	this.reachedtarget = function() {
		this.completed = true
		this.die()
	}
	
	this.die = function() {
		this.dead = true
	}
	
	this.score = function(t) {
		return 1/t.dist(this.transform.pos)
	}
}