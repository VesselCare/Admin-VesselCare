import { useState, useEffect } from 'react';

// ==============================|| LOCAL STORAGE HOOKS ||============================== //

export default function useLocalStorage<ValueType>(key: string, defaultValue: ValueType) {
  const [value, setValue] = useState<ValueType>(() => {
    if (typeof window === 'undefined') {
      // Retorna o valor padrão se estiver no lado do servidor
      return defaultValue;
    }
    
    // Tenta obter o valor do localStorage
    const storedValue = localStorage.getItem(key);
    return storedValue === null ? defaultValue : JSON.parse(storedValue);
  });

  useEffect(() => {
    if (typeof window === 'undefined') return; // Certifica que o código só será executado no navegador
    
    const listener = (e: StorageEvent) => {
      if (e.storageArea === localStorage && e.key === key) {
        setValue(e.newValue ? JSON.parse(e.newValue) : e.newValue);
      }
    };

    window.addEventListener('storage', listener);

    return () => {
      window.removeEventListener('storage', listener);
    };
  }, [key, defaultValue]);

  const setValueInLocalStorage = (newValue: ValueType) => {
    setValue((currentValue: any) => {
      const result = typeof newValue === 'function' ? newValue(currentValue) : newValue;

      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(result));
      }

      return result;
    });
  };

  return [value, setValueInLocalStorage] as const;
}

