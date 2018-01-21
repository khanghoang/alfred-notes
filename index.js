'use strict';
const alfy = require('alfy');
const { spawn } = require('child_process');
const score = require('string-score');
const { sortBy, map, filter, reverse } = require('lodash/fp');
const path = require('path');

const searchPath = '/Users/khoangtrieu/Notes';
const searchExec = spawn(`find`, ['/Users/khoangtrieu/Notes']);

const needle = alfy.input || '';

new Promise(resolve => {
    let results;
    searchExec.stdout.on('data', data => {
        results = data.toString();
    });
    searchExec.on('close', () => {
        return resolve(results);
    });
})
    .then(data => {
        const newData = data.split('\n');
        return newData;
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
