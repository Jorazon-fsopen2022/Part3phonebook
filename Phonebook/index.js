const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.json());

morgan.token("body", (request, response) => {
	return JSON.stringify(request.body);
});
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

app.use(cors());

let persons = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: 3,
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: 4,
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];

app.get("/", (request, response) => {
	response.send("<h1>Hello World!</h1>");
});

app.get("/info", (request, response) => {
	response.send(
		`Phonebook has info for ${persons.length} people<br/><br/>${new Date().toString()}`,
	);
});

app.get("/api/persons", (request, response) => {
	response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	const note = persons.find((note) => note.id === id);
	if (note) {
		response.json(note);
	} else {
		response.status(404).end();
	}
});

const generateId = () => {
	return Math.floor(Math.random() * 10000);
};

app.post("/api/persons", (request, response) => {
	const body = request.body;

	if (!body.name || body.name === "") {
		return response.status(400).json({
			error: "name is missing",
		});
	}

	if (!body.number || body.number === "") {
		return response.status(400).json({
			error: "number is missing",
		});
	}

	if (persons.some((person) => person.name === body.name)) {
		return response.status(400).json({
			error: "name must be unique",
		});
	}

	const newperson = {
		name: body.name,
		number: body.number,
		id: generateId(),
	};

	persons = persons.concat(newperson);

	response.json(newperson);
});

app.delete("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	persons = persons.filter((note) => note.id !== id);

	response.status(204).end();
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
