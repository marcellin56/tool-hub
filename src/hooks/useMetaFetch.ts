import { useState, useCallback } from 'react';

interface MetaData {
  title?: string;
  description?: string;
  favicon?: string;
  thumbnail?: string;
}

export const useMetaFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMeta = useCallback(async (url: string): Promise<MetaData> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Normalize URL
      let normalizedUrl = url.trim();
      if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
        normalizedUrl = `https://${normalizedUrl}`;
      }

      // Extract domain for favicon
      const urlObj = new URL(normalizedUrl);
      const domain = urlObj.hostname;
      
      // Use Google's favicon service as fallback
      const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

      // Try microlink API for rich metadata
      const microlinkUrl = `https://api.microlink.io?url=${encodeURIComponent(normalizedUrl)}`;
      
      const response = await fetch(microlinkUrl);
      const data = await response.json();

      if (data.status === 'success' && data.data) {
        return {
          title: data.data.title || domain,
          description: data.data.description || '',
          favicon: data.data.logo?.url || favicon,
          thumbnail: data.data.image?.url || data.data.screenshot?.url,
        };
      }

      // Fallback if microlink fails
      return {
        title: domain,
        favicon,
      };
    } catch (err) {
      console.error('Error fetching meta:', err);
      setError('Não foi possível obter informações da URL');
      
      // Return basic info on error
      try {
        const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
        return {
          title: urlObj.hostname,
          favicon: `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=64`,
        };
      } catch {
        return {};
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { fetchMeta, isLoading, error };
};
