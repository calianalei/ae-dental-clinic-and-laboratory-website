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

function Schedule({
  availableTimes,
  date,
  setDate,
  birthday,
  setBirthday,
  time,
  setTime
}: {
  availableTimes: string[],
  date: Date | undefined,
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>,
  birthday: Date | undefined,
  setBirthday: React.Dispatch<React.SetStateAction<Date | undefined>>,
  time: string,
  setTime: React.Dispatch<React.SetStateAction<string>>
}) {
  const isFormValid = date && birthday && time;

  return (
    <div className="schedule">
      <div className="outside-table">
        <div className="header">
          <div className="left">
            <img src={user} />
            <div className="profile">
              <Select>
                <SelectTrigger className="name"><SelectValue placeholder="Select a Doctor" /></SelectTrigger>
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
            {/* Empty right section for now */}
          </div>
        </div>

        <div className="body">
          <div className="paging">
            <Tabs defaultValue="1">
              <TabsList>
                {[...Array(7).keys()].map(i => (
                  <TabsTrigger key={i} value={(i + 1).toString()}>{i + 1}</TabsTrigger>
                ))}
              </TabsList>
              {[...Array(7).keys()].map(i => (
                <TabsContent key={i} value={(i + 1).toString()}>
                  <div className="table-container">
                    <div className="table">
                      <table className="table">
                        <thead>
                          <tr>
                            <th></th>
                            <th>Time</th>
                            <th>Patient</th>
                            <th>Procedure</th>
                            <th>Patient Notes</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="table-row">
                            <td className="actions">
                              <div className="checkbox-container">
                                <input type="checkbox" id={`done${i + 1}`} />
                              </div>
                            </td>
                            <td>08:00 AM</td>
                            <td className="patient">John Doe</td>
                            <td className="procedure">Tooth Extraction</td>
                            <td className="patient-notes">No allergies, requires sedation</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
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
    const patientData = [
        {
          name: "John Doe",
          birthday: "01/15/1990",
          contactNumber: "+1 (555) 123-4567",
          address: "123 Main St, Springfield, IL",
          allergies: "Peanuts, Dust",
          currentMedications: "Aspirin",
          medicalHistory: "Asthma, Hypertension",
        },
        {
          name: "Jane Doe",
          birthday: "03/22/1985",
          contactNumber: "+1 (555) 987-6543",
          address: "456 Oak St, Rivertown, TX",
          allergies: "Penicillin",
          currentMedications: "Lisinopril",
          medicalHistory: "Diabetes, High Cholesterol",
        },
      ];

  return (
    <div className="patientInfoHist">
        <div className="outside-table">
            <div className="header">
                <div className="left">
                    <h1>List of Patients</h1>
                </div>
                <div className="right">
                    <Dialog >
                        <DialogTrigger asChild><Button variant="outline">Add New Patient</Button></DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader><DialogTitle>Schedule New Patient</DialogTitle></DialogHeader>
                            <div className="grid gap-1 py-1">
                            <div className="grid grid-cols-2 items-center gap-1">
                                <Input id="name" placeholder="Name" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-2 items-center gap-1">

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
                            <Button>Schedule</Button>
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
                            <TableCell></TableCell> 
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
