function getRandomInt(min, max) { 
  return Math.floor(Math.random() * (max - min)) + min; 
}

var Croupier={
    GenerarBaraja: barajaDeCartas,
    Barajar: barajar,
    OrdenarBaraja: ordenar,
    Repartir: repartir,
    DarCarta: pedirCarta,
    Puntuar: puntuar,
    Ganador: ganador,
    ComenzarBJ: comenzarBJ,
    GanadorBj: ganador,
    Texto: texto,
    baraja: [],
    jugadores: 0,
    mano: [],
    total:[],
    texto: []
}
   
function barajaDeCartas(cantidadDeBarajas){
    var pintas="CPDT"
    for(var c=1;c<=cantidadDeBarajas;c++){
        for(var i=0;i<4;i++){
        		for(var v=1;v<=13;v++){
            this.baraja.push({Pinta:pintas[i],Valor:v});
            }
        }
    }
}
function barajar(){
    var aux, a, b; 
    for(var i=0;i<=this.baraja.length*3;i++){
        a=getRandomInt(0,this.baraja.length-1);    
        b=getRandomInt(0,this.baraja.length-1);
        aux=this.baraja[a];
        this.baraja[a]=this.baraja[b];
        this.baraja[b]=aux;
    }
}
function ordenar(){
    var a=this.baraja.length;
    for (var i=0;i<a;i++){
        this.baraja.shift();
    }
    Croupier.GenerarBaraja(a/52);
}
function repartir(cantidad){
   	var jugadores=this.jugadores;
    for(var n=0;n<=jugadores;n++){
        this.mano.push([]);
    }  
    for(var k=0;k<cantidad;k++){
        for(var j=0;j<=jugadores;j++){
            this.mano[j][k]=this.baraja[0];   
            this.baraja.shift()     
        }    
    }    
}
function pedirCarta(jugador){
    if(this.total[jugador]<21){
        this.mano[jugador].push(this.baraja[0]);
        this.baraja.shift();
    }
    
    var p=jugador;
    var UltimaCarta=this.mano[p].length-1;

    if (this.total[p]<21){
        if(this.mano[p][UltimaCarta].Valor>10){
            if(this.mano[p][0]===1&&this.mano[p][1]===1){
                this.total[p]=12;
            } else{
                this.total[p]=Number(this.total[p])+10;
            }
        } else if (this.mano[p][UltimaCarta].Valor===1){
            if(this.total[p]<=10){
				this.total[p]=Number(this.total[p])+11;
			} else {
                this.total[p]=Number(this.total[p])+1;
            }
		} else{
              	this.total[p]=Number(this.total[p])+Number(this.mano[p][UltimaCarta].Valor);
        }
	}
}
function puntuar(){
	var jugadores=this.jugadores;
    
    for(var j=0;j<=jugadores;j++){
      	var Carta0=this.mano[j][0].Valor;
        var Carta1=this.mano[j][1].Valor;

        this.total[j]=Carta0+Carta1;
       
        if(Carta0>=10&&Carta1>=10){
           	this.total[j]=20;
        } else if (Carta0===1&&Carta1===1){
         	this.total[j]=12;
        } else if (Carta0>=10&&Carta1<10&&Carta1>1){
          	this.total[j]=10+Carta1;
        } else if (Carta0<10&&Carta0>1&&Carta1>=10){
         	this.total[j]=10+Carta0;
        } else if (Carta0===1&&Carta1<10&&Carta1>1){
          	this.total[j]=Carta1+11;
        } else if (Carta0<10&&Carta0>1&&Carta1===1){
          	this.total[j]=Carta0+11;
        } else if (Carta0>=10&&Carta1===1){
           	this.total[j]=21;
        } else if (Carta0===1&&Carta1>=10){
          	this.total[j]=21;
       	}
  	} 
}
function ganador(){
    var Texto;
  	var jugadores=this.jugadores;
    this.texto[1]="";
    for(var j=1;j<=jugadores;j++){
     
        var Cro=this.total[0];
        var Jug=this.total[j];
        
        if ((Cro>Jug&&Cro<=21)||(Cro<Jug&&Jug>21&&Cro<=21)){
            Texto="Gana el Croupier";
        } else if ((Jug>Cro&&Jug<=21)||(Jug<Cro&&Cro>21&&Jug<=21)){
            Texto="Gana el Jugador "+j;
        } else {
            Texto="El jugador "+j+" Empata con el Croupier";
        }
        
    	this.texto[1]=this.texto[1]+Texto+"\nPuntos: C: "+this.total[0]+" J"+j+": "+this.total[j]+"\n";
    }
}
function texto(jug){
    
    var pintaC, valorC;
    
    if (this.mano[0][0].Pinta==="C"){
        pintaC = "Corazones";
    } else if (this.mano[0][0].Pinta==="P"){
        pintaC = "Picas";
    } else if (this.mano[0][0].Pinta==="D"){
        pintaC = "Diamantes";
    } else if (this.mano[0][0].Pinta==="T"){
        pintaC = "Trebores";
    }
   
    if(this.mano[0][0].Valor===11){
        valorC = "a Jack(J)";
    } else if (this.mano[0][0].Valor===12){
        valorC = "a Dama(Q)";
    } else if (this.mano[0][0].Valor===13){
        valorC = " Rey(K)";
    } else if (this.mano[0][0].Valor===1){
        valorC = " As";
    } else {
        valorC = this.mano[0][0].Valor;
    }
    
    var manoJug="";
    
    for(var i=0;i<this.mano[jug].length;i++){
        manoJug=manoJug+" "+this.mano[jug][i].Valor+this.mano[jug][i].Pinta;
    }
    
    
    this.texto[0]="El croupier tiene 2 cartas, la carta visible es un "+valorC+" de "+pintaC+"\n\n Tus cartas son: "+manoJug+"\nPuntos: "+this.total[jug]+"\n\nPedir, Plantarse o Doblar";
    
}
function comenzarBJ(){
     
    var jug=this.jugadores;
    
    Croupier.GenerarBaraja(6);
    Croupier.Barajar();
    Croupier.Repartir(2);
    Croupier.Puntuar();
   
    for(var j=1;j<=jug;j++){
        
        Croupier.Texto(jug);
        var AccionJ= prompt(this.texto[0],"Plantarse");
        
        if (AccionJ==="Pedir"){
            Croupier.DarCarta(j);
            j=0;
        } else if (Croupier.total[0]<=16){
            Croupier.DarCarta(0);
            if(Croupier.total[0]<=16){
                j=0;
            }
        } 
        Croupier.Ganador();
    }
    
    alert(this.texto[1]+"!");
    
}


