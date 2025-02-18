"use client"
import './admin.css';
import { Button } from "@/components/ui/button"
import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import user from './media/user.png'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


function Admin() {
    const [date, setDate] = React.useState<Date>()
    const [birthday, setBirthday] = React.useState<Date>()
    const [time, setTime] = React.useState<string>("")

    const availableTimes = [
        "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", 
        "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
    ];

    const isFormValid = date && birthday && time;

    return (
        <div className="schedule">
            <div className="outside-table">
                <div className="header">
                    <div className="left">
                        <img src={user}/>
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
                        
                    </div>
                </div>
                <div className="body">
                    <div className="paging">
                        <Tabs defaultValue="1">
                            <TabsList>
                                <TabsTrigger value="1">1</TabsTrigger>
                                <TabsTrigger value="2">2</TabsTrigger>
                                <TabsTrigger value="3">3</TabsTrigger>
                                <TabsTrigger value="4">4</TabsTrigger>
                                <TabsTrigger value="5">5</TabsTrigger>
                                <TabsTrigger value="6">6</TabsTrigger>
                                <TabsTrigger value="7">7</TabsTrigger>
                            </TabsList>
                            <TabsContent value="1">
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
                                                        <input type="checkbox" id="done1" />
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
                            <TabsContent value="2">Change your password here.</TabsContent>
                            <TabsContent value="3">Make changes to your account here.</TabsContent>
                            <TabsContent value="4">Change your password here.</TabsContent>
                            <TabsContent value="5">Make changes to your account here.</TabsContent>
                            <TabsContent value="6">Change your password here.</TabsContent>
                            <TabsContent value="7">Make changes to your account here.</TabsContent>
                        </Tabs>
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
        </div>
    )
}

export default Admin;
