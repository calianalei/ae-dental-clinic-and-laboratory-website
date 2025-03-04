import { useState } from "react";
import "./patient.css";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";

const patientData = {
  id: "12345",
  name: "John Doe",
  email: "johndoe@example.com",
};

const appointments = [
  { date: "2025-03-05", doctor: "Dr. Smith", time: "10:00 AM" },
  { date: "2025-03-12", doctor: "Dr. Adams", time: "2:30 PM" },
];

const PatientHeader = ({ name }: { name: string }) => {
  const firstName = name.split(" ")[0].toUpperCase();
  const [patientName, setPatientName] = useState("");
  const [birthday, setBirthday] = useState<Date | undefined>();
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState("");
  const [procedure, setProcedure] = useState("");
  const [doctor, setDoctor] = useState("");
  const [notes, setNotes] = useState("");

  const availableTimes = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
  ];
  const procedures = [
    "Tooth Extraction",
    "Dental Cleaning",
    "Fill & Root Canals",
    "Dentures",
    "Cosmetic Restoration",
    "Fixed Bridge",
    "Teeth Retainer",
    "Dental Braces",
    "Veneers",
    "Laser Surgery"
];

  return (
    <div className="box">
      <h1>Hello, {firstName}!</h1>
      <p>We're glad to have you at AE Dental Clinic & Laboratory</p>
      <p>where your smile is our priority! Let's keep it healthy and bright!</p>
      <br />
      <h2>If you are ready, book an appointment by clicking the button below.</h2>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="appointment-button">Book an Appointment</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Schedule an Appointment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-2 py-2">
            <h3>Personal Details</h3>
            <Input
              id="name"
              placeholder="Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full text-left font-normal">
                    {birthday ? format(birthday, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start">
                  <Calendar mode="single" selected={birthday} onSelect={setBirthday} />
                </PopoverContent>
              </Popover>
              <Select onValueChange={(value) => console.log("Selected gender:", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sex" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Prefer Not To Say">Prefer Not To Say</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <h3>Appointment Details</h3>
            <Select onValueChange={(value) => setProcedure(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Procedure" />
              </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    {procedures.map((procedure) => (
                        <SelectItem key={procedure} value={procedure}>{procedure}</SelectItem>
                    ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <div className="grid grid-cols-2 gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full text-left font-normal">
                        {date ? format(date, "PPP") : "Pick a date"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="popover-content">
                        <Calendar mode="single" selected={date} onSelect={setDate} />
                    </PopoverContent>
                </Popover>
              <Select onValueChange={setTime}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Time" />
                </SelectTrigger>
                <SelectContent>
                  {availableTimes.map((availableTime) => (
                    <SelectItem key={availableTime} value={availableTime}>
                      {availableTime}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Select onValueChange={setDoctor}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Doctor" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Dr. Arnel Rivera">Dr. Arnel Rivera</SelectItem>
                  <SelectItem value="Dr. Elishar Rivera">Dr. Elishar Rivera</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <h3>Additional Information</h3>
            <Textarea placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} style={{ minHeight: '100px' }}/>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!patientName || !date || !time || !procedure || !doctor}>
              Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const AppointmentsList = ({ appointments }: { appointments: any[] }) => (
  <div className="appointments">
    <h2>Your Scheduled Appointments</h2>
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>Procedure</th>
            <th>Date</th>
            <th>Time</th>
            <th>Doctor</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <tr key={index}>
                <td>Dental Checkup</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.doctor}</td>
                <td>
                  <Button className="edit-btn">Edit</Button>
                </td>
                <td>
                  <Button className="cancel-btn">Cancel</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No scheduled appointments.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default function Patient() {
  return (
    <div className="patient-dashboard">
      <PatientHeader name={patientData.name} />
      <AppointmentsList appointments={appointments} />
    </div>
  );
}
