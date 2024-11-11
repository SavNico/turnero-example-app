<?php

use App\Events\AppointmentsEvent;
use App\Http\Controllers\AppointmentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// no sigue estrictamente las convenciones, se definen así solamente para este ejemplo

// Rutas para los invitados
Route::get('/', [AppointmentController::class, 'create'])->name('appointments.create');
Route::get('/appointment-list', function () {
    return Inertia::render('Appointment/List');
});
Route::post('/appointments', [AppointmentController::class, 'store'])->name('appointments.store');

// Para los usuarios logeados
Route::middleware('auth')->prefix('appointments')->group(function () {
    Route::get('/', [AppointmentController::class, 'index'])->name('appointments.index');
    Route::get('/{id}/takeAppointment', [AppointmentController::class, 'takeAppointment'])->name('appointments.takeAppointment');
    Route::put('/{id}/finishAppointment', [AppointmentController::class, 'finishAppointment'])->name('appointments.finishAppointment');
});

require __DIR__.'/auth.php';
