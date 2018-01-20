'use strict';
const alfy = require('alfy');
const { exec } = require('child_process');
const score = require('string-score');
const { sortBy, map, filter, reverse } = require('lodash/fp');
const path = require('path');

const searchPath = '~/Notes';
const searchExec = `find ${searchPath}`;

const needle = alfy.input;

new Promise(resolve => {
    exec(searchExec, (err, data) => {
        return resolve(data);
    });
})
    .then(data => {
        return data.split('\n');
    })
    .then(map(fullPath => ({
        name: path.basename(fullPath),
        fullPath,
        score: score(fullPath, needle, 0.5)
    })))
    .then(sortBy('score'))
    .then(filter(e => e.fullPath))
    .then(map(entry => ({
        title: entry.name,
        subtitle: entry.fullPath,
        arg: entry.fullPath
    })))
    .then(reverse)
    .then(alfy.output);
