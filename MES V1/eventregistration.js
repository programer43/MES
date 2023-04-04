project.setTag("PLC/GT_Home","1");




var sSendcom = "";
var dabUnit = "";


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



function start_timer(){
  var state = new State();
    project.setTag("inicioTimer", 1); 
    }

var operator_receive = project.getTag("operator_receive",state,0);
var event_receive = project.getTag("event_receive",state,0);



function getEvent(me, eventInfo)
{      
    project.setTag("PLC/PAC_Preload", 1); 
    dabUnit = project.getTag("DabUnit",state,0);
    //var work_receive = project.getTag("Personnel",state,0);
    //var work_len = work_receive.length;
    //-----------------inicializacion de comando--------------------
    project.setTag("command", "event");  // escritura en tag     
    sSendcom = dabUnit+";event;1;None";         
   
    //--------------------confirmacion de carga--------------------
    requests(sSendcom);
    project.setTag("pageLoad", "EventRegistrationLoad");  // escritura en tag
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
    project.setTag("pageLoad", "systemEventRegistrationData");  // escritura en tag
    project.loadPage("LoadDataJob.jmx");
    project.setTag("actualizar_eventoSistema",1);
}






function load_event_data(){
   
 //project.setTag("PLC/PAC_Preload", 1); 
 project.setTag("preload_data_event",1);

var contador=project.getTag("preload_data_event",state,0);    
    
switch (contador)
{
  case 1:
                  
      
      getEvent();
      project.setTag("preload_data_event",2);
      break;
  
  
}

}

