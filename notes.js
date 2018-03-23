console.log('Starting node.js');

const fs = require('fs');

let fetchNotes = () => {
		try{
		let notesString = fs.readFileSync('notes-data-json');
		return JSON.parse(notesString);
	}
	catch (e){
		return [];
	}
}

let saveNotes = (notes) => {
	fs.writeFileSync('notes-data-json', JSON.stringify(notes));
}


var addNote = (title, body) => {
	let notes = fetchNotes();
	let note = {
			title,
			body
		};

	let duplicates = notes.filter((note) => note.title === title);

	if(duplicates.length === 0){
		notes.push(note);
		saveNotes(notes);
		return note;
	}
};

var getAll = () => {
	console.log('Getting all notes')
};

var getNote = (title) => {
	let notes = fetchNotes();
	let note = notes.filter((note) => note.title === title);
	return note[0];
};

var removeNote = (title) => {
	let notes = fetchNotes();
	let updatedNotes = notes.filter((note) => note.title != title);
	saveNotes(updatedNotes);

	return notes.length !== updatedNotes.length;
}

let logNote = (note) => {
	debugger;
	console.log(`Note \n Title: ${note.title} \n Body: ${note.body}`);
}

module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote,
	logNote
};