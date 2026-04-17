let debounceTimer: any;

export const debounce = (callback: (text: string) => void, delay = 500) => {
  return (text: string) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(() => {
      callback(text);
    }, delay);
  };
};