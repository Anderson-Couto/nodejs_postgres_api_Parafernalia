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

  response = [responseP.rows[0], responseU.rows[0]] 

  res.status(200).send(response);
};
