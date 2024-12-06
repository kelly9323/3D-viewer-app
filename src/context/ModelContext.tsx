import React, { createContext, useState, useContext } from 'react';
//centralize states management without passing props between compnents
interface ModelContextProps {
  modelUrl: string | null;
  fileExtension: string | null;
  setModelUrl: (url: string | null) => void;
  setFileExtension: (extension: string | null) => void;
}

const ModelContext = createContext<ModelContextProps | undefined>(undefined);

export const ModelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [fileExtension, setFileExtension] = useState<string | null>(null);

//makes state available for children wrapped inside
  return (
    <ModelContext.Provider value={{ modelUrl,fileExtension, setModelUrl,setFileExtension }}>
      {children}
    </ModelContext.Provider>
  );
};

export const useModelContext = () => {
  const context = useContext(ModelContext);
  if (!context) throw new Error('useModelContext is used inside ModelProvider');
  return context;
};
