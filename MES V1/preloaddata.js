project.setTag("PLC/GT_Home","1");


var recv_add = "";
var state_pre = 0;
var avail = 0;
var count=50000;
var sSendcom = "";
var dabUnit = "";
var len_data = 0;

var state = new State(); //funcion estado de variables
var duration = 3000;


project.setTag("DabUnit", project.getTag("PLC/AA_StationNumber",state,0));
project.setTag("connect", 1);


function reset_timer(){
    if(project.getTag("PLC/TM_SIGNAL_OUTPUT_TON_TIMER",state,0)==1){
    project.setTag("PLC/TM_START_TON_TIMER", 0);
    } 
}

reset_timer();



function requests(sSendcom){
    dabUnit = project.getTag("DabUnit",state,0);//lectura de variable (tag, funcion, index), si es una tag dejar '0', si es array colocar el index o '-1' para traer todo
    //alert("send data to DabUnit = "+ dabUnit);
    var delayInMilliseconds = 1000;//1 second
    var tagMgr = project.getWidget("_TagMgr");
    var protID = "prot4";
    var Cnstat = tagMgr.invokeProtocolCommand(protID, "get_stat", "");

    switch (Cnstat){
        case 'Connected':{
            //alert("send command");
            var avail = parseInt(tagMgr.invokeProtocolCommand(protID, "tokens_available", ""));
            var Send = tagMgr.invokeProtocolCommand(protID, "put", sSendcom);
        }
    }
}

var operator_receive = project.getTag("operator_receive",state,0);
var event_receive = project.getTag("event_receive",state,0);

function getWorkOrder(me, eventInfo)
{   
    //alert("Hola mundo");
    
    dabUnit = project.getTag("DabUnit",state,0);
    var work_receive = project.getTag("work_receive",state,0);
    var work_len = work_receive.length;
    //-----------------inicializacion de comando--------------------
    project.setTag("command", "WorkOrder");  // escritura en tag     
    sSendcom = dabUnit+";WorkOrder;1;None";         
    //alert("work_rec state = " + "   " + typeof work_len + ", len work = " + work_len + "receive =" + work_receive); 
    //--------------------confirmacion de carga--------------------
    requests(sSendcom);
    project.setTag("pageLoad", "preloadOrdenProduccion");  // escritura en tag
    project.loadPage("LoadDataJob.jmx");
    project.setTag("actualizarOrdenProduccion",1);
    
}


function getOperator(me, eventInfo)
{  
    dabUnit = project.getTag("DabUnit",state,0);
    //var work_receive = project.getTag("Personnel",state,0);
    //var work_len = work_receive.length;
    //-----------------inicializacion de comando--------------------
    project.setTag("command", "Personnel");  // escritura en tag     
    sSendcom = dabUnit+";Personnel;1;None";         
   
    //--------------------confirmacion de carga--------------------
    requests(sSendcom);
    project.setTag("pageLoad", "preloadOperario");  // escritura en tag
    project.loadPage("LoadDataJob.jmx");
    
    project.setTag("actualizar_Operarios",1);
    project.setTag("Actualizar_OperarioGeneral",1);     
}



function getEvent(me, eventInfo)
{      
    dabUnit = project.getTag("DabUnit",state,0);
    //var work_receive = project.getTag("Personnel",state,0);
    //var work_len = work_receive.length;
    //-----------------inicializacion de comando--------------------
    project.setTag("command", "event");  // escritura en tag     
    sSendcom = dabUnit+";event;1;None";         
   
    //--------------------confirmacion de carga--------------------
    requests(sSendcom);
    project.setTag("pageLoad", "preloadEvent");  // escritura en tag
    project.loadPage("LoadDataJob.jmx");
    project.setTag("actualizar_evento",1);
}



function getEventSystem(me, eventInfo)
{      
    dabUnit = project.getTag("DabUnit",state,0);
    //var work_receive = project.getTag("Personnel",state,0);
    //var work_len = work_receive.length;
    //-----------------inicializacion de comando--------------------
    project.setTag("command", "event");  // escritura en tag     
    sSendcom = dabUnit+";eventSystem;1;None";         
   
    //--------------------confirmacion de carga--------------------
    requests(sSendcom);
    project.setTag("pageLoad", "preloadEventSystem");  // escritura en tag
    project.loadPage("LoadDataJob.jmx");
    project.setTag("actualizar_eventoSistema",1);
}




var contador=project.getTag("preload_data",state,0);

switch (contador)
{
  case 1:
                  
      project.setTag("PLC/PAC_Preload", 1);
      getEvent();
      project.setTag("preload_data",2);
      break;
  case 2: 
      
      //alert(estado);
      //project.setTag("PLC/STOP_PANTALLA", 0);
      getOperator();
      project.setTag("preload_data",3);
      break;
  case 3: 
      
      getWorkOrder();
      project.setTag("preload_data",4);
      break;
      
  case 4: 
      
      getEventSystem();
      project.setTag("preload_data",0);
      project.setTag("PLC/PAC_Preload", 0); 
      break;
}

function preloadData_onActivate(me, eventInfo)
{

    project.closeDialog("eventocausal.jmx");
    project.closeDialog("SolicitudMantenimiento.jmx");
    project.closeDialog("DiagnosticoMantenimiento.jmx");
    project.closeDialog("ConfirmacionArranque.jmx");
}