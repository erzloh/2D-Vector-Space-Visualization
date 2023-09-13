// Define canvas variables
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 800;
canvas.height = canvas.width * (9.0 / 16.0);

// Define vector space class
function VectorSpace() {
	this.origin = new Vec2(0, 0);

	// Initialize an object of vectors
	this.vectors = {
		initial: [],
		transition: [],
		final: []
	}
	
	// Initialize an object of points
	this.points = {
		initial: [],
		transition: [],
		final: []
	}

	// Initialize array of matrices
	this.matrices = [];

	this.addVector = function(x, y) {
		this.vectors.initial.push(new Vec2(x, y));
		this.vectors.transition.push(new Vec2(x, y));
		this.vectors.final.push(new Vec2(x, y));
	}

	// A point is a vector with a different color
	this.addPoint = function(x, y) {
		this.points.initial.push(new Vec2(x, y));
		this.points.transition.push(new Vec2(x, y));
		this.points.final.push(new Vec2(x, y));
	}

	this.draw = function(opacity) {
		drawOrigin();
		drawAxes();
		drawGrid();

		// Draw the transition vectors
		for (let i = 0; i < this.vectors.transition.length; i++) {
			if (i === 0) {
				drawVector(this.vectors.transition[i], `rgba(0, 255, 0, ${opacity})`);
			}
			else if (i === 1) {
				drawVector(this.vectors.transition[i], `rgba(255, 0, 0, ${opacity})`);
			}
			else {
				drawVector(this.vectors.transition[i], `rgba(162, 14, 179, ${opacity})`);
			}
		}

		// Draw the transition points
		for (let i = 0; i < this.points.transition.length; i++) {
			drawLineBetweenPoints(this.points.transition[i], this.points.transition[(i + 1) % this.points.transition.length], `rgba(0, 0, 0, ${opacity})`);
		}
	}

	this.transform = function(m) {
		// Transform the vectors
		for (let i = 0; i < this.vectors.final.length; i++) {
			this.vectors.final[i].multMat(m);
		}

		// Transform the points
		for (let i = 0; i < this.points.final.length; i++) {
			this.points.final[i].multMat(m);
		}
	}

	this.addMatrix = function(a, b, c, d) {
		this.matrices.push(new Mat2(a, b, c, d));
	}

	this.applyMatrices = function() {
		for (let i = 0; i < this.matrices.length; i++) {
			this.transform(this.matrices[i]);
		}
	}
}

// Define vector class
function Vec2(x, y) {
	this.x = x;
	this.y = y;
	this.add = function(v) {
		this.x += v.x;
		this.y += v.y;
	}
	this.sub = function(v) {
		this.x -= v.x;
		this.y -= v.y;
	}
	this.mult = function(n) {
		this.x *= n;
		this.y *= n;
	}
	this.div = function(n) {
		this.x /= n;
		this.y /= n;
	}
	this.mag = function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	this.normalize = function() {
		let m = this.mag();
		if (m != 0) {
			this.div(m);
		}
	}
	this.multMat = function(m) {
		let x = m.a * this.x + m.b * this.y;
		let y = m.c * this.x + m.d * this.y;
		this.x = x;
		this.y = y;
	}
}

// Define Matrix class
function Mat2(a, b, c, d) {
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
}

// Define drawing functions
const drawLine = (x1, y1, x2, y2, color) => {
	// Invert the y-axis
	y1 = -y1;
	y2 = -y2;

	// Translate the origin to the center of the canvas
	x1 += canvas.width / 2;
	y1 += canvas.height / 2;
	x2 += canvas.width / 2;
	y2 += canvas.height / 2;

	// Draw the line
	c.beginPath();
	c.moveTo(x1, y1);
	c.lineTo(x2, y2);
	c.strokeStyle = color;
	c.stroke();
}

const drawCircle = (x, y, r, color, fill) => {
	// Invert the y-axis
	y = -y;

	// Translate the origin to the center of the canvas
	x += canvas.width / 2;
	y += canvas.height / 2;

	// Draw the circle
	c.beginPath();
	c.arc(x, y, r, 0, Math.PI * 2, false);
	c.strokeStyle = color;
	if (fill === true)
	{
		c.fillStyle = color;
		c.fill();
	}
	c.stroke();
}

