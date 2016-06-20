/**
 * Copyright (C) 2016 yanni4night.com
 * index.js
 *
 * changelog
 * 2016-06-16[13:06:53]:revised
 * 2016-06-20[13:37:51]:change order
 *
 * @author yanni4night@gmail.com
 * @version 2.0.0
 * @since 1.0.0
 */
'use strict';

const colors = require('colors/safe');
const WritableStream = require('stream').Writable;

const themes = {
    data: 'grey',
    help: 'cyan',
    debug: 'blue',
    info: 'green',
    warn: 'yellow',
    error: 'red'
};

const noop = n => n;

colors.setTheme(themes);

const functions = Object.keys(themes);

let currentLevel = functions[0];
let currentOutStream = process.stdout;
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

functions.forEach(func => {
    exports[func] = (...args) => {
        return new Promise(resolve => {
            if (functions.indexOf(func) >= functions.indexOf(currentLevel)) {
                currentOutStream.write((stopColor ? noop : colors[func])(
                    `[${new Date().toISOString()}][${func[0].toUpperCase()}]`) + args.map((
                    stopColor ? noop : colors[func])).join(
                    ' ') + '\n', 'utf-8', () => {
                    resolve();
                });
            } else {
                reject(new Error(`${func} < ${currentLevel}`));
            }
        });
    };
});