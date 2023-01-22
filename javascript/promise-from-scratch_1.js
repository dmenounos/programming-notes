/**
 * A rough promise prototype (v1).
 * 
 * This version does not support chaining of multiple consumers.
 * 
 * It demonstrates however the basic binding structure. In particular we can 
 * see how the callbacks are invoked in a deferred manner so that they can be 
 * set after the promise creation but during the same execution cycle.
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
		this._success = onSuccess;
		this._failure = onFailure;
	}
}

//
// Single callback pair.
//
function test(outcome) {
	new MyPromise((resolve, reject) => {
		outcome ? resolve('ok') : reject('ko');
	})
	.then(
		(result) => {
			console.log('onSuccess ' + result);
			return ':)';
		},
		(result) => {
			console.log('onFailure ' + result);
			return ':(';
		}
	);
}
