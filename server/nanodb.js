const nano = require('nano');
const url = "https://apikey-v2-380rhhqzbqk6eifbn30gvuevzk9903pdrrsd7f8ipknj:ee0e39016c30dc0fc4fd04d12a420174@5804af1c-53d6-4cc1-b0eb-5219a1cc5775-bluemix.cloudant.com";
const nanodb = nano(process.env.COUCHDB_URL || url);// connect with couchdb
const testdb = nanodb.use('demo_database'); // connect to database
const admin = nanodb.use('demo_database'); // connect to database
const test_get = nanodb.use('demo_database'); // connect to database
module.exports={testdb,nano,admin,test_get};
