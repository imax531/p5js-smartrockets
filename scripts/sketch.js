this.population = []
this.populationlen = 100
this.ticks = 300
this.current = 0
this.obstecles = []
this.obstecleslen = 20
this.mutationprob = 0.01
this.drawing = false

function Obstecle(draw, check) {
	this.draw = draw
	this.check = check
}

function setup() {
	createCanvas(800, 800)
	// to disable right click context menu
	window.addEventListener("contextmenu", function(e) { e.preventDefault(); })
	
	this.target = createVector(height / 4, width/3)
	this.population = new Population(this.populationlen, this.ticks)
	
	// ellipse obstecles
	for (let i = 0; i < this.obstecleslen; i++) {
		pos = createVector(random(width), random(height))
		radius = random(20) + 10
		this.obstecles.push(new Obstecle(
			function(pos, r) {
				return function() {
					fill(100, 100, 255)
					ellipse(pos.x ,pos.y, r)
				}
			}(pos, radius),
			function(pos, r) {
				return function(v) {
					return pos.dist(v) < r
				}
			}(pos, radius)
		))
	}
}

function draw() {
	background(51)
	fill(230, 120, 50)
	noStroke()
	rect(this.target.x, this.target.y, 10, 10)
	if (this.drawing) {
		fill(255, 255, 0)
		rect(this.startObsX, this.startObsY, 
			 mouseX-this.startObsX, mouseY-this.startObsY)
	}
	for (let i = 0; i < this.obstecles.length; i++)
		this.obstecles[i].draw()
	this.current = (this.current + 1) % this.ticks
	if (this.current != 0) {
		this.population.show()
		this.population.update(this.current)
		for (let i = 0; i < this.populationlen; i++) {
			if (this.population.rockets[i].transform.pos.dist(this.target) < 10)
				this.population.rockets[i].reachedtarget()
			for (let j = 0; j < this.obstecles.length; j++)
				if (this.obstecles[j].check(this.population.rockets[i].transform.pos))
					this.population.rockets[i].die()
		}
	} else this.population.newPopulation(target)
}

function mousePressed() {
	if (mouseButton == LEFT) {
		if (!this.drawing) {
			this.startObsX = mouseX
			this.startObsY = mouseY
		} else {
			pos = createVector(min([this.startObsX, mouseX]),
							   min([this.startObsY, mouseY]))
			dims = createVector(abs(mouseX-this.startObsX),
								abs(mouseY-this.startObsY))
			this.obstecles.push(new Obstecle(
				function(pos, dims) {
					return function() {
						fill(255, 255, 0)
						rect(pos.x, pos.y, dims.x, dims.y)
					}
				}(pos, dims),
				function(pos, dims) {
					return function(v) {
						return v.x > pos.x && v.x < pos.x + dims.x &&
							   v.y > pos.y && v.y < pos.y + dims.y
					}
				}(pos, dims)
			))
		}
		this.drawing = !this.drawing
	} else if (mouseButton == RIGHT) {
		if (this.drawing)
			this.drawing = false
		else
			for (let i = 0; i < this.obstecles.length; i++) {
				if (this.obstecles[i].check(createVector(mouseX, mouseY))) {
					this.obstecles.splice(i, 1)
					break;
				}
			}
	}
}



