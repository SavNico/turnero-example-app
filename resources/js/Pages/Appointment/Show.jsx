import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Show({appointment}) {

    const { put } = useForm();

    const finishAppointment = (e) => {
        put(route('appointments.finishAppointment', appointment.id));
    };

    return (
        <>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Turno en curso
                    </h2>
                }
            >
                <Head title="Turno en curso" />

                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 flex flex-col items-center">
                                <h1>Turno número: {appointment.appointment_code}</h1>
                                <PrimaryButton
                                    onClick={() => finishAppointment()}
                                    className="mt-10 bg-orange-600"
                                >
                                    Terminar turno
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>

            </AuthenticatedLayout>
        </>
    )
}