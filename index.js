'use strict';

const debug = require('debug')('demo-bot-plugin');
const inquirer = require('inquirer');

class Plugin {
	// eslint-disable-next-line no-unused-vars
	constructor({id, questions = [], handler = answers => {}, before = () => {}}) {
		if (typeof id !== 'string') {
			throw new TypeError(`Expected 'id' to be a string, got ${typeof id}`);
		}
		if (!id) {
			throw new TypeError(`Expected 'id' to contain a value, got '${id}'`);
		}
		if (!Array.isArray(questions)) {
			throw new TypeError(`Expected 'questions' to be an array, got ${typeof questions}`);
		}
		if (typeof handler !== 'function') {
			throw new TypeError(`Expected 'handler' to be a function, got ${typeof handler}`);
		}
		if (typeof before !== 'function') {
			throw new TypeError(`Expected 'before' to be a function, got ${typeof handler}`);
		}

		this._id = id;
		this._questions = questions;
		this._handler = handler;
		this._before = before;
	}

	handler(answers) {
		return Promise.resolve()
			.then(() => {
				return this._handler(answers);
			})
			.catch(err => {
				throw err;
			});
	}

	before() {
		return Promise.resolve()
			.then(() => {
				return this._before();
			})
			.catch(err => {
				throw err;
			});
	}

	run() {
		debug(`running plugin ${this._id}`);

		return this.before()
			.then(() => inquirer.prompt(this._questions))
			.then(answers => {
				debug(`plugin: ${this.id} answers received: ${JSON.stringify(answers, null, 2)}`);
				return this._handler(answers);
			})
			.then(result => {
				debug(`plugin ${this._id} ran succesfully`);
				return result;
			})
			.catch(err => {
				debug(`plugin ${this._id} failed!`);
				throw err;
			});
	}
}

module.exports = Plugin;
