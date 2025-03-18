import { useState, useEffect } from "react";
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
import axios from "axios";

interface Appointment {
  ScheduleID: number;
  fullName: string;
  birthday: string;
  sex: string;
  scheduledDate: string;
  appointmentTime: string;
  procedureName: string;
  note: string;
  status: string;
  doctor: string;
  user_id: number | null;
}

const PatientHeader = ({
  name,
  userId,
  date,
  setDate,
  time,
  setTime,
  procedure,
  setProcedure,
  notes,
  setNotes,
  doctor,
  setDoctor,
  onScheduleAppointment,
}: {
  name: string;
  userId: number;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  time: string;
  setTime: (time: string) => void;
  procedure: string;
  setProcedure: (procedure: string) => void;
  notes: string;
  setNotes: (notes: string) => void;
  doctor: string;
  setDoctor: (doctor: string) => void;
  onScheduleAppointment: () => void;
}) => {
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
      <h1>Hello, {name.toUpperCase()}!</h1>
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
            <h3>Appointment Details</h3>
            <Select onValueChange={setProcedure}>
              <SelectTrigger className="select-proc-doc">
                <SelectValue placeholder="Procedure" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {procedures.map((proc) => (
                    <SelectItem key={proc} value={proc}>{proc}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="grid grid-cols-2 gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button className={cn("w-[185px] justify-start text-left font-normal text-[black] bg-[white] hover:bg-[#f7f5f5]")}>
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
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
            <Textarea
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="notes-text-area"
            />
          </div>
          <DialogFooter>
            <Button type="submit" onClick={onScheduleAppointment} disabled={!date || !time || !procedure || !doctor}>
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
  userId,
}: {
  appointments: Appointment[];
  setAppointments: (appointments: Appointment[]) => void;
  userId: number;
}) => {
  const [editAppointment, setEditAppointment] = useState<Appointment | null>(null);
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

  const handleEdit = (appointment: Appointment) => {
    if (appointment) {
      setEditAppointment(appointment);
      setDate(new Date(appointment.scheduledDate));
      setTime(appointment.appointmentTime);
      setProcedure(appointment.procedureName);
      setDoctor(appointment.doctor);
      setNotes(appointment.note || "");
    }
  };

  const handleCancelAppointment = async (id: number) => {
    try {
      const response = await axios.put(`http://localhost:5000/patient-dashboard/schedule/${id}/cancel`);

      if (response.status === 200) {
        const updatedAppointments = appointments.map((appt) =>
          appt.ScheduleID === id ? { ...appt, status: "cancelled" } : appt
        );
        setAppointments(updatedAppointments);
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      if (axios.isAxiosError(error)) {
        alert(`Error: ${error.response?.data?.error || 'Failed to cancel appointment'}`);
      } else {
        alert('An error occurred while cancelling the appointment');
      }
    }
  };

  const handleSaveChanges = async () => {
    if (!editAppointment) return;

    try {
      const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
      const formattedTime = time ? `${time}:00` : "";

      const response = await axios.put(`http://localhost:5000/patient-dashboard/schedule/${editAppointment.ScheduleID}`, {
        scheduledDate: formattedDate,
        appointmentTime: formattedTime,
        procedureName: procedure,
        doctor: doctor,
        note: notes,
      });

      if (response.status === 200) {
        const updatedAppointments = appointments.map((appt) =>
          appt.ScheduleID === editAppointment.ScheduleID
            ? {
                ...appt,
                scheduledDate: formattedDate,
                appointmentTime: formattedTime,
                procedureName: procedure,
                doctor: doctor,
                note: notes,
              }
            : appt
        );

        setAppointments(updatedAppointments);
        setEditAppointment(null);
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
      if (axios.isAxiosError(error)) {
        alert(`Error: ${error.response?.data?.error || 'Failed to update appointment'}`);
      } else {
        alert('An error occurred while updating the appointment');
      }
    }
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
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment.ScheduleID}>
                  <td>{appointment.procedureName}</td>
                  <td>{format(new Date(appointment.scheduledDate), 'MM/dd/yyyy')}</td>
                  <td>{appointment.appointmentTime}</td>
                  <td>{appointment.doctor}</td>
                  <td>{appointment.status}</td>
                  <td>
                    {appointment.status !== "cancelled" && (
                      <>
                        <Button className="edit-btn" onClick={() => handleEdit(appointment)}>
                          Edit
                        </Button>
                        <Button className="cancel-btn" onClick={() => handleCancelAppointment(appointment.ScheduleID)}>
                          Cancel
                        </Button>
                      </>
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

      <Dialog open={!!editAppointment} onOpenChange={() => setEditAppointment(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Appointment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-2 py-2">
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
                  <Button className={cn("w-[185px] justify-start text-left font-normal text-[black] bg-[white] hover:bg-[#f7f5f5]")}>
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
    </div>
  );
};

export default function Patient() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [userId, setUserId] = useState<number | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [procedure, setProcedure] = useState("");
  const [notes, setNotes] = useState("");
  const [doctor, setDoctor] = useState("Dr. Arnel Rivera");

  const handleScheduleAppointment = async () => {
    if (!date || !time || !procedure || !doctor) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      // Get user data from localStorage
      const userDataStr = localStorage.getItem('userData');
      if (!userDataStr) {
        alert('Please log in again');
        return;
      }
      const userData = JSON.parse(userDataStr);

      // Format dates to YYYY-MM-DD
      const formattedScheduledDate = format(date, "yyyy-MM-dd");

      // Format time to HH:mm:ss
      const formattedTime = `${time}:00`;

      const newAppointment: Appointment = {
        ScheduleID: 0,
        fullName: userData.name,
        birthday: userData.birthday,
        sex: userData.sex || "O",
        scheduledDate: formattedScheduledDate,
        appointmentTime: formattedTime,
        procedureName: procedure,
        note: notes.trim(),
        doctor: doctor,
        status: "no status",
        user_id: userId
      };

      console.log("Sending data:", newAppointment);

      const response = await axios.post("http://localhost:5000/patient-dashboard/schedule", newAppointment);
      console.log("Server response:", response.data);

      if (response.status === 201) {
        alert("Appointment scheduled successfully!");
        // Refresh appointments list
        const appointmentsResponse = await axios.get(`http://localhost:5000/patient-dashboard/appointments/${userId}`);
        setAppointments(appointmentsResponse.data);
        // Reset form
        setDate(undefined);
        setTime("");
        setProcedure("");
        setNotes("");
        setDoctor("Dr. Arnel Rivera");
      }
    } catch (err) {
      console.error("Error scheduling appointment:", err);
      if (axios.isAxiosError(err)) {
        alert(`Error: ${err.response?.data?.error || 'Failed to schedule appointment'}`);
      } else {
        alert('An error occurred while scheduling the appointment');
      }
    }
  };

  useEffect(() => {
    const fetchUserAndAppointments = async () => {
      try {
        // Get user data from localStorage
        const userDataStr = localStorage.getItem('userData');
        console.log('User data from localStorage:', userDataStr);

        if (userDataStr) {
          const userData = JSON.parse(userDataStr);
          console.log('Parsed user data:', userData);
          
          setUserName(userData.name);
          setUserId(userData.accountid);
          
          // Fetch appointments using the new endpoint
          const appointmentsResponse = await axios.get(`http://localhost:5000/patient-dashboard/appointments/${userData.accountid}`);
          console.log('User appointments:', appointmentsResponse.data);
          
          setAppointments(appointmentsResponse.data);
        } else {
          console.log('No user data found in localStorage');
          alert('Please log in again');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        if (axios.isAxiosError(error)) {
          console.error('Error response:', error.response?.data);
          alert(`Error: ${error.response?.data?.error || 'Failed to fetch data'}`);
        } else {
          alert('An error occurred while fetching data');
        }
      }
    };

    fetchUserAndAppointments();
  }, []);

  return (
    <div className="patient-dashboard">
      <PatientHeader 
        name={userName} 
        userId={userId || 0} 
        date={date}
        setDate={setDate}
        time={time}
        setTime={setTime}
        procedure={procedure}
        setProcedure={setProcedure}
        notes={notes}
        setNotes={setNotes}
        doctor={doctor}
        setDoctor={setDoctor}
        onScheduleAppointment={handleScheduleAppointment}
      />
      <AppointmentsList appointments={appointments} setAppointments={setAppointments} userId={userId || 0} />
    </div>
  );
}
