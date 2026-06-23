let pedidos=[];
let total=0;


function addCarrinho(nome,valor){

pedidos.push(nome);

total += valor;

document.getElementById("carrinho").innerHTML =
pedidos.join("<br>");

document.getElementById("total").innerHTML =
"Total: R$ "+total.toFixed(2);

}


function finalizar(){

let texto =
"Olá! Quero pedir:%0A"
+ pedidos.join("%0A")
+ "%0A%0ATotal: R$ "
+ total.toFixed(2);


window.open(
"https://wa.me/048991943319?text="+texto
);

}
