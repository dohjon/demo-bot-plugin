'use strict';

const debug = require('debug')('demo-bot-plugin');
const inquirer = require('inquirer');

class Plugin {
	// eslint-disable-next-line no-unused-vars
	constructor({name, questions = [], data = {}, handler = answers => {}, before = () => {}}) {
		if (typeof name !== 'string') {
			throw new TypeError(`Expected 'name' to be a string, got ${typeof name}`);
		}
		if (!name) {
			throw new TypeError(`Expected 'name' to contain a value, got '${name}'`);
		}
		if (!Array.isArray(questions)) {
			throw new TypeError(`Expected 'questions' to be an array, got ${typeof questions}`);
		}
		if (typeof data !== 'object') {
			throw new TypeError(`Expected 'data' to be an object, got ${typeof data}`);
		}
		if (typeof handler !== 'function') {
			throw new TypeError(`Expected 'handler' to be a function, got ${typeof handler}`);
		}
		if (typeof before !== 'function') {
			throw new TypeError(`Expected 'before' to be a function, got ${typeof handler}`);
		}

		this._name = name;
		this._questions = questions;
		this._data = data;
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
		debug(`running plugin ${this._name}`);

		return this.before()
			.then(() => inquirer.prompt(this._questions))
			.then(answers => {
				debug(`plugin: ${this.name} answers received: ${JSON.stringify(answers, null, 2)}`);
				return this._handler(answers);
			})
			.then(result => {
				debug(`plugin ${this._name} ran succesfully`);
				return result;
			})
			.catch(err => {
				debug(`plugin ${this._name} failed!`);
				throw err;
			});
	}
}

module.exports = Plugin;
