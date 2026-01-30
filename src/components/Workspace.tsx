import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, AlertTriangle, RefreshCw } from 'lucide-react';
import { Tool } from '@/types/tool';
import { Button } from '@/components/ui/button';

interface WorkspaceProps {
  tool: Tool;
  onBack: () => void;
}

export const Workspace = ({ tool, onBack }: WorkspaceProps) => {
  const [iframeError, setIframeError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIframeError(false);
    setIsLoading(true);
  }, [tool.url]);

  const handleOpenExternal = () => {
    window.open(tool.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background flex flex-col"
    >
      {/* Toolbar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card px-4 py-3 flex items-center justify-between gap-4 m-4 rounded-2xl"
      >
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          
          <div className="h-6 w-px bg-border" />
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-secondary/50 flex items-center justify-center">
              {tool.emoji ? (
                <span className="text-sm">{tool.emoji}</span>
              ) : tool.favicon ? (
                <img src={tool.favicon} alt="" className="w-4 h-4" />
              ) : (
                <span className="text-sm">🔧</span>
              )}
            </div>
            <span className="font-medium text-foreground">{tool.name}</span>
            <span className="text-muted-foreground text-sm hidden sm:inline">
              • {new URL(tool.url).hostname}
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={handleOpenExternal}
          className="rounded-xl"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Abrir em Nova Aba</span>
        </Button>
      </motion.div>

      {/* Iframe Container */}
      <div className="flex-1 mx-4 mb-4 relative">
        {isLoading && !iframeError && (
          <div className="absolute inset-0 glass-card rounded-2xl flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <RefreshCw className="w-8 h-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Carregando...</p>
            </div>
          </div>
        )}

        {iframeError ? (
          <div className="h-full glass-card rounded-2xl flex items-center justify-center">
            <div className="text-center p-8 max-w-md">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Não foi possível carregar
              </h3>
              <p className="text-muted-foreground mb-6">
                Este site possui políticas de segurança (X-Frame-Options) que impedem 
                sua exibição em um iframe. Você pode abri-lo diretamente em uma nova aba.
              </p>
              <Button
                onClick={handleOpenExternal}
                className="rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Abrir em Nova Aba
              </Button>
            </div>
          </div>
        ) : (
          <iframe
            src={tool.url}
            className="w-full h-full rounded-2xl border-0 bg-card"
            title={tool.name}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIframeError(true);
              setIsLoading(false);
            }}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          />
        )}
      </div>
    </motion.div>
  );
};
