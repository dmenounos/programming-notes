

// [1]

let p = Promise.resolve(); // <-- Default Promise

for (let i = 0; i < 10; ++i) {
	p = p.then(() => {
		console.log(i);
		// <-- We do not return value, thus a default will be created
	});
}


// [2]

/**
 * Creates a Promise with a producer that invokes the consumer immediatelly.
 */
let makeImmediatePromise = () => {
	return new Promise((resolve) => {
		console.log('Immediate Promise Init');
		resolve();
	});
}

let ip = makeImmediatePromise();

for (let i = 0; i < 10; ++i) {
	console.log('loop ' + i);
	ip = ip.then(() => {
		console.log('then ' + i);
		return makeImmediatePromise();
	});
}


// [3]

/**
 * Creates a Promise with a producer that invokes the consumer after a delay.
 */
let makeDelayedPromise = () => {
	return new Promise((resolve) => {
		console.log('Delayed Promise Init');
		setTimeout(() => { resolve(); }, 1000);
	});
};

let dp = makeDelayedPromise();

for (let i = 0; i < 10; ++i) {
	console.log('loop ' + i);
	dp = dp.then(() => {
		console.log('then ' + i);
		return makeDelayedPromise();
	});
}
