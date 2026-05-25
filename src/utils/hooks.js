import { useEffect } from 'react';

/**
 * Custom hook to lock/unlock body scroll
 * @param {boolean} isLocked - Whether scroll should be locked
 */
export const useScrollLock = (isLocked) => {
  useEffect(() => {
    document.body.style.overflow = isLocked ? 'hidden' : 'auto';
  }, [isLocked]);
};
