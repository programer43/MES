//if(project.getTag("PLC/GT_TIEMPO_ESPERA_MOTIVO_INGRESADO",state,0)==0){
project.setTag("PLC/GT_Home","1");




var sSendcom = "";
var dabUnit = "";
var sDatacom="";

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

function requests(sDatacom){
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
            var Send = tagMgr.invokeProtocolCommand(protID, "put", sDatacom);                        
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



function getOperator(me, eventInfo)
{  
    //var state = new State();
    project.setTag("PLC/PAC_Preload", 1); 
    //alert("Blunchissss:"+  project.getTag("PLC/PAC_Preload",state,0));
    
    dabUnit = project.getTag("DabUnit",state,0);
    //var work_receive = project.getTag("Personnel",state,0);
    //var work_len = work_receive.length;
    //-----------------inicializacion de comando--------------------
    project.setTag("command", "Personnel");  // escritura en tag     
    sDatacom = dabUnit+";Personnel;1;None";         
   
    //--------------------confirmacion de carga--------------------
    requests(sDatacom);
    project.setTag("pageLoad", "PerssonelRegistration");  // escritura en tag
    project.loadPage("LoadDataJob.jmx");
    project.setTag("actualizar_Operarios",1);
         
}

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


    var state = new State(); //funcion estado de variables
    
    //function BtnStd4_btn_onMouseClick(me, eventInfo)
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
           
            //str_rec="[(99999, 299999, 'SIN OPERARIO', 1), (1424, 278883, 'E. GALEANO RODRIGUEZ', 2), (2070, 278883, 'E. GALEANO RODRIGUEZ', 3), (2393, 278883, 'E. GALEANO RODRIGUEZ', 4), (2714, 278883, 'E. GALEANO RODRIGUEZ', 5), (3035, 278883, 'E. GALEANO RODRIGUEZ', 6), (1450, 201936, 'C. MIRANDA DIAZ', 7), (2096, 201936, 'C. MIRANDA DIAZ', 8), (2419, 201936, 'C. MIRANDA DIAZ', 9), (2740, 201936, 'C. MIRANDA DIAZ', 10), (3061, 201936, 'C. MIRANDA DIAZ', 11), (1666, 241054, 'J. CARRILLO AVELLANE', 12), (2312, 241054, 'J. CARRILLO AVELLANE', 13), (2633, 241054, 'J. CARRILLO AVELLANE', 14), (2954, 241054, 'J. CARRILLO AVELLANE', 15), (3275, 241054, 'J. CARRILLO AVELLANE', 16), (1672, 241332, 'R. BECERRA CONTRERAS', 17), (2318, 241332, 'R. BECERRA CONTRERAS', 18), (2639, 241332, 'R. BECERRA CONTRERAS', 19), (2960, 241332, 'R. BECERRA CONTRERAS', 20), (3281, 241332, 'R. BECERRA CONTRERAS', 21), (1682, 241421, 'O. ARROYO', 22), (2328, 241421, 'O. ARROYO', 23), (2649, 241421, 'O. ARROYO', 24), (2970, 241421, 'O. ARROYO', 25), (3291, 241421, 'O. ARROYO', 26), (1383, 289925, 'Y. RUBIO PEÑA', 27), (2029, 289925, 'Y. RUBIO PEÑA', 28), (2352, 289925, 'Y. RUBIO PEÑA', 29), (2673, 289925, 'Y. RUBIO PEÑA', 30), (2994, 289925, 'Y. RUBIO PEÑA', 31), (1530, 289960, 'J. BOTELLO', 32), (2176, 289960, 'J. BOTELLO', 33), (2499, 289960, 'J. BOTELLO', 34), (2820, 289960, 'J. BOTELLO', 35), (3141, 289960, 'J. BOTELLO', 36), (1382, 289968, 'M. RUBIO MARQUEZ', 37), (2028, 289968, 'M. RUBIO MARQUEZ', 38), (2351, 289968, 'M. RUBIO MARQUEZ', 39), (2672, 289968, 'M. RUBIO MARQUEZ', 40), (2993, 289968, 'M. RUBIO MARQUEZ', 41), (1640, 200629, 'E. ORTEGA BECERRA', 42), (2286, 200629, 'E. ORTEGA BECERRA', 43), (2607, 200629, 'E. ORTEGA BECERRA', 44), (2928, 200629, 'E. ORTEGA BECERRA', 45), (3249, 200629, 'E. ORTEGA BECERRA', 46), (1388, 234599, 'J. RIVERA PEREZ', 47), (2034, 234599, 'J. RIVERA PEREZ', 48), (2357, 234599, 'J. RIVERA PEREZ', 49), (2678, 234599, 'J. RIVERA PEREZ', 50), (2999, 234599, 'J. RIVERA PEREZ', 51), (1670, 234506, 'M. CAÑIZALEZ BONILLA', 52), (2316, 234506, 'M. CAÑIZALEZ BONILLA', 53), (2637, 234506, 'M. CAÑIZALEZ BONILLA', 54), (2958, 234506, 'M. CAÑIZALEZ BONILLA', 55), (3279, 234506, 'M. CAÑIZALEZ BONILLA', 56), (93878, 293878, 'C. ROSERITO', 57), (1428, 264244, 'J. GUTIERREZ ESPINOS', 58), (2074, 264244, 'J. GUTIERREZ ESPINOS', 59), (2397, 264244, 'J. GUTIERREZ ESPINOS', 60), (2718, 264244, 'J. GUTIERREZ ESPINOS', 61), (3039, 264244, 'J. GUTIERREZ ESPINOS', 62), (1562, 234513, 'E. HERNANDEZ SALCEDO', 63), (2208, 234513, 'E. HERNANDEZ SALCEDO', 64), (2529, 234513, 'E. HERNANDEZ SALCEDO', 65), (2850, 234513, 'E. HERNANDEZ SALCEDO', 66), (3171, 234513, 'E. HERNANDEZ SALCEDO', 67), (1455, 275713, 'O. JOYA VERGEL', 68), (2101, 275713, 'O. JOYA VERGEL', 69), (2424, 275713, 'O. JOYA VERGEL', 70), (2745, 275713, 'O. JOYA VERGEL', 71), (3066, 275713, 'O. JOYA VERGEL', 72), (1394, 271207, 'W. VERA PARADA', 73), (2040, 271207, 'W. VERA PARADA', 74), (2363, 271207, 'W. VERA PARADA', 75), (2684, 271207, 'W. VERA PARADA', 76), (3005, 271207, 'W. VERA PARADA', 77), (1551, 275174, 'H. FARFAN ANGEL', 78), (2197, 275174, 'H. FARFAN ANGEL', 79), (2520, 275174, 'H. FARFAN ANGEL', 80), (2841, 275174, 'H. FARFAN ANGEL', 81), (3162, 275174, 'H. FARFAN ANGEL', 82), (1395, 277897, 'E. FAJARDO GALVIS', 83), (2041, 277897, 'E. FAJARDO GALVIS', 84), (2364, 277897, 'E. FAJARDO GALVIS', 85), (2685, 277897, 'E. FAJARDO GALVIS', 86), (3006, 277897, 'E. FAJARDO GALVIS', 87), (1431, 278696, 'D. MANCHEGO GONZALEZ', 88), (2077, 278696, 'D. MANCHEGO GONZALEZ', 89), (2400, 278696, 'D. MANCHEGO GONZALEZ', 90), (2721, 278696, 'D. MANCHEGO GONZALEZ', 91), (3042, 278696, 'D. MANCHEGO GONZALEZ', 92), (1656, 264307, 'J. MARTINEZ GUERRERO', 93), (2302, 264307, 'J. MARTINEZ GUERRERO', 94), (2623, 264307, 'J. MARTINEZ GUERRERO', 95), (2944, 264307, 'J. MARTINEZ GUERRERO', 96), (3265, 264307, 'J. MARTINEZ GUERRERO', 97), (1663, 286192, 'V. CASTELLANOS BOLIV', 98), (2309, 286192, 'V. CASTELLANOS BOLIV', 99), (2630, 286192, 'V. CASTELLANOS BOLIV', 100), (2951, 286192, 'V. CASTELLANOS BOLIV', 101), (3272, 286192, 'V. CASTELLANOS BOLIV', 102), (1685, 288521, 'L. URIBE MANSILLA', 103), (2331, 288521, 'L. URIBE MANSILLA', 104), (2652, 288521, 'L. URIBE MANSILLA', 105), (2973, 288521, 'L. URIBE MANSILLA', 106), (3294, 288521, 'L. URIBE MANSILLA', 107), (1378, 255232, 'W. CABRERA GARZON', 108), (2024, 255232, 'W. CABRERA GARZON', 109), (2347, 255232, 'W. CABRERA GARZON', 110), (2668, 255232, 'W. CABRERA GARZON', 111), (2989, 255232, 'W. CABRERA GARZON', 112), (1680, 256141, 'N. PEÑARANDA', 113), (2326, 256141, 'N. PEÑARANDA', 114), (2647, 256141, 'N. PEÑARANDA', 115), (2968, 256141, 'N. PEÑARANDA', 116), (3289, 256141, 'N. PEÑARANDA', 117), (1669, 259542, 'L. PEREZ MONTAÑEZ', 118), (2315, 259542, 'L. PEREZ MONTAÑEZ', 119), (2636, 259542, 'L. PEREZ MONTAÑEZ', 120), (2957, 259542, 'L. PEREZ MONTAÑEZ', 121), (3278, 259542, 'L. PEREZ MONTAÑEZ', 122), (1675, 259647, 'R. MERCHAN FLOREZ', 123), (2321, 259647, 'R. MERCHAN FLOREZ', 124), (2642, 259647, 'R. MERCHAN FLOREZ', 125), (2963, 259647, 'R. MERCHAN FLOREZ', 126), (3284, 259647, 'R. MERCHAN FLOREZ', 127), (1649, 260478, 'J. SUAREZ NIÑO', 128), (2295, 260478, 'J. SUAREZ NIÑO', 129), (2616, 260478, 'J. SUAREZ NIÑO', 130), (2937, 260478, 'J. SUAREZ NIÑO', 131), (3258, 260478, 'J. SUAREZ NIÑO', 132), (1676, 260914, 'M. PARRA FUENTES', 133), (2322, 260914, 'M. PARRA FUENTES', 134), (2643, 260914, 'M. PARRA FUENTES', 135), (2964, 260914, 'M. PARRA FUENTES', 136), (3285, 260914, 'M. PARRA FUENTES', 137), (1651, 270180, 'J. CELIS ANDRADE', 138), (2297, 270180, 'J. CELIS ANDRADE', 139), (2618, 270180, 'J. CELIS ANDRADE', 140), (2939, 270180, 'J. CELIS ANDRADE', 141), (3260, 270180, 'J. CELIS ANDRADE', 142), (1368, 270634, 'J. BAEZ ARARAT', 143), (2014, 270634, 'J. BAEZ ARARAT', 144), (2337, 270634, 'J. BAEZ ARARAT', 145), (2658, 270634, 'J. BAEZ ARARAT', 146), (2979, 270634, 'J. BAEZ ARARAT', 147), (1667, 275219, 'L. REDONDO FLOREZ', 148), (2313, 275219, 'L. REDONDO FLOREZ', 149), (2634, 275219, 'L. REDONDO FLOREZ', 150), (2955, 275219, 'L. REDONDO FLOREZ', 151), (3276, 275219, 'L. REDONDO FLOREZ', 152), (1636, 277960, 'E. LAGOS VELANDIA', 153), (2282, 277960, 'E. LAGOS VELANDIA', 154), (2603, 277960, 'E. LAGOS VELANDIA', 155), (2924, 277960, 'E. LAGOS VELANDIA', 156), (3245, 277960, 'E. LAGOS VELANDIA', 157), (1374, 281468, 'M. VILLAMIZAR GALLAR', 158), (2020, 281468, 'M. VILLAMIZAR GALLAR', 159), (2343, 281468, 'M. VILLAMIZAR GALLAR', 160), (2664, 281468, 'M. VILLAMIZAR GALLAR', 161), (2985, 281468, 'M. VILLAMIZAR GALLAR', 162), (1377, 284022, 'J. PEÑALOZA REAL', 163), (2023, 284022, 'J. PEÑALOZA REAL', 164), (2346, 284022, 'J. PEÑALOZA REAL', 165), (2667, 284022, 'J. PEÑALOZA REAL', 166), (2988, 284022, 'J. PEÑALOZA REAL', 167), (1631, 284504, 'C. VILLAMIZAR NAVARR', 168), (2277, 284504, 'C. VILLAMIZAR NAVARR', 169), (2598, 284504, 'C. VILLAMIZAR NAVARR', 170), (2919, 284504, 'C. VILLAMIZAR NAVARR', 171), (3240, 284504, 'C. VILLAMIZAR NAVARR', 172), (1629, 286431, 'A. VARGAS PACHECO', 173), (2275, 286431, 'A. VARGAS PACHECO', 174), (2596, 286431, 'A. VARGAS PACHECO', 175), (2917, 286431, 'A. VARGAS PACHECO', 176), (3238, 286431, 'A. VARGAS PACHECO', 177), (1645, 286706, 'H. GOMEZ', 178), (2291, 286706, 'H. GOMEZ', 179), (2612, 286706, 'H. GOMEZ', 180), (2933, 286706, 'H. GOMEZ', 181), (3254, 286706, 'H. GOMEZ', 182), (1687, 289505, 'J. CETINA RUEDA', 183), (2333, 289505, 'J. CETINA RUEDA', 184), (2654, 289505, 'J. CETINA RUEDA', 185), (2975, 289505, 'J. CETINA RUEDA', 186), (3296, 289505, 'J. CETINA RUEDA', 187), (1652, 295897, 'J. PEÑARANDA LIZARAZ', 188), (2298, 295897, 'J. PEÑARANDA LIZARAZ', 189), (2619, 295897, 'J. PEÑARANDA LIZARAZ', 190), (2940, 295897, 'J. PEÑARANDA LIZARAZ', 191), (3261, 295897, 'J. PEÑARANDA LIZARAZ', 192), (1624, 296996, 'M. CRUZ GALVIS', 193), (2270, 296996, 'M. CRUZ GALVIS', 194), (2591, 296996, 'M. CRUZ GALVIS', 195), (2912, 296996, 'M. CRUZ GALVIS', 196), (3233, 296996, 'M. CRUZ GALVIS', 197), (1657, 299305, 'J. AVILA COTE', 198), (2303, 299305, 'J. AVILA COTE', 199), (2624, 299305, 'J. AVILA COTE', 200), (2945, 299305, 'J. AVILA COTE', 201), (3266, 299305, 'J. AVILA COTE', 202), (1632, 203931, 'C. DIAZ BUENO', 203), (2278, 203931, 'C. DIAZ BUENO', 204), (2599, 203931, 'C. DIAZ BUENO', 205), (2920, 203931, 'C. DIAZ BUENO', 206), (3241, 203931, 'C. DIAZ BUENO', 207), (1683, 206492, 'P. BARRERA ARENALES', 208), (2329, 206492, 'P. BARRERA ARENALES', 209), (2650, 206492, 'P. BARRERA ARENALES', 210), (2971, 206492, 'P. BARRERA ARENALES', 211), (3292, 206492, 'P. BARRERA ARENALES', 212), (1643, 206902, 'H. PARADA BALAGUERA', 213), (2289, 206902, 'H. PARADA BALAGUERA', 214), (2610, 206902, 'H. PARADA BALAGUERA', 215), (2931, 206902, 'H. PARADA BALAGUERA', 216), (3252, 206902, 'H. PARADA BALAGUERA', 217), (1638, 248743, 'E. ROJAS BLANCO', 218), (2284, 248743, 'E. ROJAS BLANCO', 219), (2605, 248743, 'E. ROJAS BLANCO', 220), (2926, 248743, 'E. ROJAS BLANCO', 221), (3247, 248743, 'E. ROJAS BLANCO', 222), (1646, 206429, 'I. CASTILLO ROBLES', 223), (2292, 206429, 'I. CASTILLO ROBLES', 224), (2613, 206429, 'I. CASTILLO ROBLES', 225), (2934, 206429, 'I. CASTILLO ROBLES', 226), (3255, 206429, 'I. CASTILLO ROBLES', 227), (1627, 232258, 'I. ESPITIA MONTAÑEZ', 228), (2273, 232258, 'I. ESPITIA MONTAÑEZ', 229), (2594, 232258, 'I. ESPITIA MONTAÑEZ', 230), (2915, 232258, 'I. ESPITIA MONTAÑEZ', 231), (3236, 232258, 'I. ESPITIA MONTAÑEZ', 232), (2606, 230282, 'E. RODRIGUEZ GRANJA', 233), (1628, 290622, 'J. SIERRA BUILES', 234), (2274, 290622, 'J. SIERRA BUILES', 235), (2595, 290622, 'J. SIERRA BUILES', 236), (2916, 290622, 'J. SIERRA BUILES', 237), (3237, 290622, 'J. SIERRA BUILES', 238), (1660, 294955, 'W. OCHOA BARAJAS', 239), (2306, 294955, 'W. OCHOA BARAJAS', 240), (2627, 294955, 'W. OCHOA BARAJAS', 241), (2948, 294955, 'W. OCHOA BARAJAS', 242), (3269, 294955, 'W. OCHOA BARAJAS', 243), (1674, 238192, 'M. MARTINEZ DE LA CR', 244), (2320, 238192, 'M. MARTINEZ DE LA CR', 245), (2641, 238192, 'M. MARTINEZ DE LA CR', 246), (2962, 238192, 'M. MARTINEZ DE LA CR', 247), (3283, 238192, 'M. MARTINEZ DE LA CR', 248), (1521, 269619, 'J. MOYA ROSADO', 249), (2167, 269619, 'J. MOYA ROSADO', 250), (2490, 269619, 'J. MOYA ROSADO', 251), (2811, 269619, 'J. MOYA ROSADO', 252), (3132, 269619, 'J. MOYA ROSADO', 253), (1665, 200366, 'J. TORRES VILLAMIZAR', 254), (2311, 200366, 'J. TORRES VILLAMIZAR', 255), (2632, 200366, 'J. TORRES VILLAMIZAR', 256), (2953, 200366, 'J. TORRES VILLAMIZAR', 257), (3274, 200366, 'J. TORRES VILLAMIZAR', 258), (1465, 230740, 'W. DELGADO SANABRIA', 259), (2111, 230740, 'W. DELGADO SANABRIA', 260), (2434, 230740, 'W. DELGADO SANABRIA', 261), (2755, 230740, 'W. DELGADO SANABRIA', 262), (3076, 230740, 'W. DELGADO SANABRIA', 263), (1678, 251808, 'M. SANTANA ENRIQUEZ', 264), (2324, 251808, 'M. SANTANA ENRIQUEZ', 265), (2645, 251808, 'M. SANTANA ENRIQUEZ', 266), (2966, 251808, 'M. SANTANA ENRIQUEZ', 267), (3287, 251808, 'M. SANTANA ENRIQUEZ', 268), (1621, 257180, 'E. SAAVEDRA TORRADO', 269), (2267, 257180, 'E. SAAVEDRA TORRADO', 270), (2588, 257180, 'E. SAAVEDRA TORRADO', 271), (2909, 257180, 'E. SAAVEDRA TORRADO', 272), (3230, 257180, 'E. SAAVEDRA TORRADO', 273), (1623, 277115, 'Y. PEREIRA ORTEGA', 274), (2269, 277115, 'Y. PEREIRA ORTEGA', 275), (2590, 277115, 'Y. PEREIRA ORTEGA', 276), (2911, 277115, 'Y. PEREIRA ORTEGA', 277), (3232, 277115, 'Y. PEREIRA ORTEGA', 278), (1644, 278610, 'H. RODRIGUEZ IBARRA', 279), (2290, 278610, 'H. RODRIGUEZ IBARRA', 280), (2611, 278610, 'H. RODRIGUEZ IBARRA', 281), (2932, 278610, 'H. RODRIGUEZ IBARRA', 282), (3253, 278610, 'H. RODRIGUEZ IBARRA', 283), (1679, 278874, 'R. OVALLOS CARDENAS', 284), (2325, 278874, 'R. OVALLOS CARDENAS', 285), (2646, 278874, 'R. OVALLOS CARDENAS', 286), (2967, 278874, 'R. OVALLOS CARDENAS', 287), (3288, 278874, 'R. OVALLOS CARDENAS', 288), (1622, 288034, 'F. GARCIA MORALES', 289), (2268, 288034, 'F. GARCIA MORALES', 290), (2589, 288034, 'F. GARCIA MORALES', 291), (2910, 288034, 'F. GARCIA MORALES', 292), (3231, 288034, 'F. GARCIA MORALES', 293), (1671, 295402, 'S. SANDOVAL BENITEZ', 294), (2317, 295402, 'S. SANDOVAL BENITEZ', 295), (2638, 295402, 'S. SANDOVAL BENITEZ', 296), (2959, 295402, 'S. SANDOVAL BENITEZ', 297), (3280, 295402, 'S. SANDOVAL BENITEZ', 298), (1661, 296306, 'W. GELVEZ MORENO', 299), (2307, 296306, 'W. GELVEZ MORENO', 300), (2628, 296306, 'W. GELVEZ MORENO', 301), (2949, 296306, 'W. GELVEZ MORENO', 302), (3270, 296306, 'W. GELVEZ MORENO', 303), (1637, 297259, 'E. RAMIREZ SULVARAN', 304), (2283, 297259, 'E. RAMIREZ SULVARAN', 305), (2604, 297259, 'E. RAMIREZ SULVARAN', 306), (2925, 297259, 'E. RAMIREZ SULVARAN', 307), (3246, 297259, 'E. RAMIREZ SULVARAN', 308), (1625, 297401, 'A. MORA RODRIGUEZ', 309), (2271, 297401, 'A. MORA RODRIGUEZ', 310), (2592, 297401, 'A. MORA RODRIGUEZ', 311), (2913, 297401, 'A. MORA RODRIGUEZ', 312), (3234, 297401, 'A. MORA RODRIGUEZ', 313), (1647, 297935, 'J. DELGADO PELAEZ', 314), (2293, 297935, 'J. DELGADO PELAEZ', 315), (2614, 297935, 'J. DELGADO PELAEZ', 316), (2935, 297935, 'J. DELGADO PELAEZ', 317), (3256, 297935, 'J. DELGADO PELAEZ', 318), (1633, 299292, 'C. PACHECO LUNA', 319), (2279, 299292, 'C. PACHECO LUNA', 320), (2600, 299292, 'C. PACHECO LUNA', 321), (2921, 299292, 'C. PACHECO LUNA', 322), (3242, 299292, 'C. PACHECO LUNA', 323), (1662, 299406, 'W. RODRIGUEZ MARTINE', 324), (2308, 299406, 'W. RODRIGUEZ MARTINE', 325), (2629, 299406, 'W. RODRIGUEZ MARTINE', 326), (2950, 299406, 'W. RODRIGUEZ MARTINE', 327), (3271, 299406, 'W. RODRIGUEZ MARTINE', 328), (1654, 299686, 'J. CRIADO ROJAS', 329), (2300, 299686, 'J. CRIADO ROJAS', 330), (2621, 299686, 'J. CRIADO ROJAS', 331), (2942, 299686, 'J. CRIADO ROJAS', 332), (3263, 299686, 'J. CRIADO ROJAS', 333), (1648, 207491, 'J. PEREZ LOPEZ', 334), (2294, 207491, 'J. PEREZ LOPEZ', 335), (2615, 207491, 'J. PEREZ LOPEZ', 336), (2936, 207491, 'J. PEREZ LOPEZ', 337), (3257, 207491, 'J. PEREZ LOPEZ', 338), (1403, 207853, 'R. FUENTES HERNANDEZ', 339), (2049, 207853, 'R. FUENTES HERNANDEZ', 340), (2372, 207853, 'R. FUENTES HERNANDEZ', 341), (2693, 207853, 'R. FUENTES HERNANDEZ', 342), (3014, 207853, 'R. FUENTES HERNANDEZ', 343), (1634, 209224, 'C. CARDENAS TORRES', 344), (2280, 209224, 'C. CARDENAS TORRES', 345), (2601, 209224, 'C. CARDENAS TORRES', 346), (2922, 209224, 'C. CARDENAS TORRES', 347), (3243, 209224, 'C. CARDENAS TORRES', 348), (1673, 209878, 'R. CACERES JAIMES', 349), (2319, 209878, 'R. CACERES JAIMES', 350), (2640, 209878, 'R. CACERES JAIMES', 351), (2961, 209878, 'R. CACERES JAIMES', 352), (3282, 209878, 'R. CACERES JAIMES', 353), (1620, 211642, 'C. JAUREGUI ACEVEDO', 354), (2266, 211642, 'C. JAUREGUI ACEVEDO', 355), (2587, 211642, 'C. JAUREGUI ACEVEDO', 356), (2908, 211642, 'C. JAUREGUI ACEVEDO', 357), (3229, 211642, 'C. JAUREGUI ACEVEDO', 358), (1369, 212149, 'J. OVALLE SANCHEZ', 359), (2015, 212149, 'J. OVALLE SANCHEZ', 360), (2338, 212149, 'J. OVALLE SANCHEZ', 361), (2659, 212149, 'J. OVALLE SANCHEZ', 362), (2980, 212149, 'J. OVALLE SANCHEZ', 363), (1373, 213139, 'W. ORTEGA JIMENEZ', 364), (2019, 213139, 'W. ORTEGA JIMENEZ', 365), (2342, 213139, 'W. ORTEGA JIMENEZ', 366), (2663, 213139, 'W. ORTEGA JIMENEZ', 367), (2984, 213139, 'W. ORTEGA JIMENEZ', 368), (1376, 214571, 'M. RODRIGUEZ SERRANO', 369), (2022, 214571, 'M. RODRIGUEZ SERRANO', 370), (2345, 214571, 'M. RODRIGUEZ SERRANO', 371), (2666, 214571, 'M. RODRIGUEZ SERRANO', 372), (2987, 214571, 'M. RODRIGUEZ SERRANO', 373), (1370, 215473, 'A. GARCIA GOMEZ', 374), (2016, 215473, 'A. GARCIA GOMEZ', 375), (2339, 215473, 'A. GARCIA GOMEZ', 376), (2660, 215473, 'A. GARCIA GOMEZ', 377), (2981, 215473, 'A. GARCIA GOMEZ', 378), (1650, 216664, 'J. CUELLAR RODRIGUEZ', 379), (2296, 216664, 'J. CUELLAR RODRIGUEZ', 380), (2617, 216664, 'J. CUELLAR RODRIGUEZ', 381), (2938, 216664, 'J. CUELLAR RODRIGUEZ', 382), (3259, 216664, 'J. CUELLAR RODRIGUEZ', 383), (1396, 218994, 'J. JAIMES MUÑOZ', 384), (2042, 218994, 'J. JAIMES MUÑOZ', 385), (2365, 218994, 'J. JAIMES MUÑOZ', 386), (2686, 218994, 'J. JAIMES MUÑOZ', 387), (3007, 218994, 'J. JAIMES MUÑOZ', 388), (2301, 220698, 'J. GARZON MONCADA', 389), (1635, 221719, 'D. BLANCO MALDONADO', 390), (2281, 221719, 'D. BLANCO MALDONADO', 391), (2602, 221719, 'D. BLANCO MALDONADO', 392), (2923, 221719, 'D. BLANCO MALDONADO', 393), (3244, 221719, 'D. BLANCO MALDONADO', 394), (1641, 222602, 'F. VARGAS ACEVEDO', 395), (2287, 222602, 'F. VARGAS ACEVEDO', 396), (2608, 222602, 'F. VARGAS ACEVEDO', 397), (2929, 222602, 'F. VARGAS ACEVEDO', 398), (3250, 222602, 'F. VARGAS ACEVEDO', 399), (1464, 222683, 'C. PARRA CASADIEGO', 400), (2110, 222683, 'C. PARRA CASADIEGO', 401)]" 
            //alert("quemados"+str_rec) 
            str_rec = str_rec + str;
            //alert("operario"+str_rec);
        }    
        //alert("download finish")
        var str_a = str_rec.substring(0,parseInt(str_rec.length));
       
        
        
        var splitString = str_a.split("(");// separacion de datos por caracter '\n' (salto de linea)    
    
        for (var i = 0; i < splitString.length ; i++) { 
            lista_a[i]= splitString[i].split(")")[0].split(",");                          
            str_rec = "";
            //alert("data rec = " + lista_a);
        }   
        //alert("data rec = " + lista_a);
        //alert("data rec******** = " + str_rec);
        
        
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
            
           // alert("lista b = "+lista_b[i]);
            //alert("lista c = "+lista_c[i]);
        }  
           
       // alert("lista b = "+lista_b);
        //alert("lista c = "+lista_c);
        //alert("lista d = "+lista_d[2]);   
    }
    
