import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { useForm, usePage } from "@inertiajs/react";

export default function Create({}) {

    const props = usePage().props

    const { data, setData, post, processing, reset} = useForm({
        _token: props.csrf_token,
        appointment_code: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('appointments.store'), {
            onSuccess: () => reset()
        });
    };

    return (
        <>
            <GuestLayout>
                <form onSubmit={submit}>
                    <InputLabel htmlFor="appointment_code" value="Código del turno" />

                    <TextInput
                        id="appointment_code"
                        name="appointment_code"
                        value={data.appointment_code}
                        type="text"
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('appointment_code', e.target.value)}
                        required
                    />

                    <div className="flex items-center justify-center space-x-4 mt-6">
                        <PrimaryButton disabled={processing}>
                            Crear Turno
                        </PrimaryButton>
                    </div>
                </form>
            </GuestLayout>
        </>
    )
}