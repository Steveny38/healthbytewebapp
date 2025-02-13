import { createContext, useContext, useEffect, useState } from "react";

const DoctorContext = createContext<any>(null)

export const DocContextProvider = ({children} : any) => {
    const [patients, setPatients] = useState<null | any>()

    useEffect(() =>{
        const getPatients = async() => {
            const response = await fetch('/api/patientList', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json()

            setPatients(data.patients)
        }

        getPatients()
    }, [])

    return(
        <DoctorContext.Provider value={{patients}}>
            {children}
        </DoctorContext.Provider>
    )
}

export const useDocContext = () => {
    useContext(DoctorContext)
}