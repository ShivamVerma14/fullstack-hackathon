import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
    .connect("mongodb://localhost:27017/hackathon")
    .then(async () => {
        console.log("Connected to MongoDB");

        const venueSchema = new mongoose.Schema({
            name: String,
            location: String,
            availability: [{ date: Date, available: Boolean }]
        });

        // Check if the venues collection already exists
        const Venue = mongoose.models.Venue || mongoose.model('Venue', venueSchema);

        // Function to create 4 venues with random names and locations
        async function createVenues() {
            const venuesData = [
                { name: "Venue 1", location: "Location 1" },
                { name: "Venue 2", location: "Location 2" },
                { name: "Venue 3", location: "Location 3" },
                { name: "Venue 4", location: "Location 4" }
            ];
            await Venue.insertMany(venuesData);
        }

        // Function to generate random dates for availability
        function generateRandomDates(startDate, endDate, numDates) {
            const dates = [];
            while (dates.length < numDates) {
                const timestamp = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
                const date = new Date(timestamp);
                const formattedDate = date.toISOString().split('T')[0]; // Extracting date part
                const dateString = formattedDate.slice(0, 10); // Getting only YYYY-MM-DD part
                if (!dates.includes(dateString)) {
                    dates.push(dateString);
                }
            }
            return dates;
        }
        
        

        // Function to create venue availability for the next 5 days
        async function createVenueAvailability() {
            const venues = await Venue.find();
            const startDate = new Date();
            const endDate = new Date(startDate.getTime() + (5 * 24 * 60 * 60 * 1000));
        
            for (const venue of venues) {
                const randomAvailableDates = generateRandomDates(startDate, endDate, 3);
                console.log(randomAvailableDates);
                for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
                    const dateString = date.toISOString().split('T')[0]; // Extracting date part
                    const available = randomAvailableDates.includes(dateString);
                    venue.availability.push({ date: dateString, available }); // Pushing only date without timestamp
                }
                await venue.save();
            }
        }
        

        // Insert initial venue data
        async function insertVenueData() {
            await createVenues();
            await createVenueAvailability();
        }

        // Check if venues collection exists before creating it
        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionNames = collections.map(col => col.name);
        if (!collectionNames.includes('venues')) {
            await insertVenueData();
        }




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
        const data = await Student.findById(id);
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/fetchInstituteProfile/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Institute.findById(id);
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get("/fetchTests/:student_id", async (req, res) => {
    try {
        const { student_id } = req.params;
        const tests = await Test.find({ student_id }); // Fetch tests by student_id
        console.log(tests);
        res.status(200).json(tests);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get("/fetchVenues/:date", async (req, res) => {

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
