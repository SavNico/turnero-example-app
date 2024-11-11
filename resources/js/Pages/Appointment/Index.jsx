import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({appointments}) {
    return (
        <>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Listado de turnos
                    </h2>
                }
            >
                <Head title="Listado de turnos" />

                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                {appointments.length > 0 && 
                                    <div className="flex justify-center">
                                        <table>
                                            <thead className="bg-red-600 text-white">
                                                <tr>
                                                    <th className="px-6 py-3">Número del turno</th>
                                                    <th className="px-6 py-3">Fecha de creación</th>
                                                    <th className="px-6 py-3">Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-red-200">
                                                {appointments.map((value, index) => (
                                                    <tr key={index}>
                                                        <td className="px-6 py-3">{value.appointment_code}</td>
                                                        <td className="px-6 py-3">{value.created_at}</td>
                                                        <td className="px-6 py-3">
                                                            <Link
                                                                href={route('appointments.takeAppointment', value.id)}
                                                            >
                                                                <PrimaryButton>
                                                                    Tomar turno
                                                                </PrimaryButton>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}    
                                            </tbody>
                                        </table>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    )
}