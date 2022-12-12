import { atcb_action } from "add-to-calendar-button";
import { useEffect, useState } from "react";
import 'add-to-calendar-button/assets/css/atcb.css'
import { auth, db } from "../main";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "@firebase/firestore";

export const Appointments = () => {
    const [appointments, setAppointments] = useState<any[]>();

    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.currentUser) {
            navigate('/login');
        }

        const fetchData = async () => {
            // const q = query(collection(db, 'users_practitioners'), where('name', '==', search));
            const querySnapshot = await getDocs(query(collection(db, 'rdv'), where('idClient', '==', auth.currentUser?.uid)));
            let rdv: any[] = [];
            querySnapshot.forEach((docu) => {
                 rdv.push(docu.data());
            });
            setAppointments(rdv);
        }

        fetchData();
    }, [])

    const handleAddToCalendar = (event: any, appointment: any) => {
        atcb_action({
            name: 'Appointment',
            startDate: appointment.date,
            endDate: appointment.date,
            options: ['Apple', 'Google', 'iCal', 'Microsoft365', 'Outlook.com', 'Yahoo'],
            timeZone: "Europe/Berlin",
            iCalFileName: "Reminder-Event",
        });
    }

    return (
        <div>
            <h1>My Appointments</h1>
            {appointments?.map((appointment) => {
                return <div>
                    <p>ID : {appointment.id}</p>
                    <p>Date : {appointment.date}</p>
                    <button onClick={(event: any) => handleAddToCalendar(event, appointment)}>Add to calendar</button>
                </div>
            })}
        </div>
    )
}