<?php

namespace App\Enum;

enum AppointmentStateEnum : string
{
    // Los estados son strings para poder crear casos intermedios
    // En este ejemplo los mantenemos simples
    case CREATED = '0';
    case IN_PROGRESS = '1';
    case FINISHED = '2'; 
}
