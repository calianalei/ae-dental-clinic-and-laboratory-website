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
import { useState, useEffect } from 'react';
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

interface Patient {
  PatientID?: number;
  fullName: string;
  birthday: Date | null;
  address: string;
  contactNum: string;
  allergies: string;
  currentMedications: string;
  medicalHistory: string;
}

interface VisitRecord {
  date: Date | null;
  procedure: string;
  notes: string;
}

interface Visit {
  VisitID?: number;
  PatientID: number;
  visitDate: string;
  procedure: string;
  notes: string;
}

function PatientInfoHistory() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [patient, setPatient] = useState<Patient>({
    fullName: '',
    birthday: null,
    address: '',
    contactNum: '',
    allergies: '',
    currentMedications: '',
    medicalHistory: '',
  });
  const [record, setRecord] = useState<VisitRecord>({
    date: null,
    procedure: '',
    notes: '',
  });

  const filterRanges = ['all', 'a-e', 'f-j', 'k-o', 'p-t', 'u-z'];
  const [currentFilterIndex, setCurrentFilterIndex] = useState(0);

  // Fetch patients and visits on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [patientsResponse, visitsResponse] = await Promise.all([
          axios.get('http://localhost:5000/patient-info'),
          axios.get('http://localhost:5000/previous-visits')
        ]);
        setPatients(patientsResponse.data);
        setFilteredPatients(patientsResponse.data);
        setVisits(visitsResponse.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        if (axios.isAxiosError(err)) {
          setError(`Failed to load patient information: ${err.response?.data?.error || err.message}`);
        } else {
          setError('Failed to load patient information');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterPatients = (range: string) => {
    setActiveFilter(range);
    if (range === 'all') {
      setFilteredPatients(patients);
      return;
    }

    const [start, end] = range.split('-');
    const filtered = patients.filter(patient => {
      const lastName = patient.fullName.split(' ').pop()?.toLowerCase() || '';
      return lastName >= start.toLowerCase() && lastName <= end.toLowerCase();
    });
    setFilteredPatients(filtered);
  };

  const handleAddClick = () => {
    // Handle the event here
    console.log("Adding new record with details:", record);
    // You can perform any actions such as submitting data to a server or saving it locally
    // For example, resetting the form after adding
    setRecord({ date: null, procedure: "", notes: "" });
  };

  const handleAddPatient = async () => {
    try {
      if (!patient.fullName || !patient.birthday) {
        alert('Please fill in all required fields');
        return;
      }

      const formattedBirthday = format(patient.birthday, 'yyyy-MM-dd');
      const response = await axios.post('http://localhost:5000/patient-info', {
        ...patient,
        birthday: formattedBirthday
      });

      if (response.status === 201) {
        alert('Patient added successfully!');
        // Refresh the patients list
        const patientsResponse = await axios.get('http://localhost:5000/patient-info');
        setPatients(patientsResponse.data);
        // Reset the form
        setPatient({
          fullName: '',
          birthday: null,
          address: '',
          contactNum: '',
          allergies: '',
          currentMedications: '',
          medicalHistory: '',
        });
      }
    } catch (err) {
      console.error('Error adding patient:', err);
      if (axios.isAxiosError(err)) {
        alert(`Error: ${err.response?.data?.error || 'Failed to add patient'}`);
      } else {
        alert('An error occurred while adding the patient');
      }
    }
  };

  const handleAddVisit = async (patientId: number) => {
    try {
      if (!record.date || !record.procedure) {
        alert('Please fill in all required fields');
        return;
      }

      const formattedDate = format(record.date, 'yyyy-MM-dd');
      const response = await axios.post('http://localhost:5000/patient/visits', {
        PatientID: patientId,
        visitDate: formattedDate,
        procedurePerformed: record.procedure,
        notes: record.notes
      });

      if (response.status === 201) {
        alert('Visit record added successfully!');
        // Refresh the visits list
        const visitsResponse = await axios.get('http://localhost:5000/previous-visits');
        setVisits(visitsResponse.data);
        // Reset the form
        setRecord({
          date: null,
          procedure: '',
          notes: ''
        });
      }
    } catch (err) {
      console.error('Error adding visit:', err);
      if (axios.isAxiosError(err)) {
        alert(`Error: ${err.response?.data?.error || 'Failed to add visit record'}`);
      } else {
        alert('An error occurred while adding the visit record');
      }
    }
  };

  const handlePreviousFilter = () => {
    setCurrentFilterIndex((prev) => (prev > 0 ? prev - 1 : prev));
    filterPatients(filterRanges[currentFilterIndex > 0 ? currentFilterIndex - 1 : 0]);
  };

  const handleNextFilter = () => {
    setCurrentFilterIndex((prev) => (prev < filterRanges.length - 1 ? prev + 1 : prev));
    filterPatients(filterRanges[currentFilterIndex < filterRanges.length - 1 ? currentFilterIndex + 1 : currentFilterIndex]);
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
                        value={patient.fullName}
                        onChange={(e) => setPatient({ ...patient, fullName: e.target.value })}
                      />
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            className={cn("w-[185px] justify-start font-normal text-[black] bg-[white] hover:bg-[#f7f5f5]")}
                          >
                            <CalendarIcon />
                            {patient.birthday ? format(patient.birthday, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={patient.birthday || undefined}
                            onSelect={(date) => setPatient({ ...patient, birthday: date || null })}
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
                      value={patient.contactNum}
                      onChange={(e) => setPatient({ ...patient, contactNum: e.target.value })}
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
                      value={patient.currentMedications}
                      onChange={(e) => setPatient({ ...patient, currentMedications: e.target.value })}
                    />
                    <Input
                      id="history"
                      placeholder="Medical History"
                      className={cn("w-[full] justify-start font-normal text-[black] bg-[white] hover:bg-[#f7f5f5]")}
                      value={patient.medicalHistory}
                      onChange={(e) => setPatient({ ...patient, medicalHistory: e.target.value })}
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
              {filteredPatients.map((patient) => (
                <TableRow key={patient.PatientID}>
                  <TableCell>{patient.fullName}</TableCell>
                  <TableCell>{patient.birthday ? format(new Date(patient.birthday), 'MM/dd/yyyy') : ''}</TableCell>
                  <TableCell>{patient.contactNum}</TableCell>
                  <TableCell>{patient.address}</TableCell>
                  <TableCell>{patient.allergies}</TableCell>
                  <TableCell>{patient.currentMedications}</TableCell>
                  <TableCell>{patient.medicalHistory}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger>View Visits</DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Previous Visits</DialogTitle>
                          <DialogDescription>
                            This is the list of {patient.fullName}'s visits.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="visit-table">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Procedure</TableHead>
                                <TableHead>Notes</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {visits
                                .filter(visit => visit.PatientID === patient.PatientID)
                                .map((visit, vIndex) => (
                                  <TableRow key={vIndex}>
                                    <TableCell>{format(new Date(visit.visitDate), 'MM/dd/yyyy')}</TableCell>
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
                              <Button className="text-[black] bg-[#f7f7f7] hover:text-[black] hover:bg-[#D9D9D9]">
                                Add Record
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-4 space-y-3">
                              <h3 className="text-lg font-semibold">Add New Record for {patient.fullName}</h3>
                              <div className="grid gap-2">
                                <div>
                                  <label className="text-sm font-medium">Date:</label>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        className={cn("w-[250px] justify-start font-normal text-[black] bg-[white] hover:bg-[#f7f5f5]")}
                                      >
                                        <CalendarIcon />
                                        {record.date ? format(record.date, "PPP") : <span>Pick a date</span>}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                      <Calendar
                                        mode="single"
                                        selected={record.date || undefined}
                                        onSelect={(date) => setRecord({ ...record, date: date || null })}
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
                                    placeholder="Enter notes here"
                                    value={record.notes}
                                    onChange={(e) => setRecord({ ...record, notes: e.target.value })}
                                  />
                                </div>
                              </div>
                              <Button 
                                className="w-full" 
                                onClick={() => patient.PatientID && handleAddVisit(patient.PatientID)}
                              >
                                Add Visit Record
                              </Button>
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
        <div className="filter-section" style={{ marginTop: '20px', marginBottom: '50px', textAlign: 'center' }}>
          <div className="filter-buttons" style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <Button
              className="text-[black] bg-[white] hover:text-[#5D6E7E] hover:bg-[#D9D9D9]"
              onClick={handlePreviousFilter}
              disabled={currentFilterIndex === 0}
            >
              &lt;
            </Button>
            <Button
              className={`text-[black] bg-[white] hover:text-[#5D6E7E] hover:bg-[#D9D9D9] ${activeFilter === filterRanges[currentFilterIndex] ? 'bg-[#D9D9D9]' : ''}`}
            >
              {filterRanges[currentFilterIndex].toUpperCase()}
            </Button>
            <Button
              className="text-[black] bg-[white] hover:text-[#5D6E7E] hover:bg-[#D9D9D9]"
              onClick={handleNextFilter}
              disabled={currentFilterIndex === filterRanges.length - 1}
            >
              &gt;
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PatientInfoHistory;