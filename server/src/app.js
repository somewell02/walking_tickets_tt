const http = require("http");
const TicketController = require("./controllers/ticket-controller");

const hostname = "localhost";
const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }

    const url = req.url.split("?")[0];
    const params = Object.fromEntries(new URLSearchParams(req.url.split("?")[1]));

    if (url === "/api/tickets" && req.method === "GET") {
        const tickets = await new TicketController().getTickets();
        res.writeHead(200, headers);
        res.end(JSON.stringify(tickets));
    } else if (url === "/api/tickets/delete") {
        const result = await new TicketController().deleteTicket(params.id);
        res.writeHead(200, headers);
        res.end(JSON.stringify(result));
    } else {
        res.writeHead(404, headers);
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
});

