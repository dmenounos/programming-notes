/**
 * A rough promise prototype (v3).
 * 
 * In general a promise binds a producer with one or more consumers.
 * 
 * One aspect of the design is that it allows the producer to invoke the 
 * interested consumer parties without having to have direct knowledge of them.
 * 
 * Producer -> Promise resolve() or reject() -> Consumer success() or failure().
 * 
 * Another aspect is that promise allows the chaining of a sequence of consumers.
 * 
 * The purpose of this class is to demonstrate how this binding and chaining works.
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

				if (result instanceof MyPromise) {
					// The client callback provided its own next promise.
					// Move the control to the next promise - provided by the client.
					// Note we only delegate control of invoking the next promise callbacks.
					// The chain wirining is still maintained inside these next promise callbacks.
					result.then(nextPromise._success, nextPromise._failure);
				}
				else {
					// Forward the flow to the next promise - provided by us.
					resolve(result);
				}
			};

			this._failure = (result) => {

				// Invoke the callback of current promise.
				result = onFailure(result);

				if (result instanceof MyPromise) {
					// The client callback provided its own next promise.
					// Move the control to the next promise - provided by the client.
					// Note we only delegate control of invoking the next promise callbacks.
					// The chain wirining is still maintained inside these next promise callbacks.
					result.then(nextPromise._success, nextPromise._failure);
				}
				else {
					// Forward the flow to the next promise - provided by us.
					reject(result);
				}
			};
		});

		return nextPromise;
	}
}

//
// Chain of callbacks.
//
// Client Promise #C1
// - Proxy Callback ( Client Callback #1, Intermediate Promise #I2 )
//
// Intermediate Promise #I2
// - Proxy Callback ( Client Callback #2, Intermediate Promise #I3 )
//
function test1(outcome) {
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

//
// Chain of callbacks and promises.
//
// Client Promise #C1
// - Proxy Callback ( Client Callback #1, Intermediate Promise #I2 )
//
// Intermediate Promise #I2
// - Proxy Callback ( Client Callback #2, Intermediate Promise #I3 )
//
// Intermediate Promise #I3
// - Proxy Callback ( Client Callback #3, Intermediate Promise #I4 )
//
// ---
//
// Client Promise #C2 - returned from Client Callback #1 - overrides Intermediate Promise #I2
// - Proxy Callback [ Proxy Callback ( Client Callback #2, Intermediate Promise #I3 ), Intermediate Promise #I5 ]
//
// Client Promise #C3 - returned from Client Callback #2 - overrides Intermediate Promise #I3
// - Proxy Callback [ Proxy Callback ( Client Callback #3, Intermediate Promise #I4 ), Intermediate Promise #I6 ]
//
function test2(outcome) {
	new MyPromise((resolve, reject) => {
		outcome ? resolve('ok') : reject('ko');
	})
	.then(
		(result) => {
			console.log('onSuccess #1 ' + result);
			return new MyPromise((resolve, reject) => {
				setTimeout(() => { resolve(result); }, 1000);
			});
		},
		(result) => {
			console.log('onFailure #1 ' + result);
			return new MyPromise((resolve, reject) => {
				setTimeout(() => { reject(result); }, 1000);
			});
		}
	)
	.then(
		(result) => {
			console.log('onSuccess #2 ' + result);
			return new MyPromise((resolve, reject) => {
				setTimeout(() => { resolve(':)'); }, 1000);
			});
		},
		(result) => {
			console.log('onFailure #2 ' + result);
			return new MyPromise((resolve, reject) => {
				setTimeout(() => { reject(':('); }, 1000);
			});
		}
	)
	.then(
		(result) => {
			console.log('onSuccess #3 ' + result);
		},
		(result) => {
			console.log('onFailure #3 ' + result);
		}
	);
}
