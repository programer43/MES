/*******Retorno a vista principal ***********/
project.setTag("PLC/GT_Home","1");

/******************CODIGO SOLICITUD SERVICIO PHYTON*****************/

var getdata = "";
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


function requests(getdata){
    dabUnit = project.getTag("DabUnit",state,0);//lectura de variable (tag, funcion, index), si es una tag dejar '0', si es array colocar el index o '-1' para traer todo  
   // alert("send data to DabUnit = "+ dabUnit);
    var delayInMilliseconds = 1000;//1 second 
    var tagMgr = project.getWidget("_TagMgr");    
    var protID = "prot4";
    var Cnstat = tagMgr.invokeProtocolCommand(protID, "get_stat", "");
    switch (Cnstat){
        case 'Connected':{   
            //alert("send command");       
            var avail = parseInt(tagMgr.invokeProtocolCommand(protID, "tokens_available", ""));
            var Send = tagMgr.invokeProtocolCommand(protID, "put", getdata);                        
        }
    }
}

var operator_receive = project.getTag("operator_receive",state,0);
var event_receive = project.getTag("event_receive",state,0);


function start_timer()
{
  var state = new State();
    project.setTag("inicioTimer", 1); 
    }

var operator_receive = project.getTag("operator_receive",state,0);
var event_receive = project.getTag("event_receive",state,0);

function getWorkOrder(me, eventInfo)
{   
    //alert("Hola mundo");
    project.setTag("PLC/PAC_Preload", 1); 
    dabUnit = project.getTag("DabUnit",state,0);
    //var work_receive = project.getTag("work_receive",state,0);
    //var work_len = work_receive.length;
    //-----------------inicializacion de comando--------------------
    project.setTag("command", "WorkOrder");  // escritura en tag     
    getdata = dabUnit+";WorkOrder;1;None";         
    //alert("work_rec state = " + "   " + typeof work_len + ", len work = " + work_len + "receive =" + work_receive); 
    //--------------------confirmacion de carga--------------------
    requests(getdata);
    project.setTag("pageLoad", "OrdenDeTrabajo");  // escritura en tag
    project.loadPage("LoadDataJob.jmx");
    project.setTag("actualizarOrdenProduccion",1);
    
}

///****************CODIGO DESCARGA DE LA DATA EN PLC Y PANTALLA*************************/////

var recv_add = "";
var state_pre = 0;
var avail = 0;
var str_rec = "";
var id = 0;
var lista_a = [];
var n=0;
var numeroPantalla=1;
var state = new State(); //funcion estado de variables
var search_job="";

var job_inf1 = "";
var job_inf2 = "";
var job_inf3 = "";
var job_inf4 = "";
var job_inf5 = "";
var job_inf6 = "";
var job_inf7 = "";
var job_inf8 = "";
var job_inf9 = "";
var job_inf10 = "";
var job_inf11 = "";
var job_inf12 = "";
var job_inf13 = "";
var job_inf14 = "";
var job_inf15 = "";
var job_inf16 = "";
var job_inf17 = "";
var job_inf18 = "";

var lista_a = [];
var lista_b = [];
var lista_c = [];
var lista_d = [];
var lista_e = [];
var lista_f = [];
var lista_g = [];
var lista_h = [];
var lista_i = [];
var lista_j = [];
var lista_k = [];
var lista_l = [];
var lista_m = [];
var lista_n = [];
var lista_o = [];
var lista_p = [];
var lista_q = [];
var lista_r = [];
var lista_s = [];
var lista_t = [];

