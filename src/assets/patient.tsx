import { useState } from "react";
import "./patient.css";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-menubar";
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
import { cn } from "@/lib/utils";

const patientData = {
  id: "12345",
  name: "John Doe",
  email: "johndoe@example.com",
};


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
              className="input-name"
            />
            <div className="grid grid-cols-2 gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                      className={cn(
                        "w-[185px] justify-start text-left font-normal text-[black] bg-[white] hover:bg-[#f7f5f5]"
                      )}>
                      <CalendarIcon />
                      {birthday ? format(birthday, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start">
                  <Calendar mode="single" selected={birthday} onSelect={setBirthday} />
                </PopoverContent>
              </Popover>
              <Select onValueChange={(value) => console.log("Selected gender:", value)}>
                <SelectTrigger className="select-sex">
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
              <SelectTrigger className="select-proc-doc">
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
                        <Button
                          className={cn(
                            "w-[185px] justify-start text-left font-normal text-[black] bg-[white] hover:bg-[#f7f5f5]"
                          )}>
                          <CalendarIcon />
                          {birthday ? format(birthday, "PPP") : <span>Pick a date</span>}
                         </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="popover-content">
                        <Calendar mode="single" selected={date} onSelect={setDate} />
                    </PopoverContent>
                </Popover>
              <Select onValueChange={setTime}>
                <SelectTrigger className="w-[185px] text-left font-normal text-[black] bg-[white] hover:bg-[#f7f5f5]">
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
              <SelectTrigger className="select-proc-doc">
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
            <Textarea placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="notes-text-area"/>
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

const AppointmentsList = ({
  appointments,
  setAppointments,
}: {
  appointments: any[];
  setAppointments: (appointments: any[]) => void;
}) => {
  const [editAppointment, setEditAppointment] = useState<any | null>(null);
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
    "Laser Surgery",
  ];

  const handleEdit = (appointment: any) => {
    if (appointment && appointment.id) {
      setEditAppointment(appointment);
      setDate(new Date(appointment.date));
      setTime(appointment.time);
      setProcedure(appointment.procedure);
      setDoctor(appointment.doctor);
      setNotes(appointment.notes || "");
    }
  };

  const handleCancelAppointment = (id: string) => {
    const updatedAppointments = appointments.map((appt) =>
      appt.id === id ? { ...appt, status: "Cancelled" } : appt
    );

    setAppointments(updatedAppointments);
  };

  const handleSaveChanges = () => {
    if (!editAppointment) return;

    const updatedAppointments = appointments.map((appt) =>
      appt.id === editAppointment.id
        ? {
            ...appt,
            procedure,
            date: date ? format(date, "yyyy-MM-dd") : appt.date, // Ensure date is formatted correctly
            time,
            doctor,
            notes,
          }
        : appt
    );

    setAppointments(updatedAppointments);
    setEditAppointment(null); // Close the dialog
  };

  return (
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
              appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.procedure}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.doctor}</td>
                  <td>
                    <Button className="edit-btn" onClick={() => handleEdit(appointment)}>
                      Edit
                    </Button>
                  </td>
                  <td>
                    {appointment.status === "Cancelled" ? (
                      <span className="text-red-500 font-bold">Cancelled</span>
                    ) : (
                      <Button className="cancel-btn" onClick={() => handleCancelAppointment(appointment.id)}>
                        Cancel
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center">
                  No appointments scheduled.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editAppointment && (
        <Dialog open={!!editAppointment} onOpenChange={setEditAppointment}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Appointment</DialogTitle>
            </DialogHeader>
            <div className="grid gap-2 py-2">
              <h3>Personal Details</h3>
              <Label id="name" style={{ fontWeight: 'bold'}}>{patientData.name}</Label>
              <h3>Appointment Details</h3>
              <Select value={procedure} onValueChange={setProcedure}>
                <SelectTrigger className="select-proc-doc">
                  <SelectValue>{procedure || "Procedure"}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {procedures.map((proc) => (
                      <SelectItem key={proc} value={proc}>
                        {proc}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <div className="grid grid-cols-2 gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                  <Button
                        className={cn(
                          "w-[185px] justify-start text-left font-normal text-[black] bg-[white] hover:bg-[#f7f5f5]"                        )}
                      >
                        <CalendarIcon />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="popover-content">
                    <Calendar mode="single" selected={date} onSelect={setDate} />
                  </PopoverContent>
                </Popover>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger className={cn("w-[180px] text-left font-normal text-[black] bg-[white] hover:bg-[#f7f5f5]")}>
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
              <Select value={doctor} onValueChange={setDoctor}>
                <SelectTrigger className="select-proc-doc">
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
              <Textarea
                placeholder="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="notes-text-area"
              />
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSaveChanges}>
                Save Changes
              </Button>
              <Button variant="secondary" onClick={() => setEditAppointment(null)}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default function Patient() {
  const [appointments, setAppointments] = useState([
    { id: "1", procedure: "Dental Checkup", date: "2025-03-05", doctor: "Dr. Arnel Rivera", time: "10:00 AM", status: "" },
    { id: "2", procedure: "Veneers", date: "2025-03-12", doctor: "Dr. Elishar Rivera", time: "2:30 PM", status: "" },
  ]);

  return (
    <div className="patient-dashboard">
      <PatientHeader name={patientData.name} />
      <AppointmentsList appointments={appointments} setAppointments={setAppointments} />
    </div>
  );
}
