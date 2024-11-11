<?php

namespace App\Http\Controllers;

use App\Enum\AppointmentStateEnum;
use App\Models\Appointment;
use App\Models\AppointmentRecord;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AppointmentController extends Controller
{
    /**
     * Appointments list
     *
     * @return Response
     */
    public function index() : Response
    {
        /* 
        Recuperamos los últimos 10 turnos de forma ascendiente para obtenerlos
        en el orden en que fueron creados
        */
        $appointments = Appointment::where('state', AppointmentStateEnum::CREATED)
                                    ->orderBy('created_at', 'asc')
                                    ->take(10)
                                    ->get();

        // Todavía no existe la vista pero ya la agregamos al código
        return Inertia::render('Appointment/Index', [
            'appointments' => $appointments
        ]);
    }

    /**
     * Create Appointment
     *
     * @return Response
     */
    public function create() : Response
    {
        // Todavía no existe la vista pero ya la agregamos al código
        return Inertia::render('Appointment/Create');
    }

    /**
     * Store Appointment
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function store(Request $request) : RedirectResponse
    {
        // Creamos el turno
        $appointment = Appointment::create([
            'appointment_code' => $request['appointment_code'],
            'state' => AppointmentStateEnum::CREATED
        ]);

        // También creamos el registro para el historial
        AppointmentRecord::create([
            'appointment_id' => $appointment->id,
            'state' => $appointment->state
        ]);

        // Regresamos a la página encarda de crearlos
        return redirect(route('appointments.create'));
    }

    /**
     * Display one appointment
     *
     * @param [type] $id
     * @return Response
     */
    public function takeAppointment($id) : Response
    {
        // Cuando el usuario logeado seleccione un turno lo va a redirecciónar
        // a esta método y va a cambiar el estado del appointment
       
        // Cambia el estado del appointment
        Appointment::where('id', $id)->update([
            'state' => AppointmentStateEnum::IN_PROGRESS
        ]);

        // Creamos el registro en el historial pero esta vez con el usuario
        // que tomó el turno
        $appointment = Appointment::find($id);

        AppointmentRecord::create([
            'appointment_id' => $appointment->id,
            'user_id' => Auth::user()->id,
            'state' => $appointment->state
        ]);

        return Inertia::render('Appointment/Show', [
            'appointment' => $appointment
        ]);
    }

    public function finishAppointment($id) : RedirectResponse
    {
        // Actualizamos el turno
        Appointment::where('id', $id)->update([
            'state' => AppointmentStateEnum::FINISHED
        ]);

        // Creamos registro en el historial
        AppointmentRecord::create([
            'appointment_id' => $id,
            'user_id' => Auth::user()->id,
            'state' => AppointmentStateEnum::FINISHED
        ]);

        // volvemos al listado
        return redirect(route('appointments.index'));
    }
}
