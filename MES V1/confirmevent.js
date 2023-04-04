
var state = new State();

project.setTag("PLC/GT_Home","1");

function eventUpdate(me, eventInfo)
{
     var codeEventPLC_x = project.getTag("PLC/GT_EventConfirm",state,0);

     var listCodeHMI_x=[];

    for (i = 0; i < 150; i++){
    listCodeHMI_x[i] = project.getTag("eventCode("+i+")",state,0);
    }
    var indexCodeEvent_x =  listCodeHMI_x.indexOf(codeEventPLC_x,0);
    project.setTag("vistaConfirmacionEvento",project.getTag("nameEvent("+indexCodeEvent_x+")"));
    
    //alert("index:"+ indexCodeEvent + "variable PLC: "+ codeEventPLC+ "evenmt:name:"+project.getTag("nameEvent("+indexCodeEvent+")"));  
    //return false;
}
