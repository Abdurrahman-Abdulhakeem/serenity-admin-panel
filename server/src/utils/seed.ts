import { faker } from '@faker-js/faker';
import dotenv from "dotenv";
import Staff from '../models/Staff';
import Patient from '../models/Patient';
import Department from '../models/Department';
import Appointment from '../models/Appointment';
import { connectDB } from '../config/db';

dotenv.config();

const seedDepartments = async () => {
  const deptNames = [
    'Cardiology', 'Neurology', 'Pediatrics', 'Radiology', 'Emergency',
    'Orthopedics', 'Oncology', 'Dermatology', 'Psychiatry', 'ENT',
    'Gynecology', 'Urology', 'Opthalmology',
  ];
  await Department.deleteMany({});
  const depts = await Department.insertMany(deptNames.map(name => ({ name })));
  console.log('Seeded Departments');
  return depts;
};

const seedStaff = async (departments: any[]) => {
  await Staff.deleteMany({});
  const roles = ['doctor', 'nurse', 'admin', 'lab', 'pharmacist'];
  const staffList = Array.from({ length: 20 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(roles),
    department: faker.helpers.arrayElement(departments).name,
    phone: `+234${faker.string.numeric(10)}`,
    address: faker.location.streetAddress(),
    isActive: faker.datatype.boolean(),
  }));
  const staff = await Staff.insertMany(staffList);
  console.log('Seeded Staff');
  return staff;
};

const seedPatients = async () => {
  await Patient.deleteMany({});
  const genders = ['male', 'female'];
  const statusList = ['active', 'discharged', 'deceased'];
  const patients = Array.from({ length: 50 }).map(() => {
    const dob = faker.date.birthdate({ min: 1, max: 90, mode: 'age' });
    return {
      name: faker.person.fullName(),
      gender: faker.helpers.arrayElement(genders),
      dob,
      phone: `+234${faker.string.numeric(10)}`,
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      emergencyContact: {
        name: faker.person.fullName(),
        phone: `+234${faker.string.numeric(10)}`,
      },
      status: faker.helpers.arrayElement(statusList),
    };
  });
  const inserted = await Patient.insertMany(patients);
  console.log('Seeded Patients');
  return inserted;
};

const seedAppointments = async (patients: any[], staff: any[]) => {
  await Appointment.deleteMany({});
  const statuses = ['pending', 'approved', 'completed', 'cancelled'];
  const appointments = Array.from({ length: 35 }).map(() => ({
    patientName: faker.helpers.arrayElement(patients).name,
    reason: faker.lorem.sentence(3),
    date: faker.date.between({ from: '2024-01-01', to: '2025-12-31' }),
    status: faker.helpers.arrayElement(statuses),
    createdBy: faker.helpers.arrayElement(staff)._id,
  }));
  await Appointment.insertMany(appointments);
  console.log('Seeded Appointments');
};

const runSeed = async () => {
  await connectDB();
  const departments = await seedDepartments();
  const staff = await seedStaff(departments);
  const patients = await seedPatients();
  await seedAppointments(patients, staff);
};

if (process.argv[2] === '--import') {
runSeed().then(() => process.exit(1));

};
