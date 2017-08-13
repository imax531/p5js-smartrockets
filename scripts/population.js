function Population(size, ticks) {
	
	this.maxdist = createVector(0, 0).dist(createVector(width, height))
	this.rockets = []
	for (let i = 0; i < size; i++) {
		this.rockets.push(new Rocket(ticks))
		this.rockets[i].init()
	}
	
	this.update = function(cur) {
		for (let i = 0; i < size; i++) {
			this.rockets[i].update(cur)
		}
	}
	
	this.show = function() {
		for (let i = 0; i < size; i++) {
			this.rockets[i].show()
		}
	}
	
	this.gettop = function(c, t) {
		scores = []
		for (let i = 0; i < size; i++)
			scores.push(this.rockets[i].score(t))
		sortedscores = []
		arrayCopy(scores, sortedscores)
		sortedscores = sort(sortedscores)
		np = []
		for (let i = 1; i <= c; i++)
			for (let j = 0; j < size; j++)
				if (scores[j] == sortedscores[sortedscores.length-i]) {
					np.push(this.rockets[j])
					break;
				}
		return np;
	}
	
	this.newPopulation = function(t) {
		topmembers = this.gettop(size*0.1, t)
		this.rockets = []
		for (let i = 0; i < size; i++)
			this.rockets.push(random(topmembers).merge(random(topmembers)))
	}
	
	this.newPopulation2 = function(t) {
		let matingpool = []
		for (let i = 0; i < size; i++) {
			let score = 0
			score = map(t.dist(this.rockets[i].transform.pos), 
						0, this.maxdist, 300, 0)
			if (this.rockets.completed)	score *= score
			else if (this.rockets.dead)	score *= 0.5
			
			for (let j = 0; j < score; j++)
				matingpool.push(this.rockets[i])
		}
		
		this.rockets = []
		for (let i = 0; i < size; i++)
			this.rockets.push(random(matingpool).merge2(random(matingpool)))
	}
	
}