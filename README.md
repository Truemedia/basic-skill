# Basic skill
A basic skill for Mind Stack that can say hello and goodbye in many different ways

## Installation

NPM
```bash
    npm i --save basic-skillset
```

Yarn
```bash
    yarn add basic-skillset
```

## Usage
Node
```js
    const Bot = require('mindstack');
    const BasicSkill = require('basic-skillset');

    let botInstance = new Bot()
      .addSkill(BasicSkill) // Basic skill
```
