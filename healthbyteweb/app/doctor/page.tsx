'use client'
import { useEffect, useState } from "react";

interface Patient {
    id: string;
    name: string;
    age: number;
    sex: string;
    stepstaken: number;
    bloodoxygen: number;
    weight: number;
    height: number;
    doctor_id: string;
}

export default function DoctorPage() {
    
    const [patients, setPatient] = useState<Patient[] | null>(null)

    useEffect(() =>{
        const getPatients = async() => {
            const response = await fetch('/api/patientList', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json()

            setPatient(data.patients)
        }

        getPatients()
    }, [])


        console.log(patients)

        if(patients){
            return (
                <div>
                    <h1>Patient List</h1>
                    <ul>
                        {patients.map((patient:Patient) => (
                            <li key={patient.id}>
                                <h2>{patient.name}</h2>
                                <p>Age: {patient.age}</p>
                                <p>Sex: {patient.sex}</p>
                                <p>Steps Taken: {patient.stepstaken}</p>
                                <p>Blood Oxygen: {patient.bloodoxygen}</p>
                                <p>Weight: {patient.weight}</p>
                                <p>Height: {patient.height}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            );

        }
  
    
}