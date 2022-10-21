const API_URL = "http://localhost:3000/api";

export const getTickets = async () => {
    const url = new URL(`${API_URL}/tickets`);
    const res = await fetch(url.toString());
    return await res.json();
}

export const deleteTicket = async id => {
    const url = new URL(`${API_URL}/tickets/delete`);
    url.searchParams.set("id", id);
    const res = await fetch(url.toString());
    return await res.json();
}