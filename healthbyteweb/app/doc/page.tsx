import { createClient } from "@/utils/supabase/server";

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

export default async function DocPage(){
    const supabase = await createClient()

    const {data: {user}} = await supabase.auth.getUser()

    const {data: patients, error} = await supabase.from("patientlist").select().eq('doctor_id', user?.id)
    if(patients){
        
        return(
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
        )
    }

    return(
        <div>DOC PAGE</div>
    )
    
 



}