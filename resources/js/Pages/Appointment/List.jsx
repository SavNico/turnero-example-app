import GuestLayout from "@/Layouts/GuestLayout";
import { useEffect, useState } from "react";

export default function List() {

    const [appointments, setAppointments] = useState([]);

    // Con esto vamos a conectar al channel que creamos anteriormente
    // Una vez que comiencen los cambios se va a actualizar
    useEffect(() => {
        window.Echo.channel('appointments').listen('AppointmentsEvent', (event) => {
            setAppointments(event.appointments)
        })
    }, [])

    const checkState = (state) => {
        switch(state) {
            case '0':
                return 'Creado'
            case '1':
                return 'En progreso'
            case '2':
                return 'Terminado'
            default:
                return 'error' 
        }
    }

    const checkStateColor = (state) => {
        switch(state) {
            case '0':
                return 'bg-green-200'
            case '1':
                return 'bg-blue-200'
            case '2':
                return 'bg-gray-500'
            default:
                return 'error' 
        }
    }

    return (
        <>
            <GuestLayout>
                {appointments.length > 0 && 
                    <table>
                        <thead className="bg-red-600 text-white">
                            <tr>
                                <th className="px-6 py-3">Número del turno</th>
                                <th className="px-6 py-3">Fecha de creación</th>
                                <th className="px-6 py-3">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((value, index) => (
                                <tr key={index} className={checkStateColor(value.state)}>
                                    <td className="px-6 py-3">{value.appointment_code}</td>
                                    <td className="px-6 py-3">{value.created_at}</td>
                                    <td className="px-6 py-3">{checkState(value.state)}</td>
                                </tr>
                            ))}    
                        </tbody>
                    </table>
                }
            </GuestLayout>
        </>
    )
}