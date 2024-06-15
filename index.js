import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const PORT = process.env.PORT || 3000;

let personsData = [
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

app.get("/api/persons", (req, res) => {
  res.json(personsData);
});

app.get("/api/persons/info", (req, res) => {
  const date = new Date();
  res.send(
    `<p>Phonebook has info for ${personsData.length} people</p>
    <br>
    <p>${date}</p>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = personsData.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = personsData.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "Both name and number are required" });
  }

  if (personsData.some((person) => person.name === name)) {
    return res.status(409).json({ error: "name must be unique" });
  }
  const maxId = personsData.reduce(
    (max, person) => Math.max(max, person.id),
    0
  );
  const newPerson = {
    id: maxId + 1,
    name: name,
    number: number,
  };

  personsData.concat(newPerson);
  res.status(201).json(newPerson);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
