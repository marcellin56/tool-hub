import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultsCount: number;
}

export const SearchBar = ({ value, onChange, resultsCount }: SearchBarProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="relative max-w-md w-full"
    >
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar ferramentas..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-12 pr-12 py-3 rounded-2xl glass-card border-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/50"
        />
        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => onChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-secondary transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </motion.button>
        )}
      </div>
      {value && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-muted-foreground mt-2 ml-4"
        >
          {resultsCount} {resultsCount === 1 ? 'resultado' : 'resultados'} encontrado{resultsCount !== 1 ? 's' : ''}
        </motion.p>
      )}
    </motion.div>
  );
};
