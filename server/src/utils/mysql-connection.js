const mysqlConnection = require("promise-mysql");

class MysqlConnection {
    static connectionConfig = {
        host: "localhost",
        user: "root",
        password: "12345678",
        database: "welbex_test_task"
    }

    static getConnection = () => {
        return mysqlConnection.createConnection(this.connectionConfig);
    }
}

module.exports = MysqlConnection;