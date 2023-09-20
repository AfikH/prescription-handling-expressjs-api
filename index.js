import express from 'express';
import cors from 'cors';

// routes
import userRoute from './routes/user.route.js';
import prescriptionRoute from './routes/prescription.route.js';

const app = express();

// TODO: set PORT env variable.
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5174',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).json({
        connection: true
    });
});

app.use('/user', userRoute);
app.use('/prescription', prescriptionRoute);

app.listen(PORT, () => {
    console.log(`express api is running on port ${PORT}`);
}).on('error', () => {
    console.log(`There was a problem starting express api on port ${PORT}`);
});