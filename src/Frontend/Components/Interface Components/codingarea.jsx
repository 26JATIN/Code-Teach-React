import React, { useState, useEffect } from 'react';
import { Folder, File, X, Plus, Save, Trash } from 'lucide-react';
import Editor from '@monaco-editor/react';

const CodingArea = ({ onClose }) => {
  const [files, setFiles] = useState(() => {
    const savedFiles = localStorage.getItem('codeFiles');
    return savedFiles ? JSON.parse(savedFiles) : [];
  });
  const [activeFile, setActiveFile] = useState(null);
  const [showNewFileDialog, setShowNewFileDialog] = useState(false);
  const [newFileName, setNewFileName] = useState('');

  useEffect(() => {
    localStorage.setItem('codeFiles', JSON.stringify(files));
  }, [files]);

  const handleCreateFile = () => {
    if (!newFileName) return;
    const newFile = {
      id: Date.now(),
      name: newFileName.includes('.') ? newFileName : `${newFileName}.js`,
      content: '',
      created: new Date().toISOString()
    };
    setFiles(prev => [...prev, newFile]);
    setActiveFile(newFile);
    setNewFileName('');
    setShowNewFileDialog(false);
  };

  const handleFileChange = (value) => {
    if (!activeFile) return;
    setFiles(prev => prev.map(f => 
      f.id === activeFile.id ? { ...f, content: value } : f
    ));
  };

  const handleDeleteFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    if (activeFile?.id === fileId) {
      setActiveFile(null);
    }
  };

  return (
    <div className="flex-1 flex h-full bg-gray-900">
      {/* File Explorer */}
      <div className="w-64 border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-gray-200 font-medium">Files</h2>
          <button
            onClick={() => setShowNewFileDialog(true)}
            className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400"
            title="New File"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {files.map(file => (
            <div
              key={file.id}
              onClick={() => setActiveFile(file)}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${
                activeFile?.id === file.id ? 'bg-gray-800' : 'hover:bg-gray-800/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <File size={16} className="text-gray-400" />
                <span className="text-gray-300 text-sm">{file.name}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteFile(file.id);
                }}
                className="p-1 rounded hover:bg-gray-700 text-gray-400"
              >
                <Trash size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-gray-200 font-medium">
            {activeFile ? activeFile.name : 'No file selected'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400"
            title="Close Editor"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1">
          {activeFile ? (
            <Editor
              height="100%"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={activeFile.content}
              onChange={handleFileChange}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                padding: { top: 16 }
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Select or create a file to start coding
            </div>
          )}
        </div>
      </div>

      {/* New File Dialog */}
      {showNewFileDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h3 className="text-gray-200 mb-4">Create New File</h3>
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="filename.js"
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 text-gray-200"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowNewFileDialog(false)}
                className="px-4 py-2 rounded bg-gray-700 text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFile}
                className="px-4 py-2 rounded bg-blue-600 text-white"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodingArea;
