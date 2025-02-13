'use client'
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

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
    const [searchTerm, setSearchTerm] = useState("");
    
    
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


            const downloadCSV = () => {
                const csvHeader = Object.keys(patients[0]).join(",");
                const csvRows = patients.map((patient) =>
                  Object.values(patient).join(",")
                );
                const csvContent = [csvHeader, ...csvRows].join("\n"); 
            
                const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" }); 
                const url = URL.createObjectURL(blob); 
                const link = document.createElement("a"); 
                link.setAttribute("href", url);
                link.setAttribute("download", "patients.csv"); 
                link.style.display = "none";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              };

              const filteredPatients = patients.filter((patient) =>
                patient.name.toLowerCase().includes(searchTerm.toLowerCase())
              );
            

            // return (
            //     <div>
            //         <h1>Patient List</h1>
            //         <ul>
            //             {patients.map((patient:Patient) => (
            //                 <li key={patient.id}>
            //                     <h2>{patient.name}</h2>
            //                     <p>Age: {patient.age}</p>
            //                     <p>Sex: {patient.sex}</p>
            //                     <p>Steps Taken: {patient.stepstaken}</p>
            //                     <p>Blood Oxygen: {patient.bloodoxygen}</p>
            //                     <p>Weight: {patient.weight}</p>
            //                     <p>Height: {patient.height}</p>
            //                 </li>
            //             ))}
            //         </ul>
            //     </div>
            // );


            return (
                <div className="container mx-auto p-6 text-black">
                 
              
                <h1 className=" text-7xl font-bold mb-6" >Doctor View</h1>
            
                 
                  <div className="mb-6">
                    <input
                      type="text"
                      placeholder="Search by patient name..."
                      className="w-full md:w-1/2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <h1 className=" text-3xl font-bold mb-6">Patient List</h1>
               
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPatients.length > 0 ? (
                      filteredPatients.map((patient) => (
                        <div
                          key={patient.id}
                          className="card bg-gray-100 p-6 rounded-lg shadow-md"
                        >
                          <h2 className="text-xl font-semibold">{patient.name}</h2>
                          <p>Steps Taken: {patient.stepstaken}</p>
                          <p>Blood Oxygen Levels: {patient.bloodoxygen}%</p>
                          <Link
                            href={`/doctorView/${patient.id}`}
                            className="text-blue-500 mt-4 block hover:underline"
                          >
                            View Details
                          </Link>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No patients found.</p>
                    )}
                  </div>
            
                  <button
                    onClick={downloadCSV}
                    className="fixed bottom-6 right-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
                  >
                    Download CSV
                  </button>
            
                </div>
              );

        }
  
    
}