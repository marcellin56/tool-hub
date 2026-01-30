import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen } from 'lucide-react';
import { Tool } from '@/types/tool';
import { ToolCard } from './ToolCard';

interface ToolGridProps {
  tools: Tool[];
  onOpenTool: (tool: Tool) => void;
  onEditTool: (tool: Tool) => void;
  onDeleteTool: (toolId: string) => void;
}

export const ToolGrid = ({ tools, onOpenTool, onEditTool, onDeleteTool }: ToolGridProps) => {
  if (tools.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card rounded-3xl p-12 text-center"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-secondary/50 flex items-center justify-center">
          <FolderOpen className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Nenhuma ferramenta encontrada
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Clique no botão "Adicionar" para cadastrar sua primeira ferramenta e começar a organizar seu workspace.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
    >
      <AnimatePresence mode="popLayout">
        {tools.map((tool, index) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            index={index}
            onOpen={() => onOpenTool(tool)}
            onEdit={() => onEditTool(tool)}
            onDelete={() => onDeleteTool(tool.id)}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
