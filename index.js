require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.static("build"));

morgan.token("body", (request, response) => {
	return JSON.stringify(request.body);
});
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

app.use(cors());

const Person = require("./models/person");

app.get("/", (request, response) => {
	response.send("<h1>Hello World!</h1>");
});

app.get("/info", (request, response) => {
	Person.find({})
		.then((foundPersons) => {
			response.send(
				`Phonebook has info for ${
					foundPersons.length
				} people<br/><br/>${new Date().toString()}`,
			);
		})
		.catch((error) => next(error));
});

app.get("/api/persons", (request, response, next) => {
	Person.find({})
		.then((foundPersons) => {
			response.json(foundPersons);
		})
		.catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
	Person.findById(request.params.id)
		.then((foundPerson) => {
			if (foundPerson) {
				response.json(foundPerson);
			} else {
				response.status(404).end();
			}
		})
		.catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
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
	//TODO step5
	Person.findOne({ name: body.name })
		.then((foundPerson) => {
			const person = new Person({
				name: body.name,
				number: body.number,
			});

			if (foundPerson) {
				Person.findByIdAndUpdate(foundPerson._id.toString(), person, { new: true })
					.then((updatedPerson) => {
						response.json(updatedPerson);
					})
					.catch((error) => next(error));
			} else {
				person
					.save()
					.then((savedPerson) => {
						response.json(savedPerson);
					})
					.catch((error) => next(error));
			}
		})
		.catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
	const body = request.body;

	const person = {
		name: body.name,
		number: body.number,
	};

	Person.findByIdAndUpdate(request.params.id, person, { new: true })
		.then((updatedPerson) => {
			response.json(updatedPerson);
		})
		.catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
	Person.findByIdAndDelete(request.params.id)
		.then((result) => {
			if (result) {
				response.status(204).end();
			} else {
				response.status(404).end();
			}
		})
		.catch((error) => next(error));
});

//404 middleware
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

//error handler middleware
const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" });
	}

	next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
