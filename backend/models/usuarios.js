import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Usuario = sequelize.define('Usuario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, 
    },
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  foto: {
    type: DataTypes.STRING,  
    allowNull: true,         
  },
}, {
  timestamps: true,
  tableName: 'usuarios',
});

export default Usuario;
