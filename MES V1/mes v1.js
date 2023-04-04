function _JSFunctBlock_onDataUpdate(me, eventInfo)
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
    
    return false; 
}