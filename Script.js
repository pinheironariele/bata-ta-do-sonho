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

-->
<div id="pixBox" style="display:none; margin-top:20px; text-align:center; border:1px solid #ccc; padding:10px;">
  <h3>Escaneie para pagar R$ <span id="valorPix"></span></h3>
  <img id="qrImg" width="250" alt="QR Code Pix"/>
  <p>Copia e Cola:</p>
  <input id="copiaCola" readonly style="width:100%"/>
  <button onclick="navigator.clipboard.writeText(document.getElementById('copiaCola').value)">Copiar</button>
  <br><br>
  <button onclick="document.getElementById('pixBox').style.display='none'">Fechar</button>
</div>

<script>
let itens=[];
let total=0;
const CHAVE_PIX = "01372051040"; // Sua chave Pix CPF/CNPJ/Telefone
const NOME_LOJA = "SUA LOJA"; 
const CIDADE = "ITAPEMA";

function adicionar(nome,valor){
  itens.push(`${nome} - R$ ${valor.toFixed(2)}`);
  total += valor;
  mostrar();
}

function mostrar(){
  document.getElementById("lista").innerHTML = itens.join("<br>");
  calcular();
}

function calcular(){
  let entrega = Number(document.getElementById("entrega").value);
  let final = total + entrega;
  document.getElementById("total").innerHTML = "Total: R$ " + final.toFixed(2);
}

 gerarBRCode(valor, txid) {
  valor = valor.toFixed(2);
  const chave = CHAVE_PIX;
  const nome = NOME_LOJA.substring(0, 25).toUpperCase();
  const cidade = CIDADE.substring(0, 15).toUpperCase();
  
  let payload = "000201";
  payload += "26" + String(14 + 2 + 2 + chave.length).padStart(2,'0') + "0014BR.GOV.BCB.PIX";
  payload += "01" + String(chave.length).padStart(2,'0') + chave;
  payload += "520400005303986";
  payload += "54" + String(valor.length).padStart(2,'0') + valor;
  payload += "5802BR";
  payload += "59" + String(nome.length).padStart(2,'0') + nome;
  payload += "60" + String(cidade.length).padStart(2,'0') + cidade;
  payload += "62" + String(5 + 2 + txid.length).padStart(2,'0') + "05" + String(txid.length).padStart(2,'0') + txid;
  payload += "6304";
  
  // Calcula CRC16
  let crc = CRC16(payload);
  return payload + crc;
}

function CRC16(str) {
  let crc = 0xFFFF;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1);
    }
  }
  return ((crc & 0xFFFF) ^ 0xFFFF).toString(16).toUpperCase().padStart(4,'0');
}


function pagarPix(){
  let entrega = Number(document.getElementById("entrega").value);
  let valorFinal = total + entrega;
  
  if(valorFinal <= 0) {
    alert("Carrinho vazio");
    return;
  }

  let txid = "PED" + Math.random().toString(36).substr(2, 9).toUpperCase(); // ID único
  let brcode = gerarBRCode(valorFinal, txid);

  // Mostra na tela
  document.getElementById("valorPix").innerText = valorFinal.toFixed(2);
  document.getElementById("copiaCola").value = brcode;
  
  // Gera QR Code usando API do Google Charts - grátis
  document.getElementById("qrImg").src = "https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=" + encodeURIComponent(brcode);
  
  document.getElementById("pixBox").style.display = "block";
}

function pedidoWhats(){
  let entrega = Number(document.getElementById("entrega").value);
  let valor = (total + entrega).toFixed(2);
  let mensagem = "Olá! Quero pedir:%0A%0A" + itens.join("%0A") + "%0A%0AEntrega: R$ " + entrega + "%0A" + "Total: R$ " + valor;
  window.open("https://wa.me/048991943319?text="+mensagem);
}
</script>
