export const getTickets = async () => {
    const url = new URL("http://localhost:3000/api/tickets");
    const res = await fetch(url.toString());
    return await res.json();
}