import React from 'react';
import { View, Spinner, Tooltip, TooltipSimple } from 'tamagui';
import { Check, AlertCircle, RefreshCw } from '@tamagui/lucide-icons';

type SyncStatusProps = {
  syncStatus: 'idle' | 'pending' | 'error' | 'success';
  size?: number;
};

export const SyncStatus = ({
  syncStatus,
  size = 18
}: SyncStatusProps) => {
  const getStatusColor = () => {
    switch (syncStatus) {
      case 'idle': return '#999';
      case 'pending': return '#3498db';
      case 'error': return '#e74c3c';
      case 'success': return '#2ecc71';
    }
  };

  const getStatusText = () => {
    switch (syncStatus) {
      case 'idle': return 'Idle';
      case 'pending': return 'Syncing...';
      case 'error': return 'Sync failed';
      case 'success': return 'Sync complete';
    }
  };

  const renderIcon = () => {
    switch (syncStatus) {
      case 'idle':
        return <RefreshCw size={size} color={getStatusColor()} />;
      case 'pending':
        return <Spinner size="small" color={getStatusColor()} />;
      case 'error':
        return <AlertCircle size={size} color={getStatusColor()} />;
      case 'success':
        return <Check size={size} color={getStatusColor()} />;
    }
  };

  return (
    <TooltipSimple label={getStatusText()} placement="top">
      <View cursor="pointer">
        {renderIcon()}
      </View>
    </TooltipSimple>
  );
};