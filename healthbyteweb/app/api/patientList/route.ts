import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

async function getPatientList(){
    const supabase = await createClient();
    const {data: {user}} =  await supabase.auth.getUser(); 

    if(user){
        console.log("users")
        const {data: patients, error: getPatientError} =  await supabase.from("patientlist").select().eq("doctor_id", user.id)

        if(getPatientError){
            console.log(`Error: ${getPatientError}`)
        }

        return patients
    } else {
        console.log("NO USER")
        throw new Error("no user")
    }


}

export async function GET(){
    try {
        const patients = await getPatientList()
        if(patients){
            console.log(patients)
            return NextResponse.json({
                success: true,
                patients: patients
            })
        } else {
            throw new Error("GET: getPatientList Failed")
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error in getting patient list"
        })        
    }
}