const drawVector = (v, color) => {
	drawLine(0, 0, v.x, v.y, color);
	drawCircle(v.x, v.y, 5, color, false);
}

const drawOrigin = () => {
	drawCircle(0, 0, 3, 'black', true);
}

const drawAxes = () => {
	drawLine(-canvas.width / 2, 0, canvas.width / 2, 0, 'rgba(0, 0, 0, 0.3)');
	drawLine(0, -canvas.height / 2, 0, canvas.height / 2, 'rgba(0, 0, 0, 0.3)');
}

const drawGrid = () => {
	// Draw vectical lines
	for (let i = 0; i < canvas.width / 2; i += 10) {
		drawLine(i, -canvas.height / 2, i, canvas.height / 2, 'rgba(0, 0, 0, 0.1)');
	}
	for (let i = 0; i > -canvas.width / 2; i -= 10) {
		drawLine(i, -canvas.height / 2, i, canvas.height / 2, 'rgba(0, 0, 0, 0.1)');
	}

	// Draw horizontal lines
	for (let i = 0; i < canvas.height / 2; i += 10) {
		drawLine(-canvas.width / 2, i, canvas.width / 2, i, 'rgba(0, 0, 0, 0.1)');
	}
	for (let i = 0; i > -canvas.height / 2; i -= 10) {
		drawLine(-canvas.width / 2, i, canvas.width / 2, i, 'rgba(0, 0, 0, 0.1)');
	}
}

const drawLineBetweenPoints = (v1, v2, color) => {
	drawLine(v1.x, v1.y, v2.x, v2.y, color);
}

// Linear interpolation
const lerp = (a, b, t) => {
	return a + (b - a) * t;
}

// ------------------------------ Creating objects ------------------------------
// Initialize vector space
const vs = new VectorSpace();

// Initialize basis vectors
vs.addVector(100, 0);
vs.addVector(0, 100);

// Initialize vectors
vs.addVector(170, 130);
vs.addVector(130, 170);

// Initialize points
vs.addPoint(50, 150);
vs.addPoint(150, 150);
vs.addPoint(150, 50);
vs.addPoint(50, 50);
vs.addPoint(100, 100);


// Add the matrices to the vector space
vs.addMatrix(1, 1, 0, 1); // Shear matrix
vs.addMatrix(0.7, 0, 0, 0.7); // Shrink matrix
let angle = Math.PI / 2;
vs.addMatrix(Math.cos(angle), -Math.sin(angle ), Math.sin(angle), Math.cos(angle)); // Rotation matrix

// Apply the matrices to the vector space
vs.applyMatrices();

// ------------------------------ Animation ------------------------------
let t = 0; // Interpolation percentage (0 <= t <= 1)
let animating = false;
let animationLength = 120; // in frames

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);

	if (animating) {
		if (t <= 1) {
			// Interpolate the vectors between their initial and final values
			for (let i = 0; i < vs.vectors.transition.length; i++) {
				vs.vectors.transition[i].x = lerp(vs.vectors.initial[i].x, vs.vectors.final[i].x, t);
				vs.vectors.transition[i].y = lerp(vs.vectors.initial[i].y, vs.vectors.final[i].y, t);
			}

			// Interpolate the points between their initial and final values
			for (let i = 0; i < vs.points.transition.length; i++) {
				vs.points.transition[i].x = lerp(vs.points.initial[i].x, vs.points.final[i].x, t);
				vs.points.transition[i].y = lerp(vs.points.initial[i].y, vs.points.final[i].y, t);
			}
			t += 1 / animationLength;
		}
		else {
			animating = false;
		}
	}
	vs.draw(1);
}
animate();

// ------------------------------ Event listeners ------------------------------
const button = document.getElementById('transformation-button');

button.addEventListener('click', () => {
	t = 0;
	animating = true;
});