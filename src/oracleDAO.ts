import OracleDB, {
  ConnectionAttributes,
  getConnection,
  Connection,
  SYSDBA,
} from 'oracledb';

export class OracleDAO {
  private connectionConfig: ConnectionAttributes = {
    privilege: SYSDBA,
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASSWORD,
    connectString: process.env.ORACLE_CONNECTION,
  };

  private async ConnectionDB(): Promise<Connection> {
    return await getConnection(this.connectionConfig);
  }

  public async connectAndExecute(
    query: string,
  ): Promise<OracleDB.Result<unknown> | null> {
    let data = null;

    try {
      let connection = await this.ConnectionDB();
      data = await connection.execute(query);
    } catch (err) {
      console.log(`Error: ${err}`);
    }
    return data;
  }

  public async executeAndPrint(query: string): Promise<void> {
    const data = await this.connectAndExecute(query);
    console.log('Query data: ');
    console.log(data?.rows);
  }
}
