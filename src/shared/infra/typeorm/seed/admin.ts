import { hash } from 'bcrypt';
import { createConnection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

createConnection()
  .then(async (connection) => {
    const id = uuidV4();

    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'ABCDEF')`
    );

    console.log('Admin User created');
    await connection.close();
  })
  .catch((error) => console.error('Error: ', error.message));