function download_data()
{   
    lista_a = [];
    lista_b = [];
    lista_c = [];
    lista_d = [];
    lista_e = [];
    lista_f = [];
    lista_g = [];
    lista_h = [];
    lista_i = [];
    lista_j = [];
    lista_k = [];
    lista_l = [];
    lista_m = [];
    lista_n = [];
    lista_o = [];
    lista_p = [];
    lista_q = [];
    lista_r = [];
    lista_s = [];
    lista_t = [];
    
    
    state_pre = 0;
    //var state = new State(); //funcion estado de variables
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
        
    var str_a = str_rec.substring(0,parseInt(str_rec.length)-1);
    project.setTag("work_receive",str_a);  // escritura en tag  
    
    var splitString = str_a.split("(");// separacion de datos por caracter '\n' (salto de linea)    
    
    //alert("Trama:"+splitString+" xx"+str_a);
    
    for (var i = 0; i < splitString.length - 1; i++) { 
        lista_a[i]= splitString[i].split(")")[0].split(",");                          
        str_rec = "";
    }   
    
    //alert("Datos: "+lista_a);
    
    lista_a.shift();

    for (i = 0; i < lista_a.length; i++) {
        
        lista_b.push(lista_a[i][1].trim().toUpperCase()); // OP_JOBIdRecipePreload
        lista_c.push(lista_a[i][2].trim().toUpperCase()); // OP_JOBPreloadJOB
        lista_d.push(lista_a[i][3].trim()); // OP_JOBPreloadReference  
        lista_e.push(lista_a[i][4].trim()); // OP_JOBPreloadCavity
        lista_f.push(lista_a[i][5].trim()); // OP_JOBPreloadGoal
        lista_g.push(lista_a[i][6].trim()); // OP_JOBPreloadValueMaxVA01
        lista_h.push(lista_a[i][7].trim()); // OP_JOBPreloadValueMinVA01
        lista_i.push(lista_a[i][8].trim()); // OP_JOBPreloadUnitPacking
        lista_j.push(lista_a[i][9].trim()); // OP_JOBPreloadQuantityRequestedTotal
        lista_k.push(lista_a[i][10].trim()); // OP_JOBPreloadTolerancePercentage
        lista_l.push(lista_a[i][11].trim()); // OP_JOBPreloadValueMinVA02
        lista_m.push(lista_a[i][12].trim()); // OP_JOBPreloadValueMaxVA02
        lista_n.push(lista_a[i][13].trim()); // OP_JOBPreloadValueMinVA03
        lista_o.push(lista_a[i][14].trim()); // OP_JOBPreloadValueMaxVA03
        lista_p.push(lista_a[i][15].trim()); // OP_JOBPreloadValueMinVA04
        lista_q.push(lista_a[i][16].trim()); // OP_JOBPreloadValueMaxVA04
        lista_r.push(lista_a[i][17].trim()); // OP_JOBPreloadCutQuantity
        lista_s.push(lista_a[i][22].trim()); // OP_JOBEquivalence
        lista_t.push(lista_a[i][23].trim()); // Descripcion
        str_rec = "";
    
        //alert("Lista b:"+ lista_b+" "+lista_a.length);
       // alert("Lista c:"+ lista_c);
        //alert("Lista d:"+ lista_d);
       // alert("Lista t:"+ lista_t);
    }
    
    //alert("Lista e:"+ lista_e);
   
}
function cargueDatosHMI()
{

    for (i = 0; i< 30; i++){
        
        //alert ("Cntador"+i)
        project.setTag("idOrdenProduccion", lista_b[i], i);  //id      
        project.setTag("codigoOrdenProduccion("+ i +")", lista_c[i]);  //codigo de orden        
        project.setTag("referenciaOrdenProduccion("+ i  +")", lista_d[i]);  //referencia
        project.setTag("cavityJOB", lista_e[i],i);
        project.setTag("jobGoal", lista_f[i],i);
        project.setTag("jobValueMaxVA01", lista_g[i],i);
        project.setTag("jobValueMinVA01", lista_h[i],i);
        project.setTag("jobUnitPacking", lista_i[i],i);
        project.setTag("jobQty", lista_j[i],i);
        project.setTag("jobTolerancePercentage", lista_k[i],i);
        project.setTag("jobValueMinVA02", lista_l[i],i);
        project.setTag("jobValueMaxVA02", lista_m[i],i);
        project.setTag("jobValueMinVA03", lista_n[i],i);
        project.setTag("jobValueMaxVA03", lista_o[i],i);
        project.setTag("jobValueMinVA04", lista_p[i],i);
        project.setTag("jobValueMaxVA04", lista_q[i],i);
        project.setTag("jobCutQuantity", lista_r[i],i);
        project.setTag("jobEquivalence", lista_s[i],i);
        project.setTag("descripcionOrdenProduccion("+ i  +")", (lista_t[i]));
        
    //alert ("Datos de cargue en pantalla HMI:"+" "+project.getTag("jobQty",state,i));
    //alert ("Datos de cargue en pantalla HMI descrip:"+" "+project.getTag("descripcionOrdenProduccion("+i +")",state,0));
    }
    
    
    /*
    alert ("Datos de cargue en pantalla HMI qty:"+" "+project.getTag("jobQty",state,-1));
     alert ("Datos de cargue en pantalla HMI id:"+" "+project.getTag("idOrdenProduccion",state,0));
     alert ("Datos de cargue en pantalla HMI code:"+" "+project.getTag("codigoOrdenProduccion("+10+")")); 
     alert ("Datos de cargue en pantalla HMI: ref"+" "+project.getTag("referenciaOrdenProduccion",state,-1)); 
     alert ("Datos de cargue en pantalla HMI cavity:"+" "+project.getTag("cavityJOB",state,-1)); 
     alert ("Datos de cargue en pantalla HMI goal:"+" "+project.getTag("jobGoal",state,-1)); 
     alert ("Datos de cargue en pantalla HMI mxva01:"+" "+project.getTag("jobValueMaxVA01",state,-1)); 
     alert ("Datos de cargue en pantalla HMImnva01:"+" "+project.getTag("jobValueMinVA01",state,-1)); 
     alert ("Datos de cargue en pantalla HMI packing:"+" "+project.getTag("jobUnitPacking",state,-1)); 
     alert ("Datos de cargue en pantalla HMI tolera:"+" "+project.getTag("jobTolerancePercentage",state,-1)); 
     alert ("Datos de cargue en pantalla HMI minva02:"+" "+project.getTag("jobValueMinVA02",state,-1));
     alert ("Datos de cargue en pantalla HMI mxva2:"+" "+project.getTag("jobValueMaxVA02",state,-1));
     alert ("Datos de cargue en pantalla HMI minva3:"+" "+project.getTag("jobValueMinVA03",state,-1));
     alert ("Datos de cargue en pantalla HMI mvva3:"+" "+project.getTag("jobValueMaxVA03",state,-1));
     alert ("Datos de cargue en pantalla HMI minva04:"+" "+project.getTag("jobValueMinVA04",state,-1));
     alert ("Datos de cargue en pantalla HMI maxva04:"+" "+project.getTag("jobValueMaxVA04",state,-1));
     alert ("Datos de cargue en pantalla HMI cutqty:"+" "+project.getTag("jobCutQuantity",state,-1)); //OP_JOBPreloadCutQuantity
    alert ("Datos de cargue en pantalla HMI equivale:"+" "+project.getTag("jobEquivalence",state,-1));
     alert ("Datos de cargue en pantalla HMI descrip:"+" "+project.getTag("descripcionOrdenProduccion("+1 +")",state,0));
*/
    
}
function vista_de_datos_pantallas()
{
     
        for (i = 0; i <=5; i++) {
            
            var s=i+n;
            
            project.setTag("jobId("+ i + ")",  String(project.getTag("idOrdenProduccion",state,s)));  //id
            project.setTag("jobCode("+ i  +")", project.getTag("codigoOrdenProduccion("+s+")"));  //codigo de orden        
            project.setTag("jobRef("+ i  +")",  String(project.getTag("referenciaOrdenProduccion("+s+")")));  //referencia
            project.setTag("jobCavity("+ i+")", lista_e[i+n]);    
            project.setTag("jobGoal("+ i +")", lista_f[i+n]);
            project.setTag("jobValueMaxVA01("+ i +")", lista_g[i+n]);
            project.setTag("jobValueMinVA01("+ i +")", lista_h[i+n]);
            project.setTag("jobUnitPacking("+ i +")", lista_i[i+n]);
            project.setTag("jobQty("+ i +")", String(project.getTag("jobQty",state,s)));
            project.setTag("jobTolerancePercentage("+ i +")", lista_k[i+n]);
            project.setTag("jobValueMinVA02("+ i +")", lista_l[i+n]);
            project.setTag("jobValueMaxVA02("+ i +")", lista_m[i+n]);
            project.setTag("jobValueMinVA03("+ i +")", lista_n[i+n]);
            project.setTag("jobValueMaxVA03("+ i +")", lista_o[i+n]);
            project.setTag("jobValueMinVA04("+ i +")", lista_p[i+n]);
            project.setTag("jobValueMaxVA04("+ i +")", lista_q[i+n]);
            project.setTag("jobCutQuantity("+ i +")", lista_r[i+n]);
            project.setTag("jobEquivalence("+ i +")", lista_s[i+n]);
            project.setTag("DescripcionHMI("+ i  +")", project.getTag("descripcionOrdenProduccion("+s+")"));
            
            
           // alert("Cantidad:"+project.getTag("jobQty",state,s));
           /* alert("jobId("+ i + ")" +"  "+ String(project.getTag("idOrdenProduccion",state,s)));
            alert("jobCode("+ i + ")" +"  "+  project.getTag("codigoOrdenProduccion("+s +")"));
           */ 
            //alert("jobRef("+ i + ")" +"  "+ project.getTag("referenciaOrdenProduccion("+s+")"));
            //alert("jobEquivalence("+ i + ")" +"  "+ lista_s[i+n]);
           
        }   
 }
