
# JavaScript Array Iteration

Given an array such as:

	var a = [ ... ];

## Index Loop

	for (let i = 0; i < a.length; i++) {
		let c = a[i];
	}

## Reverse Index Loop

	for (let i = a.length; i > 0; i--) {
		let c = a[i - 1];
	}

## ForEach Loop

	for (let e of a) {
	}

	a.forEach(el => console.log(e));
