# demo-bot-plugin [![Build Status](https://travis-ci.org/dohjon/demo-bot-plugin.svg?branch=master)](https://travis-ci.org/dohjon) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

> Demo Bot Core Plugin functionality


## Install

```
$ npm install --save demo-bot-plugin
```


## Usage

```js
const Plugin = require('demo-bot-plugin');

// create plugin

const plugin = new Plugin({
	name: 'test',
	questions: [{
			type: 'list',
			name: 'theme',
			message: 'What do you want to do?',
			choices: [
				'Order a pizza',
				'Make a reservation'
			]
	}],
	handler: (answers) => {
		console.log(answers);
	}
})

// run plugin

plugin.run();
```


## API

### Plugin(config)

Returns a `Plugin` instance.

#### config

##### name

Type: `string`<br>
Required: `true`

Plugin nameentifier.

##### questions

Type: `object[]`<br>
Default: `[]`

Questions to be prompted ([`Inquerier Questions`](https://github.com/SBoudrias/Inquirer.js#questions))

##### handler

Type: `Function`<br>
Default: `answers => {}`

Handler that gets called with answers after user answers questions.

##### before

Type: `Function`<br>
Default: `() => {}`

Hook that gets called before. Makes it possible to perform any actions before questions, handler or run is called.

```js
const plugin = new Plugin({
	name: 'test',
	questions: [{
			type: 'list',
			name: 'theme',
			message: 'What do you want to do?',
			choices: [
				'Order a pizza',
				'Make a reservation'
			]
	}],
	before: () => {
		// remove question
		this.questions.pop();
	},
	handler: answers => {
		console.log(answers);
	}
})
```

## Related

- [demo-bot](https://github.com/dohjon/demo-bot) - Demo Bot
- [Inquirer](https://github.com/SBoudrias/Inquirer.js) - Inquirer

## License

MIT © [Jonathan Doherty](https://github.com/dohjon)
