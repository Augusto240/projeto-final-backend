import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('projeto_final_backend', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
