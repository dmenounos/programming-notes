/**
 * A rough promise prototype. 
 * 
 * In general a promise binds a producer with one or more consumers.
 * 
 * One important aspect of the design is that it allows the producer to invoke 
 * the interested consumer parties without having direct knowledge of them.
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

		// The magic of the chaining happens here.

		// Instead of assigning the callbacks of the client directly, we create and return an intermediate promise. 
		// The intermediate promise has a custom producer that wraps and augments the callbacks of the client with proxies. 
		// The proxies invoke the client callbacks and then forward the flow to the intermediate promise's resolve / reject.

		// This way the client, which will receive the intermediate promise as a result, can chain further callbacks.

		// BTW some technical points of interest regarding the intermediate producer.

		// 1. It has simple and direct access to the current promise "this" because it is an arrow function.
		//    Had it been a classic function we would have to capture it in a local variable and through closure.
		// 2. It also has access to the resolve / reject of the intermediate promise (next in chain).
		// 3. The client callback variables are captured through closure. No need to store them.

		return new MyPromise((resolve, reject) => {
			this._success = (result) => {
				resolve(onSuccess(result));
			};
			this._failure = (result) => {
				reject(onFailure(result));
			};
		});
	}
}

// TEST

new MyPromise((resolve, reject) => {
	resolve('ok');
//	reject('ko');
})
.then(
	(result) => {
		console.log('onSuccess#1 ' + result);
		return ':)';
	},
	(result) => {
		console.log('onFailure#1 ' + result);
		return ':(';
	}
)
.then(
	(result) => {
		console.log('onSuccess#2 ' + result);
	},
	(result) => {
		console.log('onFailure#2 ' + result);
	}
);
