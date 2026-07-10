// Este es el archivo de configuración de TypeORM para la conexión a la base de datos PostgreSQL. Se utiliza para definir los parámetros de conexión y las rutas de las entidades y migraciones.
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config(); // Carga las variables de entorno desde el archivo .env

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['./src/**/*.entity.ts'],
  migrations: ['./src/database/migrations/*.ts'],
  synchronize: false,
});