if (project.getTag("actualizarOrdenProduccion",state,0)===1)
{
    
project.setTag("actualizarOrdenProduccion",0);
download_data();
cargueDatosHMI();
vista_de_datos_pantallas();
project.setTag("NumP",1);
project.setTag("PLC/PAC_Preload", 0);     
}
//project.setTag("NumP",1);
function cambio_pagina_adelante()
{   
    
    numeroPantalla=numeroPantalla+1;
    if (numeroPantalla==6){
        numeroPantalla=5;
    }

    n=n+6;
    if (n==30){
        n=24;
    }
    vista_de_datos_pantallas();
    project.setTag("numeroPantalla",n);
    project.setTag("NumP",numeroPantalla);
    //alert(n);
    
}

function resetNumeroPantalla()
{   
    n=0;
    numeroPantalla=1;
    vista_de_datos_pantallas();
    project.setTag("numeroPantalla",n);
    project.setTag("NumP",numeroPantalla);
    
}

function cambio_pagina_atras()
{   
    numeroPantalla=numeroPantalla-1;
    if (numeroPantalla<1){
        numeroPantalla=1;
    }
    n=n-6;
    if(n<0){
        n=0;
    }
    vista_de_datos_pantallas();
    project.setTag("numeroPantalla",n);
    project.setTag("NumP",numeroPantalla);
    //alert(n);
}

