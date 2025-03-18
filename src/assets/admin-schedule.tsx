"use client";
import './admin.css';
import axios from "axios";
import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import user from './media/user.png';
import { useEffect, useState } from 'react';
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

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
}
interface Schedule {
  time: string;
  patient: string;
  procedure: string;
  notes: string;
  status: string;
  scheduleId: number;
}

function Schedule({
  availableTimes,
  date, setDate,
  birthday, setBirthday,
  time, setTime,
  note, setNote,
}: {
  availableTimes: string[];
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  birthday: Date | undefined;
  setBirthday: React.Dispatch<React.SetStateAction<Date | undefined>>;
  time: string;
  setTime: React.Dispatch<React.SetStateAction<string>>;
  note: string;
  setNote: React.Dispatch<React.SetStateAction<string>>;
}) {
  const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
  const isFormValid = date && birthday && time;
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const formattedBirthday = birthday ? format(birthday, "yyyy-MM-dd") : "";
  const [schedules, setSchedules] = useState<Record<string, Schedule[]>>({});
  const formattedSelectedDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const daySchedules: Schedule[] = schedules[formattedSelectedDate] || [];

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [fullName, setFullName] = useState("");
  const [sex, setSex] = useState("");
  const [procedureName, setProcedureName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");

  const fetchAppointments = async (doctor?: string, date?: string) => {
    try {
      console.log('Fetching appointments for doctor:', doctor, 'and date:', date);
      const params = new URLSearchParams();
      if (doctor) params.append('doctor', doctor);
      if (date) params.append('date', date);
      
      const url = `http://localhost:5000/schedule?${params.toString()}`;
      console.log('Fetching from URL:', url);
      
      const response = await axios.get(url);
      console.log('Received response:', response);
      
      if (!response.data) {
        throw new Error('No data received from server');
      }
      
      const fetchedAppointments = response.data;
      console.log('Fetched appointments:', fetchedAppointments);
      setAppointments(fetchedAppointments);

      // Convert appointments to schedules format
      const newSchedules: Record<string, Schedule[]> = {};
      fetchedAppointments.forEach((appointment: Appointment) => {
        // Only process appointments for the selected doctor
        if (appointment.doctor === doctor) {
          // Format the date to match the format we're using (YYYY-MM-DD)
          const appointmentDate = new Date(appointment.scheduledDate);
          const formattedDate = format(appointmentDate, "yyyy-MM-dd");
          console.log('Processing appointment for doctor:', doctor, 'date:', formattedDate);
          
          if (!newSchedules[formattedDate]) {
            newSchedules[formattedDate] = [];
          }
          newSchedules[formattedDate].push({
            time: appointment.appointmentTime,
            patient: appointment.fullName,
            procedure: appointment.procedureName,
            notes: appointment.note,
            status: appointment.status || 'no status',
            scheduleId: appointment.ScheduleID
          });
        }
      });
      console.log('Processed schedules for doctor:', doctor, ':', newSchedules);
      setSchedules(newSchedules);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Error response:', error.response.data);
          console.error('Error status:', error.response.status);
          console.error('Error headers:', error.response.headers);
          alert(`Failed to fetch appointments: ${error.response.data.error || error.response.data.details || 'Unknown error'}`);
        } else if (error.request) {
          console.error('No response received:', error.request);
          alert('No response received from server. Please check if the server is running.');
        } else {
          console.error('Error setting up request:', error.message);
          alert(`Error setting up request: ${error.message}`);
        }
      } else {
        console.error('Unknown error:', error);
        alert('An unexpected error occurred while fetching appointments.');
      }
    }
  };

  useEffect(() => {
    console.log('useEffect triggered with doctor:', selectedDoctor, 'and date:', formattedSelectedDate);
    if (selectedDoctor && formattedSelectedDate) {
      fetchAppointments(selectedDoctor, formattedSelectedDate);
    }
  }, [selectedDoctor, formattedSelectedDate]);

  // Add this console log to debug the current state
  console.log('Current state:', {
    selectedDoctor,
    formattedSelectedDate,
    schedules,
    daySchedules,
    selectedDate: selectedDate ? format(selectedDate, "yyyy-MM-dd") : undefined
  });

  const handleSubmit = async () => {
    if (!isFormValid) {
      alert("Please fill out all required fields.");
      return;
    }
  
    setIsLoading(true);
    try {
      // Format sex to single character
      const formattedSex = sex === "Male" ? "M" : sex === "Female" ? "F" : "O";
  
      // Format dates to YYYY-MM-DD
      const formattedBirthday = birthday ? format(birthday, "yyyy-MM-dd") : "";
      const formattedScheduledDate = date ? format(date, "yyyy-MM-dd") : "";
  
      // Format time to HH:mm:ss
      const formattedTime = time ? `${time}:00` : "";
  
      const newAppointment: Appointment = {
        ScheduleID: 0,
        fullName: fullName.trim(),
        birthday: formattedBirthday,
        sex: formattedSex,
        scheduledDate: formattedScheduledDate,
        appointmentTime: formattedTime,
        procedureName,
        note: note.trim(),
        doctor: selectedDoctor || "Dr. Arnel Rivera",
        status: "no status"
      };
  
      console.log("Sending data:", newAppointment);
  
      const response = await axios.post("http://localhost:5000/schedule", newAppointment);
      console.log("Server response:", response.data);
  
      if (response.status === 201 || response.status === 200) {
        alert("Appointment Scheduled Successfully!");
  
        // Update local state with new appointment
        const createdAppointment: Appointment = {
          ...newAppointment,
          ScheduleID: response.data.id
        };
        setAppointments((prevAppointments) => [...prevAppointments, createdAppointment]);
  
        // Update schedules state
        setSchedules((prevSchedules) => ({
          ...prevSchedules,
          [formattedScheduledDate]: [
            ...(prevSchedules[formattedScheduledDate] || []),
            {
              time: formattedTime,
              patient: fullName,
              procedure: procedureName,
              notes: note,
              status: "no status",
              scheduleId: response.data.id
            },
          ],
        }));
  
        // Reset form
        setFullName("");
        setSex("");
        setBirthday(undefined);
        setDate(undefined);
        setTime("");
        setProcedureName("");
        setNote("");
      }
    } catch (error) {
      console.error("Error:", error);
      if (axios.isAxiosError(error) && error.response) {
        alert(`Failed to schedule appointment: ${error.response.data.error}`);
      } else {
        alert("An error occurred while scheduling the appointment.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (scheduleId: number, newStatus: string) => {
    try {
      console.log('Updating status for schedule:', scheduleId, 'to:', newStatus);
      const response = await axios.put(`http://localhost:5000/schedule/${scheduleId}`, {
        status: newStatus
      });
      
      if (response.status === 200) {
        console.log('Status update successful:', response.data);
        // Update local state
        setSchedules(prevSchedules => {
          const newSchedules = { ...prevSchedules };
          Object.keys(newSchedules).forEach(date => {
            newSchedules[date] = newSchedules[date].map(schedule => {
              if (schedule.scheduleId === scheduleId) {
                return { ...schedule, status: newStatus };
              }
              return schedule;
            });
          });
          return newSchedules;
        });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Error response:', error.response.data);
          console.error('Error status:', error.response.status);
          alert(`Failed to update status: ${error.response.data.error || error.response.data.message || 'Unknown error'}`);
        } else if (error.request) {
          console.error('No response received:', error.request);
          alert('No response received from server. Please check if the server is running.');
        } else {
          console.error('Error setting up request:', error.message);
          alert(`Error setting up request: ${error.message}`);
        }
      } else {
        console.error('Unknown error:', error);
        alert('An unexpected error occurred while updating the status.');
      }
    }
  };

  return (
    <div className="schedule">
      <div className="outside-table">
        <div className="header">
          <div className="left">
            <img src={user} />
            <div className="profile">
              <Select onValueChange={(value) => setSelectedDoctor(value)}>
                <SelectTrigger className="name">
                  <SelectValue placeholder="Select a Doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Dr. Arnel Rivera">Dr. Arnel Rivera</SelectItem>
                    <SelectItem value="Dr. Elishar Rivera">Dr. Elishar Rivera</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p id="status">Available</p>
            </div>
          </div>
          <div className="right">
            <Popover>
              <PopoverTrigger asChild>
                <Button className="text-[black] bg-[white] hover:text-[#5D6E7E] hover:bg-[#D9D9D9]">
                  <CalendarIcon /> {format(selectedDate || new Date(), "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start">
                <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="body">
          <div className="table-container">
            <div className="table">
              {daySchedules && daySchedules.length > 0 ? (
                <Table>
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Time</th>
                      <th>Patient Name</th>
                      <th>Procedure</th>
                      <th>Patient Notes</th>
                    </tr>
                  </thead>
                  <TableBody>
                    {daySchedules.map((schedule, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Select 
                            value={schedule.status}
                            onValueChange={(value) => handleStatusChange(schedule.scheduleId, value)}
                          >
                            <SelectTrigger className="select-status">
                              <SelectValue placeholder={schedule.status} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="no status">No Status</SelectItem>
                                <SelectItem value="done">Done</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>{schedule.time}</TableCell>
                        <TableCell>{schedule.patient}</TableCell>
                        <TableCell style={{ color: 'black' }}>{schedule.procedure}</TableCell>
                        <TableCell>{schedule.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p>No schedules for this day.</p>
              )}
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="text-[black] bg-[white] hover:text-[#5D6E7E] hover:bg-[#D9D9D9] mb-2.5">Register Walk-in</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Schedule New Patient</DialogTitle>
              </DialogHeader>
              <div className="grid gap-1 py-1">
                <div className="grid grid-cols-2 items-center gap-1">
                  <Input
                    id="name"
                    placeholder="Name"
                    className="col-span-3 hover:bg-[#f7f5f5]"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 items-center gap-1">
                  <div className="col-span-1">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          className={cn(
                            "w-[185px] justify-start text-left font-normal text-[black] bg-[white] hover:bg-[#f7f5f5]"
                          )}
                        >
                          <CalendarIcon />
                          {birthday ? format(birthday, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={birthday}
                          onSelect={setBirthday}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <Select onValueChange={(value) => setSex(value)}>
                    <SelectTrigger className="select-sex">
                      <SelectValue placeholder="Sex" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Sex</SelectLabel>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Prefer Not To Say">Prefer Not To Say</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Select onValueChange={(value) => setProcedureName(value)}>
                    <SelectTrigger className="select-proc-doc">
                      <SelectValue placeholder="Procedure" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Procedure</SelectLabel>
                        <SelectItem value="Tooth Extraction">Tooth Extraction</SelectItem>
                        <SelectItem value="Dental Cleaning">Dental Cleaning</SelectItem>
                        <SelectItem value="Fill & Root Canals">Fill & Root Canals</SelectItem>
                        <SelectItem value="Dentures">Dentures</SelectItem>
                        <SelectItem value="Cosmetic Restoration">Cosmetic Restoration</SelectItem>
                        <SelectItem value="Fixed Bridge">Fixed Bridge</SelectItem>
                        <SelectItem value="Teeth Retainer">Teeth Retainer</SelectItem>
                        <SelectItem value="Dental Braces">Dental Braces</SelectItem>
                        <SelectItem value="Veeners">Veeners</SelectItem>
                        <SelectItem value="Laser Surgery">Laser Surgery</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 items-center gap-1">
                  <div className="col-span-1">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          className={cn(
                            "w-[185px] justify-start text-left font-normal text-[black] bg-[white] hover:bg-[#f7f5f5]"
                          )}
                        >
                          <CalendarIcon />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        className={cn(
                          "w-[185px] justify-start text-left font-normal text-[black] bg-[white] hover:bg-[#f7f5f5]"
                        )}
                      >
                        {time ? time : <span>Pick a time</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <div className="flex flex-col space-y-2">
                        {availableTimes.map((availableTime) => (
                          <Button
                            key={availableTime}
                            onClick={() => setTime(availableTime)}
                            className="w-full text-left font-normal text-[black] bg-[none] hover:bg-[#f7f5f5]"
                          >
                            {availableTime}
                          </Button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Select>
                    <SelectTrigger className="select-proc-doc">
                      <SelectValue placeholder="Doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Assign to</SelectLabel>
                        <SelectItem value="Dr. Arnel Rivera">Dr. Arnel Rivera</SelectItem>
                        <SelectItem value="Dr. Elishar Rivera">Dr. Elishar Rivera</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <Textarea
                  placeholder="Notes"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="min-height-100 hover:bg-[#f7f5f5]"
                />
              </div>
              <DialogFooter>
                <Button
                  onClick={handleSubmit}
                  className="text-[black] bg-[white] hover:text-[#5D6E7E] hover:bg-[#D9D9D9]"
                  disabled={!isFormValid || isLoading}
                >
                  {isLoading ? "Scheduling..." : "Schedule Appointment"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default Schedule;