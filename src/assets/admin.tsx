"use client";
import "./admin.css";
import * as React from "react";
import Schedule from "./admin-schedule";
import PatientInfoHistory from "./admin-patientInfoHist";
import { Button } from "@/components/ui/button";

interface AdminProps {
  onScheduleClick?: () => void; // Optional callback for schedule click
  onPatientInfoClick?: () => void; // Optional callback for patient info click
}

function Admin({ onScheduleClick, onPatientInfoClick }: AdminProps) {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [birthday, setBirthday] = React.useState<Date | undefined>(undefined);
  const [time, setTime] = React.useState<string>("");
  const [activeComponent, setActiveComponent] = React.useState<"schedule" | "patientInfo">("schedule");
  const [note, setNote] = React.useState<string>("");

  const availableTimes = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  const handleToggle = () => {
    setActiveComponent((prev) => (prev === "schedule" ? "patientInfo" : "schedule"));
    // Trigger optional callbacks based on the active component
    if (activeComponent === "schedule" && onPatientInfoClick) {
      onPatientInfoClick();
    } else if (activeComponent === "patientInfo" && onScheduleClick) {
      onScheduleClick();
    }
  };

  return (
    <div>
      <div className="switch">
        <Button onClick={handleToggle} className="switch-button">
          Manage {activeComponent === "schedule" ? "Patient Information and History" : "Schedule"}
        </Button>
      </div>
      <div>
        {activeComponent === "schedule" && (
          <Schedule
            availableTimes={availableTimes}
            date={date}
            setDate={setDate}
            birthday={birthday}
            setBirthday={setBirthday}
            time={time}
            setTime={setTime} 
            note={note}
            setNote={setNote} />
        )}
        {activeComponent === "patientInfo" && <PatientInfoHistory />}
      </div>
    </div>
  );
}

export default Admin;