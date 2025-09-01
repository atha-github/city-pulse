import api, { appConfig } from '../common';

// Ticketmaster Discovery API base endpoint
const TM_BASE = 'https://app.ticketmaster.com/discovery/v2';


function normalizeListResponse(tmResponse: any) {
  const events = tmResponse && tmResponse._embedded && Array.isArray(tmResponse._embedded.events)
    ? tmResponse._embedded.events
    : [];
  const page = tmResponse && tmResponse.page ? tmResponse.page : null;
  return { data: { data: events, page } };
}

function normalizeSingleResponse(tmResponse: any) {
  return { data: { data: tmResponse || null } };
}

/**
 * Search events using Ticketmaster Discovery API.
 * params: object of query params (keyword, city size, page)
 */
export const searchEvents = async (params: Record<string, any> = {}) => {
  const url = `${TM_BASE}/events.json`;
  const query = { apikey: appConfig.apiKey, ...params };
  const res = await api.get(url, { params: query });
  return normalizeListResponse(res.data);
};

/**
 * Convenience: getAllEvents uses a simple search and returns events array.
 */
export const getAllEvents = async () => {
  return searchEvents({ size: 20 });
};

/**
 * Get event details by Ticketmaster event id
 */
export const getEventById = async (id: string) => {
  const url = `${TM_BASE}/events/${encodeURIComponent(id)}.json`;
  const res = await api.get(url, { params: { apikey: appConfig.apiKey } });
  return normalizeSingleResponse(res.data);
};

export default {
  searchEvents,
  getAllEvents,
  getEventById,
};
