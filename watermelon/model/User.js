import { tableSchema as ts , Model } from "@nozbe/watermelondb";
import { field } from '@nozbe/watermelondb/decorators';

const tableSchema = ts({
  name: 'users',
  columns: [
    { name: 'name', type: 'string', isOptional: false},
    { name: 'email', type: 'string', isOptional: false},
    { name: 'db_id', type: 'string', isOptional: true},
    { name: 'created_at', type: 'number', isOptional: false},
    { name: 'updated_at', type: 'number', isOptional: false},
  ]
})


class User extends Model {
  static table = 'users';

  @field('name') name;
  @field('email') email;
  @field('db_id') db_id;
  @field('created_at') created_at;
  @field('updated_at') updated_at;
  
}


export {
  tableSchema,
  User
}
