const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const titleOptions = {
	describe: 'Note title',
	demand: true,
	alias: 't'
}

let bodyOptions = {
	describe: 'Note body',
	demand: true,
	alias: 'b'
}

const argv = yargs.command('add', 'Add a new note', {
	title: titleOptions,
	body: bodyOptions
	})
	.command('list', 'List all note')
	.command('read', 'Fetch a note', {
		title: titleOptions
	})
	.command('remove', 'Remove a note',{
		title:titleOptions
	})
	.help().argv;
let command = argv._[0];

if(command === 'add'){
	let note = notes.addNote(argv.title, argv.body);
	if(note){
		notes.logNote(note);
	} else console.log('Title already in use')
}
else if(command === 'list'){
	let allNotes = notes.getAll();
	console.log(`Printing all ${allNotes.length} notes`);
	allNotes.forEach((note) => notes.logNote(note));
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