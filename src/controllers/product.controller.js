// ==> Insira as regras de negócio aqui

const db = require("../config/database");

// ==> Método responsável por listar todos os 'Products':
exports.listAllProducts = async (req, res) => {
    const response = await db.query('SELECT * FROM Usuarios');
    res.status(200).send(response.rows);
  };