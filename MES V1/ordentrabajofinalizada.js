function cerrarMensajeOrden(me, eventInfo)
{
     project.setTag("PLC/GT_MenssageJOBCompleted",0); 
    project.closeDialog("OrdenTrabajoFinalizada.jmx");
}