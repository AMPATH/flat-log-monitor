'use strict'
const connection = require('../connection/conection');

const def = {
  checkLastResultEntry
}

function checkLastResultEntry(resultConcept,gracePeriod){
    const sql = `SELECT o.date_created AS last_update,
    cn.name as table_name,
    IF(TIMESTAMPDIFF(MINUTE,
            o.date_created,
            NOW()) > ${gracePeriod},
        1,
        0) AS 'sync_delayed',
    TIMESTAMPDIFF(MINUTE,
        o.date_created,
        NOW()) AS duration_since_last_sync
FROM
    amrs.obs o
    join amrs.concept_name cn on (cn.concept_id = o.concept_id AND cn.voided = 0)
WHERE
    o.concept_id = ${resultConcept}
    AND o.creator = 169223
ORDER BY o.date_created DESC
LIMIT 1;`;

 return runSql(sql);

}

function runSql(sql){
  return new Promise((resolve, reject) => {
  console.log('sql ...', sql);
  connection
    .getConnectionPool()
    .then((pool) => {
      pool.query(sql, function (error, results, fields) {
        if (error) {
          console.log("Error", error);
          reject(error);
        } else {
          console.log("getLastFlatLogEntry successfull ", results);
          resolve(results);
        }
      });
    })
    .catch((error) => {
      reject(error);
    });

  });

}

module.exports = def;