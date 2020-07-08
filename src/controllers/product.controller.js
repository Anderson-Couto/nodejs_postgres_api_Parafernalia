const db = require('../config/database');

// ==> Método responsável por selecionar 'Produtos' pelo 'Id' e dar descontos a um 'Usuario':
exports.findProductById = async (req, res) => {
  const idP = parseInt(req.params.idP);
  const idU = parseInt(req.params.idU);

  // ==> Realizando Querys para buscar o usuário e o produto solicitado.
  const responseU = await db.query(
    'SELECT * FROM usuarios WHERE id = $1',
    [idU],
  );
  const responseP = await db.query(
    'SELECT * FROM produtos WHERE id = $1',
    [idP],
  );
  
  // ==> Declarando as variáveis
  const produtoPreco = responseP.rows[0].price;
  const descontoBase = responseP.rows[0].base_discount_percent;
  const aniversario = responseU.rows[0].birthdate;
  const now = new Date;
  const blackFriday = new Date(0, 10, 25);
  let descontoTotal = descontoBase;

  // ==> Regras de négocio
  const regra1 = (aniversario.getDate() === now.getDate()) && (aniversario.getMonth() === now.getMonth());
  const regra2 = (blackFriday.getDate() === now.getDate()) && (blackFriday.getMonth() === now.getMonth());
  

  // ==> Condições
  if (regra1) { descontoTotal += 5.0 };
  if (regra2) { descontoTotal += 10.0 };
  if (descontoTotal > 25.0) { descontoTotal= 25.0 }

  // ==> Aplicando desconto
  const precoDescontado = produtoPreco*(100 - descontoTotal)/100

  // ==> Retornando a resposta
  const response = { "total_discount": descontoTotal,
                    "final_price": precoDescontado}

  res.status(200).send(response);
};
