"use client"
import './admin.css';
import { Button } from "@/components/ui/button";
import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import user from './media/user.png';
import { useState } from 'react';
import Header from './admin-header';
import { Textarea } from "@/components/ui/textarea"

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
  DialogDescription,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  const schedules = {
    "2024-02-10": [
      { time: "08:00 AM", patient: "John Doe", procedure: "Tooth Extraction", notes: "Requires sedation" },
      { time: "10:00 AM", patient: "Jane Smith", procedure: "Dental Cleaning", notes: "No allergies" }
    ],
    "2024-02-15": [
      { time: "09:00 AM", patient: "Alice Brown", procedure: "Root Canal", notes: "Sensitive teeth" }
    ]
  };

  function Schedule({
    availableTimes,
    date,
    setDate,
    birthday,
    setBirthday,
    time,
    setTime,
  }: {
    availableTimes: string[];
    date: Date | undefined;
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
    birthday: Date | undefined;
    setBirthday: React.Dispatch<React.SetStateAction<Date | undefined>>;
    time: string;
    setTime: React.Dispatch<React.SetStateAction<string>>;
  }) {
    const isFormValid = date && birthday && time;
    const [selectedDate, setSelectedDate] = useState(new Date("2024-02-10"));
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    const daySchedules = schedules[formattedDate] || [];
  
    return (
      <div className="schedule">
        <div className="outside-table">
          <div className="header">
            <div className="left">
              <img src={user} />
              <div className="profile">
                <Select>
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
                  <Button variant="outline" className="calendar-button">
                    <CalendarIcon /> {format(selectedDate, "PPP")}
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
                {daySchedules.length > 0 ? (
                  <Table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Time</th>
                        <th>Patient</th>
                        <th>Procedure</th>
                        <th>Patient Notes</th>
                      </tr>
                    </thead>
                    <TableBody>
                      {daySchedules.map((schedule, index) => (
                        <TableRow key={index}>
                          <TableCell><Select>
                          <SelectTrigger><SelectValue placeholder={schedule.status} /></SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="No Status">No Status</SelectItem>
                              <SelectItem value="Done">Done</SelectItem>
                              <SelectItem value="Cancelled">Cancelled</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select></TableCell>
                          <TableCell>{schedule.time}</TableCell>
                          <TableCell>{schedule.patient}</TableCell>
                          <TableCell>{schedule.procedure}</TableCell>
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
  
          <Dialog>
          <DialogTrigger asChild><Button variant="outline">Register Walk-in</Button></DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader><DialogTitle>Schedule New Patient</DialogTitle></DialogHeader>
            <div className="grid gap-1 py-1">
              <div className="grid grid-cols-2 items-center gap-1">
                <Input id="name" placeholder="Name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-2 items-center gap-1">
                <div className="col-span-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[185px] justify-start text-left font-normal"
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
                <Select>
                  <SelectTrigger className="w-[185px]"><SelectValue placeholder="Sex" /></SelectTrigger>
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
                <Select>
                  <SelectTrigger className="w-[375px]"><SelectValue placeholder="Procedure" /></SelectTrigger>
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
                        variant={"outline"}
                        className={cn(
                          "w-[185px] justify-start text-left font-normal"
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
                      variant={"outline"}
                      className={cn(
                        "w-[185px] justify-start text-left font-normal"
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
                          variant="outline"
                          onClick={() => setTime(availableTime)}
                          className="w-full text-left"
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
                  <SelectTrigger className="w-[375px]"><SelectValue placeholder="Doctor" /></SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Assign to</SelectLabel>
                      <SelectItem value="Dr. Arnel Rivera">Dr. Arnel Rivera</SelectItem>
                      <SelectItem value="Dr. Elishar Rivera">Dr. Elishar Rivera</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={!isFormValid}
                onClick={() => {
                  setDate(undefined);
                  setBirthday(undefined);
                  setTime("");
                }}
              >
                Schedule
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
    );
  }

  function PatientInfoHistory() {
    const [birthday, setBirthday] = useState(null);
  const [date, setDate] = useState(null); // Added missing date state

  const patientData = [
    {
      name: "John Doe",
      birthday: "01/15/1990",
      contactNumber: "+1 (555) 123-4567",
      address: "123 Main St, Springfield, IL",
      allergies: "Peanuts, Dust",
      currentMedications: "Aspirin",
      medicalHistory: "Asthma, Hypertension",
      visits: [
        { date: "2023-05-12", procedure: "Blood Test", notes: "Normal results" },
        { date: "2022-11-23", procedure: "X-ray", notes: "Fracture healing well" }
      ]
    }
  ];

  return (
    <div className="patientInfoHist">
      <div className="outside-table">
        <div className="header">
          <div className="left">
            <h1>List of Patients</h1>
          </div>
          <div className="right">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Add New Patient</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Patient</DialogTitle>
                </DialogHeader>
                <div className="grid gap-1 py-1">
                  <div className="grid grid-cols-2 gap-2">
                    <Input id="name" placeholder="Name" />
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[185px] justify-start text-left font-normal">
                          {birthday ? format(birthday, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={birthday} onSelect={setBirthday} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <Input id="address" placeholder="Address" />
                  <Input id="contact" placeholder="Contact Number" />
                  <Input id="allergies" placeholder="Allergies" />
                  <Input id="medications" placeholder="Current Medications" />
                  <Input id="history" placeholder="Medical History" />
                </div>
                <DialogFooter>
                  <Button>Add Patient</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="body">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Birthday</TableHead>
                <TableHead>Contact Number</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Allergies</TableHead>
                <TableHead>Current Medications</TableHead>
                <TableHead>Medical History</TableHead>
                <TableHead>Visits</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patientData.map((patient, index) => (
                <TableRow key={index}>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.birthday}</TableCell>
                  <TableCell>{patient.contactNumber}</TableCell>
                  <TableCell>{patient.address}</TableCell>
                  <TableCell>{patient.allergies}</TableCell>
                  <TableCell>{patient.currentMedications}</TableCell>
                  <TableCell>{patient.medicalHistory}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger>Open</DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Previous Visits</DialogTitle>
                          <DialogDescription>
                            This is the list of {patient.name}'s visits for the last 5 years.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="visit-table">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Procedure Performed</TableHead>
                                <TableHead>Notes</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {patient.visits.map((visit, vIndex) => (
                                <TableRow key={vIndex}>
                                  <TableCell>{visit.date}</TableCell>
                                  <TableCell>{visit.procedure}</TableCell>
                                  <TableCell>{visit.notes}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                        <DialogFooter>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline">Add Record</Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-4 space-y-3">
                              <h3 className="text-lg font-semibold">Add New Record for {patient.name}</h3>
                              <div className="grid gap-2">
                                <div>
                                  <label className="text-sm font-medium">Date:</label>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button variant="outline" className="w-full flex justify-between">
                                        <CalendarIcon />
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                                    </PopoverContent>
                                  </Popover>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Procedure:</label>
                                  <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a procedure" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="procedure1">Procedure 1</SelectItem>
                                      <SelectItem value="procedure2">Procedure 2</SelectItem>
                                      <SelectItem value="procedure3">Procedure 3</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Notes:</label>
                                  <Textarea id="record-notes" placeholder="Enter notes here" />
                                </div>
                              </div>
                              <Button className="w-full">Add</Button>
                            </PopoverContent>
                          </Popover>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}



function Admin() {
  const [date, setDate] = React.useState<Date>();
  const [birthday, setBirthday] = React.useState<Date>();
  const [time, setTime] = React.useState<string>("");
  const [activeTab, setActiveTab] = React.useState<'schedule' | 'patientInfo'>('schedule'); // Track active tab

  const availableTimes = [
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", 
    "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
  ];

  const [activeComponent, setActiveComponent] = useState<'schedule' | 'patientInfo'>('schedule');  // Default to 'schedule'

  const handleScheduleClick = () => {
    setActiveComponent('schedule');
  };

  const handlePatientInfoClick = () => {
    setActiveComponent('patientInfo');
  };

  return (
    <div>
      <Header 
        onScheduleClick={handleScheduleClick} 
        onPatientInfoClick={handlePatientInfoClick}
      />
      {activeComponent === 'schedule' && <Schedule availableTimes={availableTimes} date={date} setDate={setDate} birthday={birthday} setBirthday={setBirthday} time={time} setTime={setTime} />}
      {activeComponent === 'patientInfo' && <PatientInfoHistory />}
    </div>
  );
}

export default Admin;
