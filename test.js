'use strict';

import test from 'ava';
import Plugin from './';

test('plugin constructor requires object', t => {
	const error = t.throws(() => {
		// eslint-disable-next-line no-unused-vars
		const plugin = new Plugin();
	});
	t.is(error.message, `Cannot match against 'undefined' or 'null'.`);
});

test(`plugin constructor requires 'name'`, t => {
	const error = t.throws(() => {
		// eslint-disable-next-line no-unused-vars
		const plugin = new Plugin({});
	});
	t.is(error.message, `Expected 'name' to be a string, got undefined`);
});

test(`'name' must contain a value`, t => {
	const error = t.throws(() => {
		// eslint-disable-next-line no-unused-vars
		const plugin = new Plugin({name: ''});
	});
	t.is(error.message, `Expected 'name' to contain a value, got ''`);
});

test(`plugin has default 'handler' method`, t => {
	const plugin = new Plugin({name: 'test'});
	t.not(typeof plugin._handler, 'undefined');
	t.is(typeof plugin._handler, 'function');
});

test(`'handler' method should be a function`, t => {
	const error = t.throws(() => {
		// eslint-disable-next-line no-unused-vars
		const plugin = new Plugin({name: 'test', handler: ''});
	});
	t.is(error instanceof TypeError, true);
});

test(`calling 'handler' should return a promise`, t => {
	const plugin = new Plugin({name: 'test', handler: () => { }});
	t.is(typeof plugin.handler().then, 'function');
});

test(`handler throws`, async t => {
	const handler = () => {
		throw new Error('error');
	};
	const plugin = new Plugin({name: 'test', handler});
	const error = await t.throws(plugin.handler());
	t.is(error.message, 'error');
});

test(`handler does not throw`, async t => {
	const handler = () => 'success';
	const plugin = new Plugin({name: 'test', handler});
	const result = await t.notThrows(plugin.handler());
	t.is(result, 'success');
});

test(`plugin has default 'before' method`, t => {
	const plugin = new Plugin({name: 'test'});
	t.not(typeof plugin._before, 'undefined');
	t.is(typeof plugin._before, 'function');
});

test(`'before' method should be a function`, t => {
	const error = t.throws(() => {
		// eslint-disable-next-line no-unused-vars
		const plugin = new Plugin({name: 'test', before: ''});
	});
	t.is(error instanceof TypeError, true);
});

test(`calling 'before' should return a promise`, t => {
	const plugin = new Plugin({name: 'test', before: () => { }});
	t.is(typeof plugin.before().then, 'function');
});

test(`before throws`, async t => {
	const before = () => {
		throw new Error('error');
	};
	const plugin = new Plugin({name: 'test', before});
	const error = await t.throws(plugin.before());
	t.is(error.message, 'error');
});

test(`before does not throw`, async t => {
	const before = () => 'success';
	const plugin = new Plugin({name: 'test', before});
	const result = await t.notThrows(plugin.before());
	t.is(result, 'success');
});

test(`plugin has default 'questions' property`, t => {
	const plugin = new Plugin({name: 'test'});
	t.not(typeof plugin._questions, 'undefined');
	t.is(Array.isArray(plugin._questions), true);
});

test(`'questions' property should be an array`, t => {
	const error = t.throws(() => {
		// eslint-disable-next-line no-unused-vars
		const plugin = new Plugin({name: 'test', questions: ''});
	});
	t.is(error instanceof TypeError, true);
});

test(`plugin has 'run' method`, t => {
	const plugin = new Plugin({name: 'test'});
	t.not(typeof plugin.run, 'undefined');
	t.is(typeof plugin.run, 'function');
});

test(`plugin has default 'run' method`, t => {
	const plugin = new Plugin({name: 'test'});
	t.not(typeof plugin.run, 'undefined');
	t.is(typeof plugin.run, 'function');
});

test(`calling 'run' should return a promise`, t => {
	const plugin = new Plugin({name: 'test'});
	t.is(typeof plugin.run().then, 'function');
});

test(`plugin has default 'data' property`, t => {
	const plugin = new Plugin({name: 'test'});
	t.not(typeof plugin._data, 'undefined');
});

test(`'data' property should be an object`, t => {
	const plugin = new Plugin({name: 'test'});
	t.is(typeof plugin._data, 'object');
});
