"use client"
import './admin.css';
import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import user from './media/user.png';
import { useState } from 'react';
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
                  <Button className="text-[black] bg-[white] hover:text-[#5D6E7E] hover:bg-[#D9D9D9]">
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
                          <TableCell>
                            <Select>
                              <SelectTrigger className="select-status"><SelectValue placeholder="No Status" /></SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="No Status">No Status</SelectItem>
                                  <SelectItem value="Done">Done</SelectItem>
                                  <SelectItem value="Cancelled">Cancelled</SelectItem>
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
        <div style={{textAlign: 'center'}}>
        <Dialog>
          <DialogTrigger asChild><Button className="text-[black] bg-[white] hover:text-[#5D6E7E] hover:bg-[#D9D9D9] mb-2.5">Register Walk-in</Button></DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader><DialogTitle>Schedule New Patient</DialogTitle></DialogHeader>
            <div className="grid gap-1 py-1">
              <div className="grid grid-cols-2 items-center gap-1">
                <Input id="name" placeholder="Name" className="col-span-3 hover:bg-[#f7f5f5]"/>
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
                <Select>
                  <SelectTrigger className="select-sex"><SelectValue placeholder="Sex" /></SelectTrigger>
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
                  <SelectTrigger className="select-proc-doc"><SelectValue placeholder="Procedure" /></SelectTrigger>
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
                          "w-[185px] justify-start text-left font-normal text-[black] bg-[white] hover:bg-[#f7f5f5]"                        )}
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
                  <SelectTrigger className="select-proc-doc"><SelectValue placeholder="Doctor" /></SelectTrigger>
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
    </div>
  );
}

export default Schedule;