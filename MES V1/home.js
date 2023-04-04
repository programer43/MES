
var state = new State();

project.setTag("actualizarOrdenProduccion",0);
project.setTag("actualizar_evento",0);
project.setTag("actualizar_eventoSistema",0);
project.setTag("actualizar_Operarios",0);
project.setTag("Actualizar_OperarioGeneral",0);
project.setTag("PLC/PAC_Preload", 0);

function OperarioUpdate(me, eventInfo)
{
    var pasPLC = project.getTag("PLC/GT_CodeOpeatorFIFO",state,0);
    var listPass = project.getTag("passwordOP",state,-1);
    var posPassPLC =  listPass.indexOf(pasPLC,0);
    //alert("IndexOP:"+posPassPLC);
    project.setTag("operarioSelectToJOB",project.getTag("nameOP("+posPassPLC+")"));

    
}


function eventUpdate(me, eventInfo)
{
     var codeEventPLC_x = project.getTag("PLC/GT_MOTIVO_ACTUAL_VISUAL",state,0);

     var listCodeHMI_x=[];

    for (i = 0; i < 150; i++){
    listCodeHMI_x[i] = project.getTag("eventCode("+i+")",state,0);
    }
    //alert(listCodeHMI_x)

     var indexCodeEvent_x =  listCodeHMI_x.indexOf(codeEventPLC_x,0);
    if(project.getTag("PLC/DP_MAQUINA_PARADA",state,0)==0)
    {project.setTag("eventSelectToJOB","OPERACIÓN");
    }else{
    project.setTag("eventSelectToJOB",project.getTag("nameEvent("+indexCodeEvent_x+")"));
    }
    //alert("index:"+ indexCodeEvent + "variable PLC: "+ codeEventPLC+ "evenmt:name:"+project.getTag("nameEvent("+indexCodeEvent+")"));  
    //return false;
}


function productionOrderUpdate(me, eventInfo)
{
    var pasPLC = project.getTag("PLC/OP_JOBIdRecipe",state,0);
    
   var listPass = project.getTag("idOrdenProduccion",state,-1);
    
   /*var listJobCode=[];
    
   for (i = 0; i < 150; i++){
   listJobCode[i] = project.getTag("eventCode("+i+")",state,0);
   }
   */
    
    var posPassPLC =  listPass.indexOf(pasPLC,0);
    if(pasPLC!=0){
    project.setTag("CodigoOpSeleccionado",project.getTag("codigoOrdenProduccion("+posPassPLC+")"));
    }else{project.setTag("CodigoOpSeleccionado","Sin orden");}
    if(pasPLC!=0){
    project.setTag("ReferenciaSeleccionada",project.getTag("referenciaOrdenProduccion("+posPassPLC+")"));
    }else{project.setTag("ReferenciaSeleccionada","Sin referencia");}
    project.setTag("DescripcionOPseleccionada",project.getTag("descripcionOrdenProduccion("+posPassPLC+")"));
    
    project.setTag("CantidadOPseleccionada",project.getTag("jobQty",state,posPassPLC));
    
    project.setTag("MetaOPseleccionada",project.getTag("jobGoal",state,posPassPLC));
    //alert(project.getTag("descripcionOrdenProduccion("+posPassPLC+")"));
}
function datosOP(){
 
    var datos=[];
    for(i=0; i<200; i++){
        datos[i]=project.getTag("nameOP("+i+")",state,0);
    
    
  }  
       
}


function autoCargueDatos(){
 
    if(project.getTag("PLC/GT_PYpreload",state,0)==1){
       project.loadPage("preloadData.jmx");
    }
    if(project.getTag("PLC/GT_ResetHMI",state,0)==1){
      
    }
}



function cargaDatosAutomatica(){

if(project.getTag("PLC/Exp_Enable_0",state,0)==1){
 
    project.loadPage("preloadData.jmx");
    project.setTag("PLC/Exp_Enable_0",0)
   }

}

function resetPantalla(){
    
    if(project.getTag("PLC/GT_ResetHMI",state,0)==1){
       
       project.setTag("PLC/GT_ResetHMI",0);
       project.loadPage("ResetHMI.jmx")
        
     }
}


project.setTag("preload_data",1);


function alerts()
{
    
    var eventocausal= project.getTag("PLC/GT_NoFingering",state,0);
    //var NoHaySolicitud = project.getTag("PLC/GT_WithoutMaintenanceRequest",state,0);
    var SolicitudMantenimiento = project.getTag("PLC/GT_MaintenanceRequest",state,0);
    var DiagnosticoMantenimiento = project.getTag("PLC/GT_MaintenanceDiagnostic",state,0);
    var ConfirmacionArranque  = project.getTag("PLC/GT_VISUALIZA_CONF_ARRANQUE",state,0);
    //alert(SolicitudMantenimiento);
    if (eventocausal==1){
        project.showDialog("eventocausal.jmx");//traer el dialogo
    }
    else {
        project.closeDialog("eventocausal.jmx");//cerrar el dialogo
    }
    /*if (NoHaySolicitud==1){
        project.showDialog("NoHaySolicitud.jmx");//traer el dialogo
    }
    else {
        project.closeDialog("NoHaySolicitud.jmx");//cerrar el dialogo
    }*/
    
    if (SolicitudMantenimiento==1){
        project.showDialog("SolicitudMantenimiento.jmx");//traer el dialogo
    }
    else {
        project.closeDialog("SolicitudMantenimiento.jmx");//cerrar el dialogo
    }
    if (DiagnosticoMantenimiento==1){
        project.showDialog("DiagnosticoMantenimiento.jmx");//traer el dialogo
    }
    else {
        project.closeDialog("DiagnosticoMantenimiento.jmx");//cerrar el dialogo
    }
    if (ConfirmacionArranque==1){
        project.showDialog("ConfirmacionArranque.jmx");//traer el dialogo
    }
    else {
        project.closeDialog("ConfirmacionArranque.jmx");//cerrar el dialogo
    }
    page.setTimeout("alerts()",1000);
}


function Home_onActivate(me, eventInfo)
{
    project.closeDialog("Procesando.jmx");
    alerts();
}
