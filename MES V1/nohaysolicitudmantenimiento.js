function cerrarMensajeNoMantenimiento(me, eventInfo)
{
     project.setTag("PLC/GT_WithoutMaintenanceRequest",0); 
    project.closeDialog("NoHaySolicitudMantenimiento.jmx");
}