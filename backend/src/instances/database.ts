import sql from 'mssql';
import { config } from '@/config';

/**
 * @summary
 * Database connection pool instance
 * Manages SQL Server connections
 */
let pool: sql.ConnectionPool | null = null;

/**
 * @summary
 * Gets or creates database connection pool
 *
 * @returns {Promise<sql.ConnectionPool>} Database connection pool
 */
export async function getPool(): Promise<sql.ConnectionPool> {
  if (!pool) {
    pool = await sql.connect({
      server: config.database.host,
      port: config.database.port,
      user: config.database.user,
      password: config.database.password,
      database: config.database.database,
      options: config.database.options,
    });
    console.log('Database connection pool created');
  }
  return pool;
}

/**
 * @summary
 * Closes database connection pool
 */
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.close();
    pool = null;
    console.log('Database connection pool closed');
  }
}

/**
 * @enum ExpectedReturn
 * @description Expected return types from database operations
 */
export enum ExpectedReturn {
  Single = 'Single',
  Multi = 'Multi',
  None = 'None',
}

/**
 * @summary
 * Executes database stored procedure
 *
 * @param {string} routine - Stored procedure name
 * @param {object} parameters - Procedure parameters
 * @param {ExpectedReturn} expectedReturn - Expected return type
 * @param {sql.Transaction} transaction - Optional transaction
 * @param {string[]} resultSetNames - Optional result set names
 * @returns {Promise<any>} Query results
 */
export async function dbRequest(
  routine: string,
  parameters: any,
  expectedReturn: ExpectedReturn,
  transaction?: sql.Transaction,
  resultSetNames?: string[]
): Promise<any> {
  const connectionPool = await getPool();
  const request = transaction ? new sql.Request(transaction) : new sql.Request(connectionPool);

  Object.keys(parameters).forEach((key) => {
    request.input(key, parameters[key]);
  });

  const result = await request.execute(routine);

  switch (expectedReturn) {
    case ExpectedReturn.Single:
      return result.recordset[0];
    case ExpectedReturn.Multi:
      if (resultSetNames && resultSetNames.length > 0) {
        const namedResults: any = {};
        resultSetNames.forEach((name, index) => {
          namedResults[name] = Array.isArray(result.recordsets)
            ? result.recordsets[index]
            : result.recordsets;
        });
        return namedResults;
      }
      return result.recordsets;
    case ExpectedReturn.None:
      return null;
    default:
      return result.recordset;
  }
}
