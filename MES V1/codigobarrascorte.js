project.setTag("PLC/GT_Home","1");

function alerts3()
{
    var CodigoDeBarrasNoValido= project.getTag("PLC/GT_MessageBarcodeFinishedProduct",state,0);
    if (CodigoDeBarrasNoValido==1){
        project.showDialog("CodigoDeBarrasNoValido.jmx");//traer el dialogo
    }
    else {
        project.closeDialog("CodigoDeBarrasNoValido.jmx");//cerrar el dialogo
    }
    
    page.setTimeout("alerts3()",1000);
}


function CodigoBarrasCorte_onActivate(me, eventInfo)
{
    alerts3();
}