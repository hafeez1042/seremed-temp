import { Options } from 'sequelize';

export const sequelizeConfigs: { [key: string]: Options } = {
  "development": {
    "username": "root",
    "password": '',
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": '',
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": '',
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
