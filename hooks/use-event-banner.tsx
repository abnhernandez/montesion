import { useEffect } from 'react';

export function useEventBanner(bannerId: string, onShow: () => void) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const shown = localStorage.getItem(`banner_${bannerId}`);
      if (!shown) {
        onShow();
        localStorage.setItem(`banner_${bannerId}`, 'shown');
      }
    }
  }, [bannerId, onShow]);
}
