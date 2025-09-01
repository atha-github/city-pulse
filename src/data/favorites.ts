import { getItem, setItem } from '../utils/syncStorage';
import EventBus from '../utils/EventBus';

const KEY = 'favorites_v1';

type FavItem = {
  id: string;
  name?: string;
  date?: string | null;
  image?: string | null;
  raw?: any;
  addedAt?: string;
};

export const getFavorites = async (): Promise<FavItem[]> => {
  try {
    const raw = await getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as FavItem[];
    return Array.isArray(arr) ? arr : [];
  } catch (e) {
    console.error('getFavorites error', e);
    return [];
  }
};

export const saveFavorites = async (items: FavItem[]) => {
  try {
    await setItem(KEY, JSON.stringify(items));
    return true;
  } catch (e) {
    console.error('saveFavorites error', e);
    return false;
  }
};

function normalizeEvent(ev: any): FavItem {
  const id = ev.id || ev._id || (ev && ev.url) || Math.random().toString();
  const name = ev.name || ev.title || ev.info || '';
  const date = ev.dates?.start?.dateTime || ev.dates?.start?.localDate || null;
  const image = ev.images && ev.images.length ? ev.images[0].url : null;
  return { id, name, date, image, raw: ev, addedAt: new Date().toISOString() };
}

export const addFavorite = async (ev: any) => {
  try {
    const item = normalizeEvent(ev);
    const list = await getFavorites();
    const filtered = list.filter((i) => i.id !== item.id);
    filtered.unshift(item);
    const truncated = filtered.slice(0, 5);
    const removed = filtered.length > 5 ? filtered.slice(5) : [];
    await saveFavorites(truncated);
    EventBus.emit('favorites:changed', { action: 'add', item, removed });
    return { list: truncated, removed };
  } catch (e) {
    console.error('addFavorite error', e);
    return null;
  }
};

export const clearFavorites = async () => {
  try {
    await saveFavorites([]);
    EventBus.emit('favorites:changed', { action: 'clear' });
    return true;
  } catch (e) {
    console.error('clearFavorites error', e);
    return false;
  }
};

export const removeFavorite = async (id: string) => {
  try {
    const list = await getFavorites();
    const filtered = list.filter((i) => i.id !== id);
    await saveFavorites(filtered);
    EventBus.emit('favorites:changed', { action: 'remove', id });
    return filtered;
  } catch (e) {
    console.error('removeFavorite error', e);
    return null;
  }
};

export const isFavorite = async (id: string) => {
  try {
    const list = await getFavorites();
    return list.some((i) => i.id === id);
  } catch (e) {
    console.error('isFavorite error', e);
    return false;
  }
};

export default {
  getFavorites,
  addFavorite,
  removeFavorite,
  isFavorite,
  saveFavorites,
  clearFavorites,
};
