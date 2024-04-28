import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import cors from "cors";
import axios from "axios";
import crypto from "crypto";

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
    .connect("mongodb://localhost:27017/hackathon")
    .then(async () => {
        console.log("Connected to MongoDB");

        const venueSchema = new mongoose.Schema({
            name: String,
            location: String,
            availability: [{ date: Date, available: Boolean }],
        });

        const Venue =
            mongoose.models.Venue || mongoose.model("Venue", venueSchema);

        async function createVenues() {
            const venuesData = [
                { name: "Venue 1", location: "Location 1" },
                { name: "Venue 2", location: "Location 2" },
                { name: "Venue 3", location: "Location 3" },
                { name: "Venue 4", location: "Location 4" },
            ];
            await Venue.insertMany(venuesData);
        }

        function generateRandomDates(startDate, endDate, numDates) {
            const dates = [];
            while (dates.length < numDates) {
                const timestamp =
                    startDate.getTime() +
                    Math.random() * (endDate.getTime() - startDate.getTime());
                const date = new Date(timestamp);
                const formattedDate = date.toISOString().split("T")[0];
                const dateString = formattedDate.slice(0, 10);
                if (!dates.includes(dateString)) {
                    dates.push(dateString);
                }
            }
            return dates;
        }

        async function createVenueAvailability() {
            const venues = await Venue.find();
            const startDate = new Date();
            const endDate = new Date(
                startDate.getTime() + 5 * 24 * 60 * 60 * 1000
            );

            for (const venue of venues) {
                const randomAvailableDates = generateRandomDates(
                    startDate,
                    endDate,
                    3
                );
                console.log(randomAvailableDates);
                for (
                    let date = new Date(startDate);
                    date <= endDate;
                    date.setDate(date.getDate() + 1)
                ) {
                    const dateString = date.toISOString().split("T")[0];
                    const available = randomAvailableDates.includes(dateString);
                    venue.availability.push({ date: dateString, available });
                }
                await venue.save();
            }
        }

        async function insertVenueData() {
            await createVenues();
            await createVenueAvailability();
        }

        const collections = await mongoose.connection.db
            .listCollections()
            .toArray();
        const collectionNames = collections.map((col) => col.name);
        if (!collectionNames.includes("venues")) {
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

app.get("/fetchInstituteProfile/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Institute.findById(id);
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get("/fetchTests/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const tests = await Test.find({ institute_id: id });
        console.log(tests);
        res.status(200).json(tests);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get("/fetchVenues/:date", async (req, res) => {});

app.post("/test/add", async (req, res) => {
    try {
        const {
            institute_id,
            name,
            date,
            eligibility,
            type,
            ugpg,
            centres,
            status,
        } = req.body;

        const test = new Test({
            institute_id,
            name,
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

function generateTransactionID() {
    const timestamp2 = Date.now();
    const randomNum2 = Math.floor(Math.random() * 1000000);
    const merchantPrefix = "T";
    const transactionID = `${merchantPrefix}${timestamp2}${randomNum2}`;
    return transactionID;
}

app.post("/payment", async (req, res) => {
    try {
        const { amt, id } = req.body;
        const data = {
            merchantId: "PGTESTPAYUAT",
            merchantTransactionId: generateTransactionID(),
            merchantUserId: "MUED9EFW8E9F89EWF8C",
            name: "name",
            amount: amt * 100,
            redirectUrl: `http://localhost:5173/institute-dashboard/${id}`,
            redirectMode: "POST",
            mobileNumber: 9999999999,
            paymentInstrument: {
                type: "PAY_PAGE",
            },
        };
        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString("base64");
        const key = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
        const keyIndex = 1;
        const string = payloadMain + "/pg/v1/pay" + key;
        const sha256 = crypto.createHash("sha256").update(string).digest("hex");
        const checksum = sha256 + "###" + keyIndex;

        const URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

        const options = {
            method: "POST",
            url: URL,
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                "X-VERIFY": checksum,
            },
            data: {
                request: payloadMain,
            },
        };
        axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                return res
                    .status(200)
                    .send(
                        response.data.data.instrumentResponse.redirectInfo.url
                    );
            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (error) {
        console.log(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}.`);
});
