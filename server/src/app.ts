import express from "express";
import morgan from 'morgan';
import { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { errorHandler } from "./middlewares/error";
import authRoutes from './routes/authRoutes';
import staffRoutes from "./routes/staffRoutes";
import departmentRoutes from "./routes/departmentRoutes";
import appointmentRoutes from "./routes/appointmentRoutes";
import patientRoutes from './routes/patientRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


const allowedOrigins = [
  "http://localhost:3000",
  // "https://your-production-site.com"
];

// Middlewares
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Serenity Admin API Running");
});

app.use('/api/auth', authRoutes);
app.use('/api/staffs', staffRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/patients', patientRoutes);


app.use(errorHandler)
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost${PORT}`);
  });
});
