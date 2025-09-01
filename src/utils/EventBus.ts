type Callback = (payload?: any) => void;

const listeners: Record<string, Callback[]> = {};

export const emit = (event: string, payload?: any) => {
  const ls = listeners[event];
  if (!ls || !ls.length) return;
  ls.forEach((cb) => {
    try { cb(payload); } catch (e) { /* swallow */ }
  });
};

export const subscribe = (event: string, cb: Callback) => {
  if (!listeners[event]) listeners[event] = [];
  listeners[event].push(cb);
  return () => {
    const idx = listeners[event].indexOf(cb);
    if (idx >= 0) listeners[event].splice(idx, 1);
  };
};

export default { emit, subscribe };
