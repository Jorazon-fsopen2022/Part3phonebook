const mongoose = require("mongoose");

if (process.argv.length < 3) {
	console.log("Please provide the password as an argument: node mongo.js <password>");
	process.exit(1);
}

const password = process.argv[2];

const database = "phonebook";

const url = `mongodb+srv://fullstack:${password}@fullstackopen.umbkn.mongodb.net/${database}?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

personSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Person = mongoose.model("Person", personSchema);

mongoose.connect(url).then(() => {
	if (process.argv[3] && process.argv[4]) {
		const name = process.argv[3];
		const number = process.argv[4];

		const person = new Person({
			name: name,
			number: number,
		});

		person.save().then((result) => {
			console.log(`added ${name} number ${number} to phonebook`);
			mongoose.connection.close();
		});
	} else {
		Person.find({}).then((result) => {
			console.log("phonebook:");
			result.forEach((person) => {
				console.log(`${person.name} ${person.number}`);
			});
			mongoose.connection.close();
		});
	}
});
