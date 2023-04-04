var state = new State();

function returnHome(me, eventInfo)
{
    var state = new State();
    var home = project.getTag("PLC/GT_ReturnHome",state,0);
    //alert("data recibida :" + home);   
    if (home === true) 
    {
        project.homePage();
        //  block of code to be executed if the condition is true
    }    
    //return false; 
}
project.setTag("PLC/GT_Home","1");

function sendJob(){
             
                var dabUnit = project.getTag("DabUnit",state,0);
                var tagMgr = project.getWidget("_TagMgr");
                var protID = "prot4"; // to be set according to protocol numbering
                var sSendcom = dabUnit+";WorkOrder;3;" + project.getTag("job_inf1",state,0) + "," + project.getTag("job_inf2",state,0) + "," + project.getTag("job_inf3",state,0);
                var Send = tagMgr.invokeProtocolCommand(protID, "put", sSendcom);
               // alert("job send " + sSendcom);                         
                //alert("orden cargada con exito")
               
                project.setTag("PLC/OP_JOBIdRecipeHMI", project.getTag("job_inf1",state,0));  // escritura en tag 
                project.setTag("PLC/OP_JOBHMI", project.getTag("job_inf2",state,0));
                project.setTag("PLC/OP_JOBReferenceHMI", project.getTag("job_inf3",state,0));
                project.setTag("PLC/OP_JOBCavityHMI", project.getTag("job_inf4",state,0));
                project.setTag("PLC/OP_JOBGoalHMI", project.getTag("job_inf5",state,0));
                project.setTag("PLC/OP_JOBValueMaxVA01HMI", project.getTag("job_inf6",state,0));
                project.setTag("PLC/OP_JOBValueMinVA01HMI", project.getTag("job_inf7",state,0));
                project.setTag("PLC/OP_JOBUnitPackingHMI", project.getTag("job_inf8",state,0));
                project.setTag("PLC/OP_JOBTolerancePercentageHMI", project.getTag("job_inf9",state,0));
                project.setTag("PLC/OP_JOBValueMinVA02HMI", project.getTag("job_inf10",state,0));
                project.setTag("PLC/OP_JOBValueMaxVA02HMI", project.getTag("job_inf11",state,0));
                project.setTag("PLC/OP_JOBValueMinVA03HMI", project.getTag("job_inf12",state,0));
                project.setTag("PLC/OP_JOBValueMaxVA03HMI", project.getTag("job_inf13",state,0));
                project.setTag("PLC/OP_JOBValueMinVA04HMI",project.getTag("job_inf14",state,0));
                project.setTag("PLC/OP_JOBValueMaxVA04HMI",project.getTag("job_inf15",state,0));
                project.setTag("PLC/OP_JOBCutQuantityHMI",project.getTag("job_inf16",state,0));
                project.setTag("PLC/OP_JOBEquivalenceHMI",project.getTag("job_inf17",state,0));
                project.setTag("PLC/OP_JOBQuantityRequestedTotalHMI", project.getTag("job_inf19",state,0));
    
                project.setTag("PLC/OP_JOBselected",1);
    
                //alert("datos de pantalla:"+"   "+project.getTag("job_inf17",state,0));    
}