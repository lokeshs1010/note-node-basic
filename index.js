const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');


const titleOption = {
    describe: 'This is title of Note',
    demand: true,
    alias: 't'
}
const bodyOption = {
    describe: 'This is body of Note',
    demand: true,
    alias: 'b'
}
const argv = yargs
    .command('add', 'Add a new Note', {
        title: titleOption,
        body: bodyOption 
    })
    .command('list', 'Print all notes')
    .command('read', 'Print single note', {
        title: titleOption
    })
    .command('remove', 'Remove the note', {
        title: titleOption
    })
    .help()
    .argv;

const command = argv._[0];

if (command === 'list') {
    let allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} notes`)
    allNotes.forEach(note => notes.logNote(note));
    
} else if (command === 'add' ) {
    let note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note created')
        notes.logNote(note);
    } else {
        console.log('Note title already exists')
    }
    
} else if (command === 'read' ) {
    let note = notes.getNote(argv.title);
    if (note) {
        console.log('Note found')
        notes.logNote(note);
    } else {
        console.log('Note title does not exists')
    }
    
} else if (command === 'remove') {
    let noteRemoved = notes.removeNote(argv.title);
    let message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
    
} else {
    console.log('Command not recognized');
    
}