//alert ("Datos de cargue en pantalla HMI:"+" "+project.getTag("cavityJOB",state,-1)); 
function alert_de_datos()
{

 /*alert ("Datos de cargue en pantalla HMI:"+" "+project.getTag("idOrdenProduccion",state,0));
 alert ("Datos de cargue en pantalla HMI:"+" "+project.getTag("codigoOrdenProduccion("+10+")")); 
 alert ("Datos de cargue en pantalla HMI:"+" "+project.getTag("referenciaOrdenProduccion("+ 1 +")",state,0)); 
 alert ("Datos de cargue en pantalla HMI:"+" "+project.getTag("cavityJOB",state,-1)); 
 alert ("Datos de cargue en pantalla HMI:"+" "+project.getTag("jobGoal",state,-1)); 
 alert ("Datos de cargue en pantalla HMI:"+" "+project.getTag("jobValueMaxVA01",state,-1)); 
 alert ("Datos de cargue en pantalla HMI:"+" "+project.getTag("jobValueMinVA01",state,-1)); 
 alert ("Datos de cargue en pantalla HMI:"+" "+project.getTag("jobUnitPacking",state,-1)); 
 alert ("Datos de cargue en pantalla HMI:"+" "+project.getTag("jobTolerancePercentage",state,-1)); 
 alert ("Datos de cargue en pantalla HMI:"+" "+project.getTag("jobValueMinVA02",state,-1));
 alert ("Datos de cargue en pantalla HMI:"+" "+project.getTag("jobValueMaxVA02",state,-1));
 alert ("Datos de cargue en pantalla HMI:"+" "+project.getTag("jobValueMinVA03",state,-1));
 alert ("Datos de cargue en pantalla HMI:"+" "+project.getTag("jobValueMaxVA03",state,-1));
 alert ("Datos de cargue en pantalla HMI:"+" "+project.getTag("jobValueMinVA04",state,-1));
 alert ("Datos de cargue en pantalla HMI:"+" "+project.getTag("jobValueMaxVA04",state,-1));
 alert ("Datos de cargue en pantalla HMI:"+" "+project.getTag("jobCutQuantity",state,-1)); //OP_JOBPreloadCutQuantity
 alert ("Datos de cargue en pantalla HMI:"+" "+project.getTag("jobEquivalence",state,-1));
 alert ("Datos de cargue en pantalla HMI:"+" "+project.getTag("descripcionOrdenProduccion("+1 +")",state,0));
*/
}
//alert ("Datos de cargue en pantalla HMI:"+" "+project.getTag("cavityJOB",state,-1));
function alertaxxxx()
{
//alert("mensaje aleatorio:"+project.getTag("codigoOrdenProduccion("+10+")",state,0));
  
}

