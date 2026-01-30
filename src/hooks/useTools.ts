import { useState, useEffect, useCallback } from 'react';
import { Tool, ToolCategory } from '@/types/tool';

const STORAGE_KEY = 'dashboard-hub-tools';

const getStoredTools = (): Tool[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveTools = (tools: Tool[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tools));
};

export const useTools = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTools(getStoredTools());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveTools(tools);
    }
  }, [tools, isLoaded]);

  const addTool = useCallback((tool: Omit<Tool, 'id' | 'createdAt'>) => {
    const newTool: Tool = {
      ...tool,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    setTools(prev => [...prev, newTool]);
    return newTool;
  }, []);

  const updateTool = useCallback((id: string, updates: Partial<Omit<Tool, 'id' | 'createdAt'>>) => {
    setTools(prev => prev.map(tool => 
      tool.id === id ? { ...tool, ...updates } : tool
    ));
  }, []);

  const deleteTool = useCallback((id: string) => {
    setTools(prev => prev.filter(tool => tool.id !== id));
  }, []);

  const getToolsByCategory = useCallback((category: ToolCategory) => {
    if (category === 'all') return tools;
    return tools.filter(tool => tool.category === category);
  }, [tools]);

  const searchTools = useCallback((query: string, category: ToolCategory = 'all') => {
    const filtered = category === 'all' ? tools : tools.filter(t => t.category === category);
    if (!query.trim()) return filtered;
    const lowerQuery = query.toLowerCase();
    return filtered.filter(tool => 
      tool.name.toLowerCase().includes(lowerQuery) ||
      tool.description?.toLowerCase().includes(lowerQuery)
    );
  }, [tools]);

  return {
    tools,
    isLoaded,
    addTool,
    updateTool,
    deleteTool,
    getToolsByCategory,
    searchTools,
  };
};
