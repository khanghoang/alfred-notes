const alfy = require('alfy');
const openInEditor = require('open-in-editor'); 

const editor = openInEditor.configure({
    editor: 'code',
});

editor.open(alfy.input);
