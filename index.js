/**
 * Copyright (C) 2016 yanni4night.com
 * index.js
 *
 * changelog
 * 2016-06-16[13:06:53]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */
'use strict';

const colors = require('colors/safe');
const WritableStream = require('stream').Writable;

const themes = {
    info: 'green',
    data: 'grey',
    help: 'cyan',
    debug: 'blue',
    warn: 'yellow',
    error: 'red'
};

colors.setTheme(themes);

const functions = Object.keys(themes);

let currentLevel = functions[0];
let currentOutStream;
let stopColor = false;

const setLevel = exports.setLevel = level => {
    if (~functions.indexOf(level)) {
        currentLevel = level;
    }
    return currentLevel;
};

const setOutStream = exports.setOutStream = stream => {
    if (!stream) {
        throw new Error(colors.red(`"outStream" should be a writable stream`))
    }
    stopColor = true;
    return (currentOutStream = stream);
}

setLevel(process.env.ANTIARIS_LOG_LEVEL);
setOutStream(process.stdout);

functions.forEach(func => {
    exports[func] = (...args) => {
        return new Promise(resolve => {
            if (functions.indexOf(func) >= functions.indexOf(currentLevel)) {
                currentOutStream.write(`[${new Date().toISOString()}]` +
                    `[${func[0].toUpperCase()}]` + (
                        stopColor ? args.join(' ') : args.map(
                            colors[func]).join(' ')) + '\n', 'utf-8', () => {
                        resolve();
                    });
            } else {
                reject(new Error(`${func} < ${currentLevel}`));
            }
        });
    };
});