import knex from "knex";

const mysqlOptions = {
    client: "mysql",
    connection:{
       host:'127.0.0.1',
       user:"root",
       password:"",
       database:"users",

}}
const sqliteOptions = {
    client:"sqlite3",
    connection:{
        filename:"./sqliteDatabase.sqlite"
    },
    useNullAsDefault:true
}


const database = knex(sqliteOptions)

try{
    let exists = await database.schema.hasTable("usernames")
    if(!exists){
        await database.schema.createTable("usernames",table => {
            table.primary("id");
            table.increments("id");
            table.string("user_name", 30).nullable(false)
            table.integer("age").nullable(false)
        })
    }
} catch(error){
    console.log(error)

}


export default database;