function GenerarMano(mano,valorM,pinta,cartas){
    var a,b;
         
    for(var i=0;i<cartas;i++){
        a=getRandomInt(1,valorM);
        b=pinta[getRandomInt(0,3)];
        mano[i]=[{Valor:a,Pinta:b}];
    }
  }

function Programa(){
      
    Croupier.jugadores=1;
    
    /** Generador de baraja **/
    Croupier.GenerarBaraja(6);
    //console.log(Croupier.baraja);
    /*************************/  
    
    /** Meclador de baraja  **/  
    Croupier.Barajar();
    //Croupier.baraja.shift();
    //console.log(Croupier.baraja);
    /*************************/ 
      
    /** Ordenar de baraja   **/
    //Croupier.OrdenarBaraja();   
    //console.log(Croupier.baraja);
    /*************************/
      
    /** Repartir cartas     **/
    Croupier.Repartir(2);   
    //console.log(Croupier.mano);
    //console.log(Croupier.baraja);
    /*************************/
    
    /** Puntuar mano       **/
    Croupier.Puntuar();   
    //console.log(Croupier.baraja);
    //console.log(Croupier.mano);
    //console.log(Croupier.total);
    /*************************/
    
    /** Pedir cartas        **/
    Croupier.DarCarta(0);
    Croupier.DarCarta(1);
    //console.log(Croupier.baraja);
    //console.log(Croupier.mano);
    //console.log(Croupier.total);
    /*************************/
     
    /** Ganador          **/
    Croupier.Ganador();
    console.log(Croupier.baraja);
    console.log(Croupier.mano);
    console.log(Croupier.total);
    console.log(Croupier.texto[1]);
    /*************************/
    
    /** ComenzarBJ       **/
    Croupier.ComenzarBJ();   
    console.log(Croupier.baraja);
    console.log(Croupier.mano);
    console.log(Croupier.total);
    //console.log(Croupier.texto[1]);
    /*************************/
    
}
   
Programa();
