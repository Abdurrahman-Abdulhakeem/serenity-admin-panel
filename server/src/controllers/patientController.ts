import Patient from "../models/Patient";
import * as factory from "./controllerFactory";
import { Request, Response } from 'express';

// @desc    Create patient
// @route   POST /api/patients
export const createPatient = factory.createOne(Patient);
// @desc    Get all patients with search + pagination
// @route   GET /api/patients
export const getPatients = factory.getAll(Patient, ["name", "gender"]);
// @desc    Get patient
// @route   GET /api/patients/:id
export const getPatient = factory.getOne(Patient);
// @desc    Update patient
// @route   PUT /api/patients/:id
export const updatePatient = factory.updateOne(Patient);
// @desc    Delete patient
// @route   DELETE /api/patients/:id
export const deletePatient = factory.deleteOne(Patient);


// Helper to generate random patient data
// const generateRandomPatients = (count: number) => {
//   const names = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown', 'Mary Williams', 'Tom Davis', 'Lucy Clark', 'Peter Hall', 'Grace Young', 'David Lee'];
//   const addresses = ['123 Main St', '456 Elm St', '789 Maple Ave', '101 Oak Ln', '303 Pine Blvd', '202 Cedar St', '707 Birch Rd', '909 Walnut Dr', '808 Ash Ct', '606 Cherry Cir'];
//   const genders = ['male', 'female', 'other'];
//   const statuses = ['active', 'discharged', 'deceased'];

//   const patients = [];

//   for (let i = 0; i < count; i++) {
//     const name = names[i % names.length];
//     const gender = genders[Math.floor(Math.random() * genders.length)];
//     const dob = new Date(1980 + Math.floor(Math.random() * 30), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28));
//     const phone = `080${Math.floor(10000000 + Math.random() * 90000000)}`;
//     const email = `${name.toLowerCase().replace(/\s/g, '')}${i}@example.com`;
//     const address = addresses[i % addresses.length];
//     const emergencyName = `EC ${name.split(' ')[0]}`;
//     const emergencyPhone = `070${Math.floor(10000000 + Math.random() * 90000000)}`;
//     const status = statuses[Math.floor(Math.random() * statuses.length)];

//     patients.push({
//       name,
//       gender,
//       dob,
//       phone,
//       email,
//       address,
//       emergencyContact: {
//         name: emergencyName,
//         phone: emergencyPhone,
//       },
//       status,
//     });
//   }

//   return patients;
// };

// export const seedPatients = async (req: Request, res: Response) => {
//   try {
//     const data = generateRandomPatients(10);
//     const inserted = await Patient.insertMany(data);
//     res.status(201).json({ message: 'Patients seeded successfully', patients: inserted });
//   } catch (error) {
//     res.status(500).json({ error: 'Seeding failed', details: error });
//   }
// };

