var faunadb = require("faunadb"),
  q = faunadb.query;
var client = new faunadb.Client({ secret:  'YOUR_FAUNADB_ADMIN_SECRET' });
var top_db =  ["production", "staging", "internal"];
var parent_db = "staging";
var child_db = ["people_department", "it_department", "marketing_department"];
var top_db_role = "admin";
var child_db_role = "server";

// Check if the top level database exists
var top_db_key_creation = client.query(
  q.Do(
    // first, create the top level databases if they don't exist
    q.Map(
      top_db,
      function(db) {
        return q.If(q.Exists(q.Database(db)), "exists", q.CreateDatabase({ name: db }));
      }
    ),
    // second, create keys for the top level databases
    q.Map(
      top_db,
      function(db) {
        return {
          db : db,
          secret : q.Select("secret", q.CreateKey({ role: top_db_role, database: q.Database(db) }))
        };
      }
    )
  )
).then(function(data) {
      // Generate an object of top database names and their keys
  var top_db_secrets = {};
  Object.values(data).map(function(element){
    return top_db_secrets[element.db] = element.secret;
  });
  console.log("------------------ Top database secrets --------------");
  console.log(top_db_secrets);
  console.log("------------------------------------------------------");

  var parent_db_key = top_db_secrets[parent_db];
  if (parent_db_key) {
    // Create parent database instance
    var client = new faunadb.Client({ secret: parent_db_key });
    // Check if the level level database exists
    var child_db_creation = client.query(
      q.Do(
        // first, create the low level databases if they don't exist
        q.Map(
          child_db,
          function(db) {
            return q.If(q.Exists(q.Database(db)), "exists", q.CreateDatabase({ name: db }));
          }),
        // second, create keys for the low level databases
        q.Map(
          child_db,
          function(db) {
            return {
              db : db,
              secret : q.Select("secret", q.CreateKey({ role: child_db_role, database: q.Database(db) }))
            };
          }
        )
      )
    ).then(function(data) {
      // Generate an object of child database names and their keys
      var child_db_secrets = {};
      Object.values(data).map(function(element){
        return child_db_secrets[element.db] = element.secret;
      });
      console.log("---------------- Child database secrets --------------");
      console.log(child_db_secrets);
      console.log("------------------------------------------------------");
    });
  } else {
    console.log("------------------ Parent database -------------------");
    console.log("The parent database does not exists");
    console.log("------------------------------------------------------");
  }
}).catch(function(error){
  console.log("----------------- Client instantiation ----------------");
  console.log("Fix by using the correct FAUNADB ADMIN SECRET from your dashboard");
  console.log("-------------------------------------------------------");
});
