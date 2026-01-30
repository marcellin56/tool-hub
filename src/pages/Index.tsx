import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { ToolGrid } from '@/components/ToolGrid';
import { AddToolModal } from '@/components/AddToolModal';
import { Workspace } from '@/components/Workspace';
import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';
import { useTools } from '@/hooks/useTools';
import { Tool, ToolCategory } from '@/types/tool';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('dark-mode') === 'true';
    }
    return false;
  });
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [deletingTool, setDeletingTool] = useState<Tool | null>(null);

  const { tools, addTool, updateTool, deleteTool, searchTools } = useTools();

  // Apply dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('dark-mode', String(isDarkMode));
  }, [isDarkMode]);

  // Filter tools based on search and category
  const filteredTools = useMemo(() => {
    return searchTools(searchQuery, activeCategory);
  }, [searchTools, searchQuery, activeCategory]);

  const handleAddTool = (toolData: Omit<Tool, 'id' | 'createdAt'>) => {
    if (editingTool) {
      updateTool(editingTool.id, toolData);
    } else {
      addTool(toolData);
    }
    setEditingTool(null);
  };

  const handleEditTool = (tool: Tool) => {
    setEditingTool(tool);
    setIsModalOpen(true);
  };

  const handleDeleteTool = (toolId: string) => {
    const tool = tools.find(t => t.id === toolId);
    if (tool) {
      setDeletingTool(tool);
    }
  };

  const confirmDelete = () => {
    if (deletingTool) {
      deleteTool(deletingTool.id);
      setDeletingTool(null);
    }
  };

  // Show workspace if a tool is active
  if (activeTool) {
    return (
      <Workspace 
        tool={activeTool} 
        onBack={() => setActiveTool(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen">
      <Header
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onAddClick={() => {
          setEditingTool(null);
          setIsModalOpen(true);
        }}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            resultsCount={filteredTools.length}
          />
        </div>

        {/* Tool Grid */}
        <ToolGrid
          tools={filteredTools}
          onOpenTool={setActiveTool}
          onEditTool={handleEditTool}
          onDeleteTool={handleDeleteTool}
        />
      </main>

      {/* Modals */}
      <AnimatePresence>
        <AddToolModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTool(null);
          }}
          onSave={handleAddTool}
          editingTool={editingTool}
        />
        <DeleteConfirmModal
          isOpen={!!deletingTool}
          onClose={() => setDeletingTool(null)}
          onConfirm={confirmDelete}
          tool={deletingTool}
        />
      </AnimatePresence>
    </div>
  );
};

export default Index;
