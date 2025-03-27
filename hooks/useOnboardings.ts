import { Tables } from "@/generated/supabase";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "../supabase.client";
import { Project } from "./useProjects";
import { debounce } from "tamagui";

export type Onboarding = Tables<"onboardings">;

const queryKey = "onboardings";

export const useOnboardings = (projectId: Project["id"]) => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*, onboardings(*, created_by(*))")
        .eq("id", projectId)
        .order("created_at", {
          ascending: false,
          referencedTable: "onboardings",
        })
        .single();

      if (error) {
        console.error(error);
        throw new Error("Network response was not ok", error);
      }
      return data;
    },
  });

  useEffect(() => {
    const onboardingSubscription = supabase
      .channel("onboardings")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "onboardings",
          filter: `project_id=eq.${projectId}`,
        },
        (payload) => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      void onboardingSubscription.unsubscribe();
    };
  }, [refetch, projectId]);

  const { onboardings, ...project } = data;

  const createNewOnboardingMutation = useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        throw new Error("User not authenticated");
      }
      const newOnboarding = {
        created_by: user.data.user.id,
        created_at: new Date().toISOString(),
        project_id: projectId,
        name,
        steps: project.steps,
      } satisfies Partial<Onboarding>;
      const { data, error } = await supabase
        .from("onboardings")
        .insert(newOnboarding);
      if (error) {
        console.error("Error creating onboardings:", error);
        throw new Error("Failed to create onboardings", error);
      }
      return data;
    },
  });

  const updateOnboardingNameMutation = useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      const { data, error } = await supabase
        .from("onboardings")
        .update({ name })
        .eq("id", id);
      if (error) {
        console.error("Error updating onboarding name:", error);
        throw new Error("Failed to update onboarding name", error);
      }
      return data;
    },
  });

  const updateOnboardingName = updateOnboardingNameMutation.mutate;
  const debouncedSyncSteps = debounce(updateOnboardingName, 500);

  const createNewOnboarding = createNewOnboardingMutation.mutate;
  return {
    onboardings,
    project,
    createNewOnboarding,
    updateOnboardingName,
  };
};
