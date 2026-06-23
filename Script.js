let itens=[];
let total=0;


function adicionar(nome,valor){

itens.push(nome);

total += valor;

mostrar();

}


function mostrar(){

document.getElementById("lista").innerHTML =
itens.join("<br>");

calcular();

}



function calcular(){

let entrega =
Number(document.getElementById("entrega").value);

let final = total + entrega;


document.getElementById("total").innerHTML =
"Total: R$ " + final.toFixed(2);

}



function pedido(){

let entrega =
Number(document.getElementById("entrega").value);


let valor =
(total + entrega).toFixed(2);


let mensagem =
"Olá! Quero pedir:%0A%0A"
+ itens.join("%0A")
+ "%0A%0AEntrega: R$ "
+ entrega
+ "%0A"
+ "Total: R$ "
+ valor;


window.open(
"https://wa.me/048991943319?text="+mensagem
);


}
const pix = "01372051040";