function buscar_op(){
        
        var search_op = String(project.getTag("PLC/GT_CodeOpeatorFIFO",state,0));//lectura de variable (tag, funcion, index), si es una tag dejar '0', si es array colocar el index o '-1' para traer todo  
       //alert("search_op234 = " + search_op + "  "+ lista_b+ "  "+ lista_b[1]+ "  "+ lista_b[2] );
       // alert("search_op234 = "+ lista_b);
       // alert ("Nombre OP****="+ project.getTag("nameOP(0)",state,0));
        var index_data = lista_b.indexOf(search_op,0);
        //alert("search_oo********** " + index_data);
       
        
        if(index_data === -1){
            //alert("codigo incorrecto, por favor intente nuevamente. => " + search_op);
            
        }else{
           //alert(lista_d[index_data]);
        }
}
    






function verNombreHome(){
   
    for(var i=0;i <400; i++){
      project.setTag("passwordOP", lista_b[i],i);
      //project.setTag("ArrayAttributeOperatorHMI",parseInt(lista_c[i]),i);
        //alert ("Pasword"+lista_b[i]); 
    }
  
   var operario= project.getTag("passwordOP",state,-1);
     
   //alert ("Pasword"+ project.getTag("passwordOP",state,-1));  
   //alert ("att:"+operario);
}
    
