const fs = require('fs');

let fetchNote = () => {
    try {
        let noteString = fs.readFileSync('notes-data.json');
        return JSON.parse(noteString);
    }
    catch (e) {
        return [];
    }
}

let saveNote = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

let addNote = (title, body) => {
    let notes = fetchNote();
    let note = {
        title,
        body
    }

    let duplicateNotes = notes.filter( (note) => note.title === title);

    if(duplicateNotes.length === 0) {
        notes.push(note);
        saveNote(notes);
        return note;
    }    
};

let getAll = () => {
    return fetchNote();
    
};

let getNote = (title) => {
    let notes = fetchNote();
    let filteredNotes = notes.filter( (note) => note.title === title);
    return filteredNotes[0];
    
}

let removeNote = (title) => {
    let notes = fetchNote();
    let filteredNotes = notes.filter( (note) => note.title !== title);
    saveNote(filteredNotes);
    return notes.length !== filteredNotes.length;
}

let logNote = (note) => {
    debugger
    console.log(`Title : ${note.title}`)
    console.log(`Body : ${note.body}`)
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
}