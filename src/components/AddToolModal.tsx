import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Link2, Type, Smile, Loader2, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tool, CATEGORIES, EMOJI_OPTIONS, ToolCategory } from '@/types/tool';
import { useMetaFetch } from '@/hooks/useMetaFetch';

interface AddToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tool: Omit<Tool, 'id' | 'createdAt'>) => void;
  editingTool?: Tool | null;
}

export const AddToolModal = ({ isOpen, onClose, onSave, editingTool }: AddToolModalProps) => {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ToolCategory>('production');
  const [emoji, setEmoji] = useState('');
  const [favicon, setFavicon] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { fetchMeta, isLoading } = useMetaFetch();

  useEffect(() => {
    if (editingTool) {
      setUrl(editingTool.url);
      setName(editingTool.name);
      setDescription(editingTool.description || '');
      setCategory(editingTool.category);
      setEmoji(editingTool.emoji || '');
      setFavicon(editingTool.favicon || '');
      setThumbnail(editingTool.thumbnail || '');
    } else {
      resetForm();
    }
  }, [editingTool, isOpen]);

  const resetForm = () => {
    setUrl('');
    setName('');
    setDescription('');
    setCategory('production');
    setEmoji('');
    setFavicon('');
    setThumbnail('');
    setShowEmojiPicker(false);
  };

  const handleUrlBlur = async () => {
    if (!url.trim()) return;
    
    const meta = await fetchMeta(url);
    if (meta.title && !name) setName(meta.title);
    if (meta.description && !description) setDescription(meta.description);
    if (meta.favicon) setFavicon(meta.favicon);
    if (meta.thumbnail) setThumbnail(meta.thumbnail);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim() || !name.trim()) return;

    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    onSave({
      url: normalizedUrl,
      name: name.trim(),
      description: description.trim() || undefined,
      category,
      emoji: emoji || undefined,
      favicon: favicon || undefined,
      thumbnail: thumbnail || undefined,
    });

    onClose();
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-0 rounded-3xl max-w-lg p-0 overflow-hidden">
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              {editingTool ? 'Editar Ferramenta' : 'Nova Ferramenta'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {/* URL Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Link2 className="w-4 h-4 text-muted-foreground" />
                URL da Ferramenta
              </label>
              <div className="relative">
                <Input
                  type="url"
                  placeholder="https://exemplo.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onBlur={handleUrlBlur}
                  className="rounded-xl bg-secondary/50 border-0 focus-visible:ring-2 focus-visible:ring-primary/50"
                  required
                />
                {isLoading && (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-primary" />
                )}
              </div>
            </div>

            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Type className="w-4 h-4 text-muted-foreground" />
                Nome Personalizado
              </label>
              <Input
                type="text"
                placeholder="Minha Ferramenta"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl bg-secondary/50 border-0 focus-visible:ring-2 focus-visible:ring-primary/50"
                required
              />
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Descrição (opcional)
              </label>
              <Textarea
                placeholder="Uma breve descrição da ferramenta..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-xl bg-secondary/50 border-0 focus-visible:ring-2 focus-visible:ring-primary/50 resize-none"
                rows={2}
              />
            </div>

            {/* Category & Emoji Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Categoria</label>
                <Select value={category} onValueChange={(v) => setCategory(v as ToolCategory)}>
                  <SelectTrigger className="rounded-xl bg-secondary/50 border-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.emoji} {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Smile className="w-4 h-4 text-muted-foreground" />
                  Ícone
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="w-full h-10 rounded-xl bg-secondary/50 flex items-center justify-center text-xl hover:bg-secondary transition-colors"
                  >
                    {emoji || '🔧'}
                  </button>
                  <AnimatePresence>
                    {showEmojiPicker && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full mt-2 right-0 z-50 p-3 glass-card rounded-2xl grid grid-cols-6 gap-2"
                      >
                        {EMOJI_OPTIONS.map((e) => (
                          <button
                            key={e}
                            type="button"
                            onClick={() => {
                              setEmoji(e);
                              setShowEmojiPicker(false);
                            }}
                            className="w-8 h-8 flex items-center justify-center text-lg hover:bg-secondary rounded-lg transition-colors"
                          >
                            {e}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="flex-1 rounded-xl"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={!url.trim() || !name.trim()}
                className="flex-1 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-glow"
              >
                {editingTool ? 'Salvar Alterações' : 'Adicionar Ferramenta'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
