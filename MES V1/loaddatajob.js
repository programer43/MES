
var state = new State(); //funcion estado de variables
var counter = 0;

project.setTag("actualizar_Operarios",1);
project.setTag("Actualizar_OperarioGeneral",1);
project.setTag("actualizar_evento",1);
project.setTag("actualizarOrdenProduccion",1);

function GroupWgt1_field2_onDataUpdate(me, eventInfo){    
    project.setTag("PLC/TM_START_TON_TIMER", 0);  // escritura en tag
    project.setTag("PLC/TM_START_TON_TIMER", 1);  // escritura en tag
   
   
}

function timerOutOnDataUpdate(me, eventInfo)
{
    var command = project.getTag("command",state,0);
    var page_load = project.getTag("pageLoad",state,0);
    
    //var timerOut = parseInt(project.getTag("PLC/TM_SIGNAL_OUTPUT_TON_TIMER",state,0));  
    var timerOut = project.getTag("PLC/TM_SIGNAL_OUTPUT_TON_TIMER",state,0);  
    //alert("update data state = " + timerOut + "   " + typeof timerOut);
    if(timerOut=== true){
        //alert("load page on");
        project.loadPage(page_load+".jmx");
    }    
}




