import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Moon, Sun, Grid3X3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CATEGORIES, ToolCategory } from '@/types/tool';

interface HeaderProps {
  activeCategory: ToolCategory;
  onCategoryChange: (category: ToolCategory) => void;
  onAddClick: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header = ({
  activeCategory,
  onCategoryChange,
  onAddClick,
  isDarkMode,
  onToggleDarkMode,
}: HeaderProps) => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card sticky top-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
            <Grid3X3 className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Dashboard Hub</h1>
            <p className="text-xs text-muted-foreground">Gerencie suas ferramentas</p>
          </div>
        </motion.div>

        {/* Category Pills */}
        <nav className="flex items-center gap-2 flex-wrap justify-center">
          {CATEGORIES.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`pill-button ${
                activeCategory === category.id 
                  ? 'pill-button-active' 
                  : 'pill-button-inactive'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-1.5">{category.emoji}</span>
              {category.label}
            </motion.button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <motion.button
            onClick={onToggleDarkMode}
            className="p-2.5 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-foreground" />
            ) : (
              <Moon className="w-5 h-5 text-foreground" />
            )}
          </motion.button>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={onAddClick}
              className="rounded-full px-5 py-2.5 bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-glow font-medium"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};
