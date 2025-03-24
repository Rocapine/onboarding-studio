import { View } from '@tamagui/core';
import { ToastViewport } from "@tamagui/toast";
import EditPageForm from '../layout/EditPageForm';
import MobileScreenPreview from "../layout/MobileScreenPreview";
import StepsList from '../layout/StepsList';
import { OfflineStepsProvider } from '@/contexts/steps-context';
import { CurrentToast } from '@/components/CurrentToast';

export default function Offline() {
  return (
    <OfflineStepsProvider>
      <View backgroundColor={"$background"} flex={1} flexDirection="row">
        <ToastViewport />
        <CurrentToast />
        <StepsList />
        <MobileScreenPreview />
        <EditPageForm />
      </View>
    </OfflineStepsProvider>
  );
}

