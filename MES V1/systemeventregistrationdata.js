project.setTag("PLC/GT_Home","1");



var recv_add = "";
var state_pre = 0;
var avail = 0;
var str_rec = "";
var id = 0;
var lista_a = [];
var state = new State(); //funcion estado de variables
var event_inf1 = "";
var inf2 = "";
var inf3 = "";
var inf4 = "";
var search_event="";
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
    
    
    
    
    state_pre = 0;
    var tagMgr = project.getWidget("_TagMgr");
    var protID = "prot4"; // to be set according to protocol numbering
    var avail = parseInt(tagMgr.invokeProtocolCommand(protID, "tokens_available", ""));   
    
    while (avail > 0  || state_pre ===0)    
    { 
        state_pre = 1;
        var str = tagMgr.invokeProtocolCommand(protID, "get", ""); // get the next token    
        var status = tagMgr.invokeProtocolCommand(protID, "token_ack",""); // acknowledge current token    
        avail = parseInt(tagMgr.invokeProtocolCommand(protID, "tokens_available","")); // get number of available tokens in queue    
        str_rec = str_rec + str;
    }    
        
    var str_a = str_rec.substring(0,parseInt(str_rec.length));
    project.setTag("event_receive",str_a);  // escritura en tag  
    
    var splitString = str_a.split("(");// separacion de datos por caracter '\n' (salto de linea)    
    
    for (var i = 0; i < splitString.length; i++) { 
        lista_a[i]= splitString[i].split(")")[0].split(",");                          
        str_rec = "";
    }   
    
    lista_a.shift();

    for (i = 0; i < lista_a.length; i++) {
        lista_b.push(lista_a[i][0].trim());
        //lista_d.push(lista_a[i][3].trim());
        
        //lista_n.push(lista_a[i][13].trim());
        str_rec = "";
    }
    
    //alert("lista a[0] = "+lista_a[0]);
   // alert("lista a[1] = "+lista_a[1]);
    //alert("lista a = "+lista_a[1]);
    //alert("lista b = "+lista_b[1]);
   // alert(lista_a[1]);
       
}



function vista_eventos_pantalla(){
 
    for (i = 0; i < 20; i++) {
        project.setTag("eventCode("+ i +")", lista_b[i]);  //id
    }  
    
}



function send_data_plc (){
    
    
    for (i = 0; i < 20; i++){ 
        
    project.setTag("ArraySystemActivityHMI("+ i +")", lista_b[i]); 
    project.setTag("PLC/ArraySystemActivity_"+i+"", lista_b[i]);
   
    }
    
   // alert("event name " + project.getTag("nameEvent(10)",state,0)); 
   
}

//TENER EN CUENTA, PUEDE QUE TOQUE QUITARLO

if (project.getTag("actualizar_eventoSistema",state,0)===1){
    project.setTag("actualizar_eventoSistema",0);
    download_data();
    //vista_eventos_pantalla();
    send_data_plc ();
    project.setTag("PLC/PAC_Preload", 0); 
    project.loadPage("EventRegistration.jmx");
}