console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const argv = yargs.argv;
let command = argv._[0];
console.log('yargs ', argv)

if(command === 'add'){
	let note = notes.addNote(argv.title, argv.body);
	if(note){
		notes.logNote(note);
	} else console.log('Title already in use')
}
else if(command === 'list'){
	notes.getAll();
}
else if(command === 'read') {
	let note = notes.getNote(argv.title);
	if(note) notes.logNote(note)
	else console.log('Note not found')
}
else if(command === 'remove') {
	let noteRemoved = notes.removeNote(argv.title);
	console.log(noteRemoved ? `Note: ${argv.title} successfully removed` : `Note: ${argv.title} not found`)
}
else console.log('Invalid command');