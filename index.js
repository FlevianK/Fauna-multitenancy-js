var faunadb = require("faunadb"),
  q = faunadb.query;
var client = new faunadb.Client({ secret:  'YOUR_FAUNADB_SECRET' });
var top_db =  ["production", "internal", "staging"];
var parent_db = "staging";
var child_db = ["people_department", "it_department"];
var top_db_role = "admin";
var child_db_role = "server";


// create Top level databases
var top_db_creation = client.query(
    q.Map(
      top_db,
      function(name) {
        return q.CreateDatabase({ name: name });
      }));

// Generate fauna databases array for the top level databases   
top_db_creation.then(function(data){
    var new_top_db = []
    top_db.forEach(function(value, index){
        return new_top_db.push(q.Database(value))
    });

    // generate keys for top level databases
    var top_db_key_creaction = client.query(
        q.Map(
        new_top_db,
        function(db) {
            return q.CreateKey({ role: top_db_role, database: db });
        }));

    top_db_key_creaction.then(function(data) {
        // Generate an object of top database names and their keys
        var top_db_secrets = {};
        var top_db_keys = []
        Object.values(data).forEach(function(element){
                top_db_keys.push(element.secret);
            });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
        top_db.forEach(function(key, index){
            top_db_secrets[key] = top_db_keys[index]
            });
        console.log("---------------Top database secrets-----------");
        console.log(top_db_secrets);
        console.log("----------------------------------------------");
        var parent_db_key;
        Object.keys(top_db_secrets).map(function(key, index) {
            if (key == parent_db){
                parent_db_key = top_db_secrets[key];
                }
            });
        
        // Create parent database instance
        var client = new faunadb.Client({ secret: parent_db_key });

        // Create child databases
        var child_db_creation = client.query(
            q.Map(
            child_db,
            function(name) {
                return q.CreateDatabase({ name: name });
              }));

        child_db_creation.then(function(data){
            // Generate fauna databases array for the low level databases 
            var new_child_db = []
            child_db.forEach(function(value, index){
                return new_child_db.push(q.Database(value))
                })

            // Generate child databases keys
            var child_db_key_creation = client.query(
                q.Map(
                new_child_db,
                function(db) {
                    return q.CreateKey({ role: child_db_role, database: db });
                    }));
                    
            child_db_key_creation.then(function(data) {
                // Generate an object of child database names and their keys
                var child_db_secrets = {};
                var child_db_keys = []
                Object.values(data).forEach(function(element){
                    child_db_keys.push(element.secret);
                    })
                child_db.forEach(function(key, index){
                    child_db_secrets[key] = child_db_keys[index]
                    });
                console.log("-------------Child database secrets-----------");
                console.log(child_db_secrets);
                console.log("----------------------------------------------"); 
                }); 
            });
        });
    });    
