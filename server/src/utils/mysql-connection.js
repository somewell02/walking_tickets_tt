const mysqlConnection = require("promise-mysql");

class MysqlConnection {
    static connectionConfig = {
        host: "localhost",
        user: "root",
        password: "12345678",
        database: "walking_tickets_tt"
    }

    static getConnection = () => {
        return mysqlConnection.createConnection(this.connectionConfig);
    }
}

module.exports = MysqlConnection;