project.setTag("PLC/GT_Home","1");


var recv_add = "";
var state_pre = 0;
var avail = 0;
var str_rec = "";
var id = 0;
var lista_a = [];
var lista_b = [];
var lista_c = [];
var lista_d = [];
var lista_e = [];
var lista_f = [];
var lista_g = [];
var lista_h = [];
var lista_i = [];
var operario=[];

    var state = new State(); //funcion estado de variables
  
function download_data()
    {   
        //alert("start download")
        lista_a = [];
        lista_b = [];
        lista_c = [];
        lista_d = [];
        lista_e = [];
        lista_f = [];
        lista_g = [];
        lista_h = [];
        lista_i = [];
            
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
        //alert("download finish")
        var str_a = str_rec.substring(0,parseInt(str_rec.length));
       
        
        
        var splitString = str_a.split("(");// separacion de datos por caracter '\n' (salto de linea)    
    
        for (var i = 0; i < splitString.length ; i++) { 
            lista_a[i]= splitString[i].split(")")[0].split(",");                          
            str_rec = "";
        }   
           
        
        lista_a.shift();
        
        for (i = 0; i < lista_a.length; i++) {
            lista_b.push(lista_a[i][0]);
            lista_c.push(lista_a[i][1]);
            lista_d.push(lista_a[i][2]);
            lista_e.push(lista_a[i][3]);
            lista_f.push(lista_a[i][4]);
            lista_g.push(lista_a[i][5]);
            lista_h.push(lista_a[i][6]);
            lista_i.push(lista_a[i][7]);
                
            str_rec = "";
        }  
       
    }
    
function buscar_op(){
        
        var search_op = String(project.getTag("PLC/GT_CodeOpeatorFIFO",state,0));//lectura de variable (tag, funcion, index), si es una tag dejar '0', si es array colocar el index o '-1' para traer todo  
       //alert("search_op234 = " + search_op + "  "+ lista_b+ "  "+ lista_b[1]+ "  "+ lista_b[2] );
       // alert("search_op234 = "+ lista_b);
       // alert ("Nombre OP****="+ project.getTag("nameOP(0)",state,0));
        var index_data = lista_b.indexOf(search_op,0);
       //alert("search_oo********** " + index_data);
       
        
        if(index_data === -1){
                        
        }else{
           
        }
}
    
function verNombreHome(){
   
    for(var i=0;i <400; i++){
      project.setTag("passwordOP", lista_b[i],i);   
      
    }
  
}
    
function vista_datos_operario_pantalla()
{    
    
    var conatdor=[];
           
        for(var i = 0; i <400; i++) {
                                        
           project.setTag("nameOP("+ i +")", lista_d[i]);
           project.setTag("ArrayAttributeOperatorHMI",parseInt(lista_c[i]),i);
        }  
        
}
    
if (project.getTag("Actualizar_OperarioGeneral",state,0)===1){
    
    project.setTag("Actualizar_OperarioGeneral",0);
    download_data();
    verNombreHome();
    vista_datos_operario_pantalla();
    project.loadPage("preloadData.jmx");
}
    