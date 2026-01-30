import { motion } from 'framer-motion';
import { ExternalLink, Pencil, Trash2, Globe } from 'lucide-react';
import { Tool } from '@/types/tool';

interface ToolCardProps {
  tool: Tool;
  index: number;
  onOpen: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const ToolCard = ({ tool, index, onOpen, onEdit, onDelete }: ToolCardProps) => {
  const thumbnailUrl = tool.thumbnail || 
    `https://api.microlink.io?url=${encodeURIComponent(tool.url)}&screenshot=true&meta=false&embed=screenshot.url`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="glass-card-hover rounded-3xl overflow-hidden group"
    >
      {/* Thumbnail Preview */}
      <div className="relative aspect-video bg-gradient-to-br from-secondary to-muted overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={tool.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Globe className="w-12 h-12 text-muted-foreground/30" />
        </div>
        
        {/* Overlay Actions */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent flex items-end justify-center pb-4 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onOpen}
            className="p-2.5 rounded-full bg-primary text-primary-foreground shadow-glow"
          >
            <ExternalLink className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onEdit}
            className="p-2.5 rounded-full bg-secondary text-foreground"
          >
            <Pencil className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onDelete}
            className="p-2.5 rounded-full bg-destructive text-destructive-foreground"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        <div className="flex items-start gap-3">
          {/* Favicon/Emoji */}
          <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {tool.emoji ? (
              <span className="text-xl">{tool.emoji}</span>
            ) : tool.favicon ? (
              <img 
                src={tool.favicon} 
                alt="" 
                className="w-6 h-6"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '🔧';
                }}
              />
            ) : (
              <span className="text-xl">🔧</span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{tool.name}</h3>
            {tool.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {tool.description}
              </p>
            )}
            <p className="text-xs text-muted-foreground/60 mt-2 truncate">
              {new URL(tool.url).hostname}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
