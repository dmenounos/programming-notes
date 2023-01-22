/**
 * A rough promise prototype (v2).
 * 
 * This version adds support for chaining multiple consumers.
 */
class MyPromise {

	constructor(producer) {

		// Resolve & Reject invoke the respective callbacks on the next event loop frame, 
		// so that the client will have time to register them on the current frame.

		const resolve = (result) => {
			setTimeout(() => {
				if (this._success) {
					this._success(result);
				}
			}, 0);
		};

		const reject = (result) => {
			setTimeout(() => {
				if (this._failure) {
					this._failure(result);
				}
			}, 0);
		};

		// Call the producer immediately. No need to store.
		producer(resolve, reject);
	}

	then(onSuccess, onFailure) {

		// The magic of the binding and chaining happens here.

		// Instead of assigning the callbacks of the client directly, we create and return an intermediate promise. 
		// The intermediate promise has a custom producer that wraps and augments the callbacks of the client with proxies. 
		// The proxies invoke the client callbacks and then forward the flow to the intermediate promise's resolve / reject.

		// This way the client, which will receive the intermediate promise as a result, can chain further callbacks.

		// Here are some technical points of interest regarding the custom producer.

		// 1. It captures the client callbacks - through the closure mechanism.
		// 2. It is given access to the resolve / reject of the next in chain promise.
		// 3. It captures the current promise "this" - because it is an arrow function.

		let nextPromise = new MyPromise((resolve, reject) => {

			this._success = (result) => {

				// Invoke the callback of current promise.
				result = onSuccess(result);

				// Forward the flow to the next promise.
				resolve(result);
			};

			this._failure = (result) => {

				// Invoke the callback of current promise.
				result = onFailure(result);

				// Forward the flow to the next promise.
				reject(result);
			};
		});

		return nextPromise;
	}
}

//
// Chain of callback pairs.
//
function test(outcome) {
	new MyPromise((resolve, reject) => {
		outcome ? resolve('ok') : reject('ko');
	})
	.then(
		(result) => {
			console.log('onSuccess #1 ' + result);
			return ':)';
		},
		(result) => {
			console.log('onFailure #1 ' + result);
			return ':(';
		}
	)
	.then(
		(result) => {
			console.log('onSuccess #2 ' + result);
		},
		(result) => {
			console.log('onFailure #2 ' + result);
		}
	);
}
