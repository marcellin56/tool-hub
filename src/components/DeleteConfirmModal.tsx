import { motion } from 'framer-motion';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tool } from '@/types/tool';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  tool: Tool | null;
}

export const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, tool }: DeleteConfirmModalProps) => {
  if (!tool) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-0 rounded-3xl max-w-md p-6">
        <div className="text-center">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-destructive/10 flex items-center justify-center"
          >
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </motion.div>
          
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground text-center">
              Excluir Ferramenta?
            </DialogTitle>
          </DialogHeader>

          <p className="text-muted-foreground mt-3 mb-6">
            Tem certeza que deseja excluir <strong className="text-foreground">{tool.name}</strong>? 
            Esta ação não pode ser desfeita.
          </p>

          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={onClose}
              className="flex-1 rounded-xl"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
