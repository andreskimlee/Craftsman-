// import coordinatesToTraverse file. 
const coordinatesToTraverse = require('./coordinatesToTraverse')
//==================//
// 		Part 1	 	//
//==================//

var userBalance = 0;

// Gets called whenever the money finished tweening to the bottom.
function addFromCatch(value) {
	if (typeof userBalance === "string") {
		userBalance = parseInt(userBalance.split(",").join(""))
	}

	userBalance += parseInt(value);
	userBalance = formatNum(userBalance);

}

// Gets called every frame. 
// Time elapsed since the last update is passed into the function(milliseconds)
function onUpdate({ delta }) {
	setTimeout(updateBalance(userBalance), 2000);
}

// updates integer to dollar format. 
function formatNum(nStr) {
	nStr += '';
	var x = nStr.split('.');
	var x1 = x[0];
	var x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}


//==================//
// 		Part 2	 	//
//==================//

function processSlots(input) {
	let totalPoints = 0;

	let newDict = {};

	Object.keys(coordinatesToTraverse).forEach(combo => {
		// console.log(coordinatesToTraverse[combo])
		coordinatesToTraverse[combo].forEach(coordinate => {
			// console.log(coordinate)
			let x = coordinate[0]
			let y = coordinate[1]
			if (!newDict[combo]) {
				newDict[combo] = [input[x][y]]
			} else {
				newDict[combo].push(input[x][y])
			}
		})
	})


	Object.keys(newDict).forEach(ele => {
		let dictCounter = {}
		let counter = 1
		for (let j = 0; j < 5; j++) {
			let curr = newDict[ele][j]
			let next = newDict[ele][j + 1] // if neighboring add to counter 
			if (curr === next) {
				counter += 1
			} else {
				counter = 1 // reset counter if not contiguous
			}

			if (dictCounter[curr]) { // if ele exists, then we check to update counter. 
				dictCounter[curr] = Math.max(dictCounter[curr], counter)
			} else {
				dictCounter[curr] = counter
			}


		}

		totalPoints += calculatePoints(dictCounter)
	})


	return totalPoints
};


function calculatePoints(row) {
	let points = 0;
	const pointCounter = {
		'1': { '3': 5, '4': 10, '5': 20 },
		'2': { '3': 10, '4': 25, '5': 50 },
		'3': { '3': 25, '4': 50, '5': 100 },
	}

	Object.keys(row).forEach(ele => {
		if (pointCounter[ele]) {
			if (pointCounter[ele][row[ele]]) {
				points += pointCounter[ele][row[ele]]
			}
		}
	})

	return points;

}


// examples input
var array = [
	[1, 0, 0, 0, 1],
	[0, 1, 0, 1, 0],
	[0, 0, 1, 0, 0]
]
//Output: '1 winning line, scoring 20 points.'


var array2 = [
	[2, 4, 2, 2, 3],
	[1, 1, 1, 4, 1],
	[3, 3, 3, 4, 2]
];

//Output: '2 winning line, scoring 30 points.'

var array3 = [
	[2, 4, 2, 2, 2],
	[1, 2, 1, 2, 1],
	[3, 3, 2, 4, 2]
];
//Output: '3 winning lines, scoring a total 85 points.'

// Testing
console.log(processSlots(array))
console.log(processSlots(array2))
console.log(processSlots(array3))



