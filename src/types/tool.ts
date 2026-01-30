export interface Tool {
  id: string;
  name: string;
  url: string;
  description?: string;
  favicon?: string;
  thumbnail?: string;
  category: ToolCategory;
  emoji?: string;
  createdAt: number;
}

export type ToolCategory = 
  | 'all'
  | 'production'
  | 'marketing'
  | 'development'
  | 'design'
  | 'analytics'
  | 'communication';

export const CATEGORIES: { id: ToolCategory; label: string; emoji: string }[] = [
  { id: 'all', label: 'Todas', emoji: '🏠' },
  { id: 'production', label: 'Produção', emoji: '⚡' },
  { id: 'marketing', label: 'Marketing', emoji: '📢' },
  { id: 'development', label: 'Dev', emoji: '💻' },
  { id: 'design', label: 'Design', emoji: '🎨' },
  { id: 'analytics', label: 'Analytics', emoji: '📊' },
  { id: 'communication', label: 'Comunicação', emoji: '💬' },
];

export const EMOJI_OPTIONS = [
  '🔧', '⚡', '🚀', '💡', '📊', '🎯', '💻', '🎨', 
  '📱', '🌐', '📝', '📈', '🔒', '⚙️', '🗂️', '📋',
  '🎪', '🎭', '🎬', '📸', '🎵', '🎮', '🏆', '💎'
];
