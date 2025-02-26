import firebird from "node-firebird";

export const dbOptions = {
  host: "34.234.233.0",
  port: 3060,
  database: "C:\\MMINFOBOARETTO\\BD\\BANCOBOARETTO30.FDB", 
  user: "SYSDBA",
  password: "20220401",
  lowercase_keys: true,
  role: null,
  pageSize: 4096,
  blobAsText: true,
  encoding: 'UTF8'
};

export const executeQuery = (ssql, params, callback) => {
  firebird.attach(dbOptions, function (err, db) {
    if (err) {
      return callback(err, []);
    }

    db.query(ssql, params, function (err, result) {
      db.detach();
      if (err) {
        return callback(err, []);
      } else {
        console.log('Conexão estabelecida com sucesso!');
        return callback(undefined, result);
    }
    });
  });
};

export async function executeQueryTransaction (transaction, ssql, params) {
  
  return new Promise((resolve, reject) => {
     transaction.query(ssql, params, (err, result) => {
      
      if (err) {
        return reject(err)
      }            
      return resolve(result)
    })
  })
}

export {firebird}
