import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Usuario from './usuarios.js';

const Poste = sequelize.define('Poste', {
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idUsuario: {  
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,  
      key: 'id',    // A chave primária da tabela de usuário
    },
    onUpdate: 'CASCADE',  // O que fazer em caso de atualização
    onDelete: 'CASCADE',  // O que fazer em caso de exclusão
  }
}, {
  tableName: 'poste',  
});

export default Poste;
