import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
    .connect("mongodb://localhost:27017/hackathon")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    });

const InstituteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    bio: { type: String },
});

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
});

const TestSchema = new mongoose.Schema({
    institute_id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    eligibility: { type: Array, required: true },
    type: { type: String, required: true },
    ugpg: { type: String, required: true },
    centres: { type: Array, required: true },
    status: { type: String, required: true },
});

const BookingSchema = new mongoose.Schema({
    test_id: { type: String, required: true },
    student_id: { type: String, required: true, unique: true },
    institute_id: { type: String, required: true, unique: true },
    status: { type: String, required: true },
});

const Institute = mongoose.model("Institute", InstituteSchema);
const Student = mongoose.model("Student", StudentSchema);
const Test = mongoose.model("Test", TestSchema);
const Booking = mongoose.model("Booking", BookingSchema);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    session({
        secret: "your_secret_key",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(cors());

app.post("/register/institute", async (req, res) => {
    try {
        const { name, username, password, address, bio } = req.body;

        const institute = new Institute({
            name,
            username,
            password,
            address,
            bio,
        });
        await institute.save();

        res.status(201).json({
            message: "Institute registered successfully",
            institute,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post("/register/student", async (req, res) => {
    try {
        const { name, email, username, password, mobile } = req.body;

        const student = new Student({
            name,
            email,
            username,
            password,
            mobile,
        });
        await student.save();

        res.status(201).json({
            message: "Student registered successfully",
            student,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post("/login/institute", async (req, res) => {
    try {
        const { username, password } = req.body;

        const institute = await Institute.findOne({ username, password });
        if (!institute) {
            return res.status(404).json({ error: "Invalid credentials" });
        }

        req.session.user = institute;
        res.status(200).json({
            message: "Institute logged in successfully",
            institute,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post("/login/student", async (req, res) => {
    try {
        const { username, password } = req.body;

        const student = await Student.findOne({ username, password });
        if (!student) {
            return res.status(404).json({ error: "Invalid credentials" });
        }

        req.session.user = student;
        res.status(200).json({
            message: "Student logged in successfully",
            student,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get("/fetchStudent/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const students = await Student.findById(id);
        console.log(students);
        res.status(200).json({ students });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post("/test/add", async (req, res) => {
    try {
        const {
            name,
            description,
            date,
            eligibility,
            type,
            ugpg,
            centres,
            status,
        } = req.body;

        const test = new Test({
            institute_id: req.session.user._id,
            name,
            description,
            date,
            eligibility,
            type,
            ugpg,
            centres,
            status,
        });
        await test.save();

        res.status(201).json({
            message: "Test added successfully",
            test,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post("/test/edit", async (req, res) => {
    try {
        const {
            name,
            description,
            date,
            eligibility,
            type,
            ugpg,
            centres,
            status,
        } = req.body;

        const test = await Test.findOne({ name });
        if (!test) {
            return res.status(404).json({ error: "Test not found" });
        }

        test.name = name;
        test.description = description;
        test.date = date;
        test.eligibility = eligibility;
        test.type = type;
        test.ugpg = ugpg;
        test.centres = centres;
        test.status = status;

        await test.save();

        res.status(200).json({
            message: "Test edited successfully",
            test,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post("/book", async (req, res) => {
    try {
        const { test_id, institute_id } = req.body;
        const student_id = req.session.student_id;

        const test = await Test.findOne({ _id: test_id });
        if (!test) {
            return res.status(404).json({ error: "Test not found" });
        }
        const { status } = test;
        const booking = new Booking({
            test_id,
            student_id,
            institute_id,
            status,
        });
        await booking.save();
        res.status(201).json({
            message: "Test Booking successfull",
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}.`);
});
