const API_BASE = "https://playground.4geeks.com/contact";
const AGENDA_SLUG = "cc_dune";

export const api = {
  getContacts: async () => {
    const res = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts`);
    if (res.status === 404) {
      console.warn("Agenda not found, creating one...");

      await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}`, { method: "POST" });

      const retryRes = await fetch(
        `${API_BASE}/agendas/${AGENDA_SLUG}/contacts`
      );
      if (!retryRes.ok)
        throw new Error("Failed to load contacts after creating agenda/");
      return (await retryRes.json()).contacts;
    }
    if (!res.ok) throw new Error("Failed to fetch contacts.");
    return (await res.json()).contacts;
  },

  addContact: async (contact) => {
    const res = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });
    return await res.json();
  },

  updateContact: async (id, contact) => {
    const res = await fetch(
      `${API_BASE}/agendas/${AGENDA_SLUG}/contacts/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      }
    );
    return await res.json();
  },

  deleteContact: async (id) => {
    await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts/${id}`, {
      method: "DELETE",
    });
  },
};
