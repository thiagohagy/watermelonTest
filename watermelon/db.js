
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { appSchema } from '@nozbe/watermelondb';


import { User, tableSchema as UserTS } from './model/User';

const tables = [
  //table schema goes here 
  UserTS,
 ];

const  modelClasses = [
  User,
];

const adapter =  new SQLiteAdapter({
  schema: appSchema({
    version: 8,
    tables
  }),
});

const database = new Database({
  adapter,
  modelClasses,
  actionsEnabled: true,
})


export default database;