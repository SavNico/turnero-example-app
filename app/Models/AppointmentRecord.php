<?php

namespace App\Models;

use App\Events\AppointmentsEvent;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class AppointmentRecord extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'appointment_id',
        'user_id',
        'state',
    ];

    protected static function booted(): void
    {
        static::saved(function () {
            $appointments = Appointment::orderBy('created_at', 'asc')->take(10)->get();
            broadcast(new AppointmentsEvent($appointments));
        });
    }

    public function appointment() : BelongsTo
    {
        return $this->belongsTo(Appointment::class);
    }
}
