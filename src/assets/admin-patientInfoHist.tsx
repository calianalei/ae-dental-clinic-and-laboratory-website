"use client"
import './admin.css';
import axios from "axios"; 
import { Button } from "@/components/ui/button";
import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import user from './media/user.png';
import { useState } from 'react';
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

const API_URL = 'http://localhost:5000/api';

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

  const [record, setRecord] = useState({
  date: null,
  procedure: "",
  notes: "",
});

const handleAddClick = () => {
  // Handle the event here
  console.log("Adding new record with details:", record);
  // You can perform any actions such as submitting data to a server or saving it locally
  // For example, resetting the form after adding
  setRecord({ date: null, procedure: "", notes: "" });
};

const [patient, setPatient] = useState({
  name: '',
  address: '',
  contact: '',
  allergies: '',
  medications: '',
  history: '',
  birthday: null,
});

const handleAddPatient = async () => {
  try {
    const formattedBirthday = patient.birthday 
      ? format(patient.birthday, "yyyy-MM-dd")
      : "1970-01-01"; // Default date if not provided

      const response = await axios.post(`${API_URL}/patients`, {
        fullName: patient.name,    // Ensure no missing commas
        birthday: formattedBirthday,
        address: patient.address,  // Check if `address` is correctly defined
        contactNum: patient.contact,
        allergies: patient.allergies,
        currentMedications: patient.medications,
        medicalHistory: patient.history,
      });

    console.log("Response:", response);

    if (response.status === 201) {
      alert("Patient added successfully!");
    } else {
      alert("Failed to add patient.");
    }
  } catch (error) {
    console.error("Error adding patient:", error);
    if (error.response) {
      console.error("Server Response:", error.response.data);
      alert(`Error: ${error.response.data.message || "An error occurred while adding the patient."}`);
    } else {
      alert("An error occurred while adding the patient.");
    }
  }
};

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
                <Button className="text-[black] bg-[white] hover:text-[#5D6E7E] hover:bg-[#D9D9D9]">Add New Patient</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Patient</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-1 py-1">
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        id="name"
                        placeholder="Name"
                        className={cn("w-[185px] justify-start font-normal text-[black] bg-[white] hover:bg-[#f7f5f5]")}
                        value={patient.name}
                        onChange={(e) => setPatient({ ...patient, name: e.target.value })}
                      />
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            className={cn("w-[185px] justify-start font-normal text-[black] bg-[white] hover:bg-[#f7f5f5]")}
                            onClick={() => {/* You can handle date selection here */}}
                          >
                            <CalendarIcon />
                            {patient.birthday ? format(patient.birthday, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={patient.birthday}
                            onSelect={(date) => setPatient({ ...patient, birthday: date })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <Input
                      id="address"
                      placeholder="Address"
                      className={cn("w-[full] justify-start font-normal text-[black] bg-[white] hover:bg-[#f7f5f5]")}
                      value={patient.address}
                      onChange={(e) => setPatient({ ...patient, address: e.target.value })}
                    />
                    <Input
                      id="contact"
                      placeholder="Contact Number"
                      className={cn("w-[full] justify-start font-normal text-[black] bg-[white] hover:bg-[#f7f5f5]")}
                      value={patient.contact}
                      onChange={(e) => setPatient({ ...patient, contact: e.target.value })}
                    />
                    <Input
                      id="allergies"
                      placeholder="Allergies"
                      className={cn("w-[full] justify-start font-normal text-[black] bg-[white] hover:bg-[#f7f5f5]")}
                      value={patient.allergies}
                      onChange={(e) => setPatient({ ...patient, allergies: e.target.value })}
                    />
                    <Input
                      id="medications"
                      placeholder="Current Medications"
                      className={cn("w-[full] justify-start font-normal text-[black] bg-[white] hover:bg-[#f7f5f5]")}
                      value={patient.medications}
                      onChange={(e) => setPatient({ ...patient, medications: e.target.value })}
                    />
                    <Input
                      id="history"
                      placeholder="Medical History"
                      className={cn("w-[full] justify-start font-normal text-[black] bg-[white] hover:bg-[#f7f5f5]")}
                      value={patient.history}
                      onChange={(e) => setPatient({ ...patient, history: e.target.value })}
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      className="w-[full] text-[white] bg-[black] hover:text-[black] hover:bg-[#f7f7f7]"
                      onClick={handleAddPatient}
                    >
                      Add Patient
                    </Button>
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
                              <Button className="text-[black] bg-[#f7f7f7] hover:text-[black] hover:bg-[#D9D9D9]">Add Record</Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-4 space-y-3">
                              <h3 className="text-lg font-semibold">Add New Record for {patient.name}</h3>
                              <div className="grid gap-2">
                                <div>
                                  <label className="text-sm font-medium">Date:</label> <br />
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        className={cn("w-[250px] justify-start font-normal text-[black] bg-[white] hover:bg-[#f7f5f5]")}
                                        onClick={() => {/* You can handle date selection here */}}
                                      >
                                        <CalendarIcon />
                                        {record.date ? format(record.date, "PPP") : <span>Pick a date</span>}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                      <Calendar
                                        mode="single"
                                        selected={record.date}
                                        onSelect={(date) => setRecord({ ...record, date })}
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Procedure:</label>
                                  <Select
                                    onValueChange={(value) => setRecord({ ...record, procedure: value })}
                                  >
                                    <SelectTrigger className={cn("w-[250px] font-normal text-[black] bg-[white] hover:bg-[#f7f5f5]")}>
                                      <SelectValue placeholder="Select a procedure" />
                                    </SelectTrigger>
                                    <SelectContent>
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
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Notes:</label>
                                  <Textarea
                                    className={cn("w-[250px] font-normal text-[black] bg-[white] hover:bg-[#f7f5f5]")}
                                    id="record-notes"
                                    placeholder="Enter notes here"
                                    value={record.notes}
                                    onChange={(e) => setRecord({ ...record, notes: e.target.value })}
                                  />
                                </div>
                              </div>
                              <Button className="w-full" onClick={handleAddClick}>Add</Button>
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
export default PatientInfoHistory;