function selectId(index)
{
    
    var valorCodigoOrden=project.getTag("codigoOrdenProduccion("+index+")",state,0);
    
    project.setTag("buscar_codigo_orden", valorCodigoOrden);  // escritura en tag                                                                                  
    send_order();
    //alert("RRRRR"+valorCodigoOrden+"search job "+ project.getTag("buscar_codigo_orden",state,0));
}

function sendJob()
{
    
    //search_job = project.getTag("search_job",state,0).toUpperCase();//lectura de variable (tag, funcion, index), si es una tag dejar '0', si es array colocar el index o '-1' para traer todo  
    
    
    var lista_b_HMI= project.getTag("idOrdenProduccion",state,-1);
      
      var lista_c_HMI=[];
      
      for (i = 0; i < 30; i++){
      lista_c_HMI[i] = project.getTag("codigoOrdenProduccion("+i+")",state,0);
      }
      
      
      var lista_d_HMI=[];
      
      for (i = 0; i < 30; i++){
      lista_d_HMI[i] = project.getTag("referenciaOrdenProduccion("+i+")",state,0);
      }
      
      
      var lista_e_HMI= project.getTag("idOrdenProduccion",state,-1);
    
    
    var index_data_b = lista_b_HMI.indexOf(search_job,0);
    var index_data_c = lista_c_HMI.indexOf(search_job,0);
    var index_data_d = lista_d_HMI.indexOf(search_job,0);
    var index_data_e = lista_e_HMI.indexOf(search_job,0);
      
    //alert(index_data_b + "indext data B"+"  "+ "index_data_c" + index_data_c+"  " + search_job);
    
    var dabUnit = project.getTag("DabUnit",state,0);//lectura de variable (tag, funcion, index), si es una tag dejar '0', si es array colocar el index o '-1' para traer todo      
   // alert("search_job send " + search_job + " | " + index_data_b + " | " + index_data_c + " | " + index_data_d); 
    
    
    if(index_data_b === -1 && index_data_c === -1){
            
            
            alert("codigo incorrecto, por favor intente nuevamente. => " + search_job);
            
        }else{
            if(index_data_b > -1){
                var sel_job_index = index_data_b;
            }
            if(index_data_c > -1){
                sel_job_index = index_data_c;
            }
            
            
           
            
            project.setTag("job_inf1",project.getTag("idOrdenProduccion",state,sel_job_index));
            project.setTag("job_inf2",project.getTag("codigoOrdenProduccion("+sel_job_index+")"));
            project.setTag("job_inf3",project.getTag("referenciaOrdenProduccion("+ sel_job_index +")",state,0));
            project.setTag("job_inf4",project.getTag("cavityJOB",state,sel_job_index));
            project.setTag("job_inf5",project.getTag("jobGoal",state,sel_job_index));
            project.setTag("job_inf6",project.getTag("jobValueMaxVA01",state,sel_job_index));
            project.setTag("job_inf7",project.getTag("jobValueMinVA01",state,sel_job_index));
            project.setTag("job_inf8",project.getTag("jobUnitPacking",state,sel_job_index));
            project.setTag("job_inf9",project.getTag("jobTolerancePercentage",state,sel_job_index));
            project.setTag("job_inf10",project.getTag("jobValueMinVA02",state,sel_job_index));
            project.setTag("job_inf11",project.getTag("jobValueMaxVA02",state,sel_job_index));
            project.setTag("job_inf12",project.getTag("jobValueMinVA03",state,sel_job_index));
            project.setTag("job_inf13",project.getTag("jobValueMaxVA03",state,sel_job_index));
            project.setTag("job_inf14",project.getTag("jobValueMinVA04",state,sel_job_index));
            project.setTag("job_inf15",project.getTag("jobValueMaxVA04",state,sel_job_index));
            project.setTag("job_inf16",project.getTag("jobCutQuantity",state,sel_job_index));
            project.setTag("job_inf17",project.getTag("jobEquivalence",state,sel_job_index));
            project.setTag("job_inf18",project.getTag("descripcionOrdenProduccion("+sel_job_index+")",state,0));
            project.setTag("job_inf19",project.getTag("jobQty",state,sel_job_index));
            
            
            //alert("job147"+project.getTag("jobEquivalence",state,sel_job_index));
    
    }
}

