import { collection, doc, getDocs, query, setDoc, where } from "@firebase/firestore";
import { atcb_action, atcb_init } from "add-to-calendar-button";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../main";
import DatePicker from "react-datepicker";
import 'add-to-calendar-button/assets/css/atcb.css'

import "react-datepicker/dist/react-datepicker.css";

export const Dashboard = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState<string>("");
    const [practitioners, setPractitioners] = useState<any[]>();

    const [date, setDate] = useState<Date>();

    useEffect(() => {
        if (!auth.currentUser) {
            navigate('/login');
        }
        atcb_init()
        const fetchData = async () => {
            // const q = query(collection(db, 'users_practitioners'), where('name', '==', search));
            const querySnapshot = await getDocs(collection(db, 'users_practitioners'));
            let practis: any[] = [];
            querySnapshot.forEach((docu) => {
                 practis.push(docu.data());
            });
            setPractitioners(practis)
        }

        fetchData();
    }, []);

    const handleClickRDV = async (event: any, pract: any) => {
        const date = new Date();
        await setDoc(doc(collection(db, 'rdv')), {
            idPratitioner: pract.uid,
            idClient: auth.currentUser?.uid,
            date: date.toISOString(),
        });
        navigate('/appointments');
    }

    return (
        <div>
            <h1>Practitioners</h1>
            {practitioners &&
                <div>
                    {practitioners.map((practitioner: any) => {
                        return <div>
                                    <p>Name : {practitioner.name}</p>
                                    <p>ID : {practitioner.idPratitioner}</p>
                                    <DatePicker selected={date} onChange={(date: Date) => setDate(date)}/>
                                    <button onClick={(event: any) => handleClickRDV(event, practitioner)}>Prendre rdv</button>
                                </div>
                    })}
                </div>
            }
        </div>
    )
}