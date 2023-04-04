project.setTag("PLC/GT_Home","1");





function resetPantalla(){
    
    var xx = new Restart();
    
    if(project.getTag("PLC/GT_ResetHMI",state,0)==1){
       
       //project.setTag("PLC/GT_ResetHMI",0);
        
       //setProperty("action", restart);
        //project.setTag("RestartHMI",4);
        //alert("reset pantalla"+ );
        
        
       
        //alert("reset pantalla"+project.getTag("RestartHMI",state,0));
    }
}