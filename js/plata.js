class Billete {
  constructor(v, c) {
    this.valor = v;
    this.cantidad = c;
    this.image = imagenes[this.valor];
  }
}

var imagenes = [];
imagenes[1000] = "1000.jpg";
imagenes[2000] = "2000.jpg";
imagenes[5000] = "5000.jpg";
imagenes[10000] = "10000.jpeg";
imagenes[20000] = "20000.jpg";

var caja = [];
caja.push(new Billete(1000, 7));
caja.push(new Billete(2000, 12));
caja.push(new Billete(5000, 15));
caja.push(new Billete(10000, 20));
caja.push(new Billete(20000, 25));

var entregado = [];

var dinero;
var division;
var papeles;

var resultado = document.getElementById("resultado");
var b = document.getElementById("extraer");
b.addEventListener("click", entregarDinero);

function entregarDinero() {
  var texto = document.getElementById("dinero");
  dinero = parseInt(texto.value);
  var total = document.getElementById("suma");
  total.innerHTML = "<hr>";
  var loQueQueda = 0;
  entregado = [];
  
  caja.sort((a, b) => b.valor - a.valor);

  for (var billete of caja) {
    if (dinero > 0) {
      division = Math.floor(dinero / billete.valor);
      if (division > billete.cantidad) {
        papeles = billete.cantidad;
      } else {
        papeles = division;
      }
      entregado.push(new Billete(billete.valor, papeles));
      billete.cantidad -= papeles;
      dinero -= billete.valor * papeles;
    }
    total.innerHTML += "Valor: " + billete.valor + " Cantidad: " + billete.cantidad + "<br />";
    loQueQueda += billete.valor * billete.cantidad;
  }

  total.innerHTML += "Total: " + loQueQueda + "<br/>";

  if (dinero > 0) {
    resultado.innerHTML = 'No puedo darte esa cantidad.';
  } else {
    resultado.innerHTML = '';
    for (var e of entregado) {
      if (e.cantidad > 0) {
        resultado.innerHTML += '<span style="font-size: 35px;">' + e.cantidad + "    " + "</span>" + "<img src='img/" + e.image + "'><br />";
      }
    }
  }
  console.log(entregado);
}
