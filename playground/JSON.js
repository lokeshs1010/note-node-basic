const fs = require('fs');

let originalNote = {
    name : 'Lokesh',
    age : 22
}

let originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync('notes.json', originalNoteString);

let noteString = fs.readFileSync('notes.json');
let note = JSON.parse(noteString);

console.log(typeof note);
console.log(note.name);