function vista_datos_operario_pantalla()
{    
        
    
    for (var i = 0; i < 400; i++) {
            //project.setTag("passwordOP", lista_b[i], i);  //id
            
        project.setTag("nameOP("+ i +")", lista_d[i]);
            project.setTag("ArrayAttributeOperatorHMI",parseInt(lista_c[i]),i);
            
            //Escritura de variables en PLC
            //project.setTag("PLC/ArrayOperator_"+i+"", (lista_b[i]));
            //project.setTag("PLC/ArrayAttributeOperator_"+i+"", parseInt(lista_c[i]));
            
            // alert ("Datos operario"+lista_d[i] +"  "+i);
        }  

    //alert ("nameOP"+project.getTag("nameOP("+0+")"));

}
    
if (project.getTag("actualizar_Operarios",state,0)===1){
    
    project.setTag("actualizar_Operarios",0);
    download_data();
    verNombreHome();
    vista_datos_operario_pantalla();
    buscar_op();
    project.setTag("PLC/PAC_Preload", 0); 
    //alert("cualquier alert")
}



function BtnStd3_btn_onMouseClick(me, eventInfo)
{
    ///alert("Operario seleccionado"+project.getTag("BuscarOperarioHMI",state,0));
    var pasPLC = project.getTag("BuscarOperarioHMI",state,0);
    //alert("Index Operario"+ pasPLC);
    var listPass = project.getTag("passwordOP",state,-1);
    //alert("posPassPLC:"+ listPass);
    var posPassPLC =  listPass.indexOf(pasPLC,0);
    //alert(posPassPLC);
    if(project.getTag("BuscarOperarioHMI",state,0)>0&& project.getTag("BuscarOperarioHMI",state,0)===project.getTag("passwordOP",state,posPassPLC)){
    //alert(project.getTag("BuscarOperarioHMI",state,0))
        //Condicional eliminado de este if ---> posPassPLC!=0&& "aqui va project.getTag("BuscarOperarioHMI",state,0)>0" 
    project.setTag("PLC/GT_OperatorEntered",project.getTag("passwordOP",state,posPassPLC));    
    project.setTag("PLC/GT_OperatorAttributeEntered",project.getTag("ArrayAttributeOperatorHMI",state,posPassPLC));
    project.setTag("PLC/GT_OPERADOR_INGRESADO_BOOL_01",1);
    //alert("Operario seleccionado"+project.getTag("nameOP("+posPassPLC+")")+ "att:"+project.getTag("ArrayAttributeOperatorHMI",state,posPassPLC));
    project.setTag("BuscarOperarioHMI",0);
    posPassPLC=0;    
    }
    //else{
        //project.setTag("BuscarOperarioHMI",0);
        //alert("El operaio no existe");
    //}
    if(project.getTag("BuscarOperarioHMI",state,0)!=project.getTag("passwordOP",state,posPassPLC)&&posPassPLC<0&&project.getTag("BuscarOperarioHMI",state,0)!=0){
       // alert("El operario no existe");
        project.setTag("mmsgOpNoRegistrado",1);
        project.showDialog("OperarioNoRegistrado.jmx");
    }
    
    var sinLlamadoMantenimiento=project.getTag("PLC/GT_WithoutMaintenanceRequest",state,0);
    //alert(sinLlamadoMantenimiento);
    if(sinLlamadoMantenimiento==1){
            project.showDialog("NoHaySolicitudMantenimiento.jmx");
            project.setTag("PLC/GT_WithoutMaintenanceRequest",0)
    }
}

/*
function BtnStd5_btn_onMouseClick(me, eventInfo)
{
    project.setTag("mmsgOpNoRegistrado",0);
    project.setTag("BuscarOperarioHMI",0);
    project.closeDialog("OperarioNoRegistrado.jmx");
}
*/



/*function cerrarMensajeNoMantenimiento(me, eventInfo)
{
     project.setTag("PLC/GT_WithoutMaintenanceRequest", 0); 
}*/
function alerts1()
{
    var procesando= project.getTag("PLC/GT_TIEMPO_ESPERA_MOTIVO_INGRESADO",state,0);
    //alert(eventocausal);
    if (procesando==1){
        project.showDialog("Procesando.jmx");//traer el dialogo
    }
    else {
        project.closeDialog("Procesando.jmx");//cerrar el dialogo
    }
    
    page.setTimeout("alerts1()",1000);
}

function PerssonelRegistration_onActivate(me, eventInfo)
{
    /*project.closeDialog("SolicitudMantenimiento.jmx"); */
    project.closeDialog("eventocausal.jmx"); 
    alerts1();
}