function send_order()
{

    search_job = project.getTag("buscar_codigo_orden",state,0).toUpperCase();
    if (search_job!=0){
        //alert("Exitencia de datos");
        sendJob();
        project.showDialog("ConfirmacionOrdenDeTrabajo.jmx");
        
    }else {
    // alert ("codigo incorrecto, por favor intente nuevamente. => " + search_job);   
    }
}

function getIndex()
{
    var index = project.getTag("index_read",state,0);
   // alert("get = "+ lista_a[index] + ",/ " + lista_b[index] + "; "+ typeof lista_b[index] + ",/ " + lista_c[index] + "; "+ typeof lista_c[index] + ",/ " + lista_d[index] + "; "+ typeof lista_d[index]);    
   // alert(index);

}

function selectId_1(me, eventInfo)
{
    id = 0+n; 
    project.setTag("idBoton",id);
    selectId(id);
    
    //alert(id+project.getTag("numeroPantalla",state,0));
    
    
}

function selectId_2(me, eventInfo)
{   
    
    id = 1+n; 
    project.setTag("idBoton",id); 
    selectId(id);
    
    //alert(id);    
}
function selectId_3(me, eventInfo)
{
    
    id = 2+n; 
    project.setTag("idBoton",id);
    selectId(id) 
    //alert(id);    
}
function selectId_4(me, eventInfo)
{
    id = 3+n; 
    project.setTag("idBoton",id);
    selectId(id) 
    //alert(id);
}
function selectId_5(me, eventInfo)
{
    id = 4+n; 
    project.setTag("idBoton",id);
    selectId(id) 
    //alert(id);

}
function selectId_6(me, eventInfo)
{
    id = 5+n; 
    project.setTag("idBoton",id);
    selectId(id)
   // alert(id);
}
function selectId_7(me, eventInfo)
{
    id = 6+n;
    selectId(id)
    //alert(id);
} 
function selectId_8(me, eventInfo)
{
    id = 7+n; 
    selectId(id) 
   // alert(id);
}
function selectId_9(me, eventInfo)
{
    id = 8+n; 
    selectId(id)
    //alert(id);
}
function selectId_10(me, eventInfo)
{
    id = 9+n; 
    selectId(id)
    //alert(id);
}
function selectId_11(me, eventInfo)
{
    id = 10+n; 
    selectId(id) 
}
function selectId_12(me, eventInfo)
{
    id = 11+n; 
    selectId(id) 
}
function selectId_12(me, eventInfo)
{
    id = 12+n; 
    selectId(id) 
}
function selectId_12(me, eventInfo)
{
    id = 13+n; 
    selectId(id) 
}
function selectId_12(me, eventInfo)
{
    id = 14+n; 
    selectId(id) 
}

function field1_onDataUpdate(me, eventInfo)
{
    
 var lol=eventInfo.newValue 
    if(lol==1){
        project.showDialog("OrdenTrabajoFinalizada.jmx");
    }
}

function alerts2()
{
    var OrdenDeTrabajoBloqueada= project.getTag("PLC/GT_MenssageJOBSelected",state,0);
    var MaquinaEnOperacion = project.getTag("PLC/GT_EnableLockButtonChangeJOB",state,0);
    //alert(eventocausal);
    if (OrdenDeTrabajoBloqueada==1){
        project.showDialog("OrdenDeTrabajoBloqueada.jmx");//traer el dialogo
    }
    else {
        project.closeDialog("OrdenDeTrabajoBloqueada.jmx");//cerrar el dialogo
    }
    
    if (MaquinaEnOperacion==1){
        project.showDialog("MaquinaEnOperacion.jmx");//traer el dialogo
    }
    else {
        project.closeDialog("MaquinaEnOperacion.jmx");//cerrar el dialogo
    }
    
    page.setTimeout("alerts2()",1000);
}



function OrdenDeTrabajo_onActivate(me, eventInfo)
{
    alerts2();
}
