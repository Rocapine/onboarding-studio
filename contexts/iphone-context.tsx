import React, { createContext, useContext, useState, ReactNode } from 'react';
import { IPhoneModel } from '../components/iPhone';

interface IPhoneContextType {
  iphoneModel: IPhoneModel;
  setIphoneModel: (model: IPhoneModel) => void;
  Dimensions: () => { width: number; height: number };
  getSafeAreaInset: () => { top: number; bottom: number; left: number; right: number };
}

const IPhoneContext = createContext<IPhoneContextType | undefined>(undefined);

// Create a provider component
export const IPhoneProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [iphoneModel, setIphoneModel] = useState<IPhoneModel>(IPhoneModel.iPhone15);

  const Dimensions = () => {
    // Example implementation, replace with actual logic
    return { width: 375, height: 812 };
  };

  const getSafeAreaInset = () => {
    // Example implementation, replace with actual logic
    return { top: 44, bottom: 34, left: 0, right: 0 };
  };

  return (
    <IPhoneContext.Provider value={{ iphoneModel, setIphoneModel, Dimensions, getSafeAreaInset }}>
      {children}
    </IPhoneContext.Provider>
  );
};

// Custom hook to use the IPhoneContext
export const useIPhoneContext = (): IPhoneContextType => {
  const context = useContext(IPhoneContext);
  if (!context) {
    throw new Error('useIPhoneContext must be used within an IPhoneProvider');
  }
  return context;
};