if (project.getTag("preload_data_event",state,0)==2){
getEventSystem();
project.setTag("preload_data_event",0);
}
/*
var str_rec = "[(01, M001, M001, LLAMADO MANTENIMIENTO, 5, 2, '5', 1, '1', 1, '00000', True, 1, 510000000), (02, A004, A004, ALISTAMIENTO, 1, 3, '8', 1, '1', 1, '00000', True, 1, 110000000), (03, P001, P001, LAVADO DE EQUIPO, 1, 3, '8', 1, '1', 1, '00000', True, 1, 110000000), (04, P002, P002, LAVADO LARGO, 1, 3, '8', 1, '1', 1, '00000', True, 1, 110000000), (05, P005, P005, FALTA DE MATERIA PRIMA, 1, 3, '8', 1, '1', 1, '00000', True, 1, 110000000),(06, P007, P007, FALTA DE MATERIAL DE EMPAQUE , 1, 3, '8', 1, '1', 1, '00000', True, 1, 110000000), (07, P010, P010, DAÑO BASCULA, 1, 3, '8', 1, '1', 1, '00000', True, 1, 110000000), (08, SS88, SS88, SOLICITUD DE MATERIA PRIMA, 1, 3, '8', 1, '1', 1, '00000', True, 1, 110000000), (09, A003, SS89, OPERARIO AUSENTE, 1, 3, '8', 1, '1', 1, '00000', True, 1, 110000000), (10, A064, SS97, ALISTAMIENTO MAQUINA, 1, 3, '8', 1, '1', 1, '00000', True, 1, 110000000), (11, SS99, SS99, FIN DE TURNO, 1, 3, '8', 1, '1', 1, '00000', True, 1, 110000000), (12,     ,  ,  , 1, 3, '8', 1, '1', 1, '00000', True, 1, 0), (13, M002, M002, DAÑO ELÉCTRICO, 3, 1, '2', 2, '3', 1, '00000', True, 1, 310000000), (14, M003, M003, DAÑO MECÁNICO, 3, 1, '2', 2, '3', 1, '00000', True, 1, 310000000), (15, M004, M004, FALTA DE GAS, 3, 1, '2', 2, '3', 1, '00000', True, 1, 310000000), (16, M005, M005, FLUJO DE GAS, 3, 1, '2', 2, '3', 1, '00000', True, 1, 310000000), (17, M006, M006, DAÑO RODAMIENTOS, 3, 1, '2', 2, '3', 1, '00000', True, 1, 310000000), (18, M007, M007, FALTA DE REPUESTOS, 3, 1, '2', 2, '3', 1, '00000', True, 1, 310000000), (19, M008, M008, FALTA DE PERSONAL, 3, 1, '2', 2, '3', 1, '00000', True, 1, 310000000), (20, M009, M009, FALTA DE AIRE, 3, 1, '2', 2, '3', 1, '00000', True, 1, 310000000), (41, A002, SS92, NO DIGITACIÓN DE CÓDIGO, 0, 3, '8', 5, '6', 1, '00000', False, 1, 010000000), (43, A005, SS94, SIN PROGRAMACIÓN, 1, 3, '8', 1, '1', 1, '00000', False, 1, 110000000)]";
var lista_a = [];//0
var lista_b = [];//1
var lista_c = [];//2
var lista_d = [];//3
var lista_e = [];//4
var lista_f = [];//5
var lista_g = [];//6
var lista_h = [];//7
var lista_i = [];//8
var lista_j = [];//9
var lista_k = [];//10
var lista_l = [];//11
var lista_m = [];//12
var lista_n = [];//13
var lista_o = [];//14
var lista_p = [];//15
var lista_q = [];//16
var lista_r = [];//17
var lista_s = [];
var lista_t = [];

function download_data()
{   
    
     lista_a = [];//0
     lista_b = [];//1
     lista_c = [];//2
     lista_d = [];//3
     lista_e = [];//4
     lista_f = [];//5
     lista_g = [];//6
     lista_h = [];//7
     lista_i = [];//8
     lista_j = [];//9
     lista_k = [];//10
     lista_l = [];//11
     lista_m = [];//12
     lista_n = [];//13
    
   
    var str_a = str_rec.substring(0,parseInt(str_rec.length));
    project.setTag("event_receive",str_a);  // escritura en tag  
    str_rec = "";
    var splitString = str_a.split("(");// separacion de datos por caracter '\n' (salto de linea)    
    
    for (var i = 0; i < splitString.length; i++) { 
        lista_a[i]= splitString[i].split(")")[0].split(",");                          
        //alert("Listado a:"+lista_a);
    }   
    
    lista_a.shift();

    for (i = 0; i < lista_a.length; i++) {
        lista_b.push(lista_a[i][1].trim());
        lista_d.push(lista_a[i][3].trim());
        
        lista_n.push(lista_a[i][13].trim());
        str_rec = "";
    }
    
    //alert("lista a[0] = "+lista_a[0]);
    //alert("lista a[1] = "+lista_a[1]);
    //alert("lista a = "+lista_a[1]);
    //alert("lista b = "+lista_b);
    //alert("lista b = "+lista_n);
    //alert(lista_a[1]);
       
}



function vista_eventos_pantalla(){
 
    for (i = 0; i < 12; i++) {
        project.setTag("eventCode("+ i +")", lista_b[i]);  //id
    }  
    
}




function selectId(index){
    project.setTag("search_event", lista_b[index]);  // escritura en tag                                                                                  
    //alert("event " + lista_b[index]); 
   // send_event()
}
 
function sendEvent(){
 
    for(var i=0; i<150; i++){
        project.setTag("nameEvent("+ i +")", lista_d[i]);
        project.setTag("eventCode("+ i +")", lista_b[i]); 
    }
}

function send_data_plc (){
    //alert("lista b = "+lista_b);
    //alert("lista b = "+lista_n);   
    
    for (var i = 0; i < 150; i++){ 
         
    //project.setTag("nameEvent("+ i +")", lista_d[i]); 
    //project.setTag("eventCode("+ i +")", lista_b[i]);    
    project.setTag("PLC/ArrayActivity_"+i+"", lista_b[i]);
    project.setTag("PLC/ArrayAttributeOfActivity_"+i+"",lista_n[i]);
    }
    
    //alert("Atributos"+lista_n);
    
   
}

//if (project.getTag("actualizar_evento",state,0)===1){
    
    project.setTag("actualizar_evento",0);
    download_data();
    sendEvent();
    vista_eventos_pantalla();
    send_data_plc ();
   // alert("prueba")
   //alert("listan"+ lista_n)
//}
*/

    
function EventRegistration_onActivate(me, eventInfo)
{
    project.closeDialog("eventocausal.jmx");
}