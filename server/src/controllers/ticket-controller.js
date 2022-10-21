const MysqlConnection = require("../utils/mysql-connection");

class TicketController {
    async getTickets() {
        const connection = await MysqlConnection.getConnection();

        const query = "SELECT * FROM tickets";
        const data = await connection.query(query);
        connection.end();

        return new Promise((resolve, _) => resolve(data));
    }

    async deleteTicket(id) {
        const connection = await MysqlConnection.getConnection();

        const query = `DELETE FROM tickets WHERE id=${id}`;
        const data = await connection.query(query);
        connection.end();

        return new Promise((resolve, _) => resolve(data));
    }
}

module.exports = TicketController;