import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

const sequelize = new Sequelize(
  `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
  { 
    dialect: 'postgres',
    logging: true,
    dialectOptions: {
      connectTimeout: 90000, // Set the connection timeout to 90 seconds 
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

  // Synchronize models with the database
sequelize
.sync({ force: false })
.then(() => {
  console.log('All models were synchronized successfully.');
})
.catch((err) => {
  console.error('Error synchronizing models:', err);
});

export default sequelize;
