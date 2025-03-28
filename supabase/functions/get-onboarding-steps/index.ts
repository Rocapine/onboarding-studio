// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import {
  createClient,
  FunctionsFetchError,
  FunctionsHttpError,
  FunctionsRelayError,
} from "jsr:@supabase/supabase-js@2";

import type { Database } from "../../../generated/supabase.ts";

// Create Supabase client with service role key
const supabaseClient = createClient<Database>(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  {
    auth: { persistSession: false },
  }
);

Deno.serve(async (req) => {
  try {
    const url = new URL(req.url);
    const projectId = url.searchParams.get("projectId");
    const environment = url.searchParams.get("environment");
    const onboardingId = url.searchParams.get("onboardingId");

    if (!projectId) {
      throw new Error("projectId is required");
    }

    const { data: projectSteps, error } = await supabaseClient
      .from("projects")
      .select("steps")
      .eq("id", projectId)
      .single();

    if (error) throw error;

    if (!environment || environment !== "production") {
      if (onboardingId) {
        const { data: onboardingSteps, error } = await supabaseClient
          .from("onboardings")
          .select("steps")
          .eq("id", onboardingId)
          .single();

        if (error) {
          console.error(error);
        }

        if (onboardingSteps) {
          return new Response(JSON.stringify(onboardingSteps), {
            headers: {
              "Content-Type": "application/json",
              onboarding_id: onboardingId,
            },
          });
        }
      }
      const { data: latestOnboarding, error: latestOnboardingError } =
        await supabaseClient
          .from("onboardings")
          .select("id, steps")
          .eq("project_id", projectId)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

      if (latestOnboardingError) {
        console.error(latestOnboardingError);
      }

      if (latestOnboarding) {
        return new Response(JSON.stringify(latestOnboarding), {
          headers: {
            "Content-Type": "application/json",
            onboarding_id: latestOnboarding.id,
          },
        });
      }

      return new Response(JSON.stringify(projectSteps), {
        headers: {
          "Content-Type": "application/json",
          deployment_id: "no deployment found",
        },
      });
    }

    const { data: latestDeployment, error: deploymentError } =
      await supabaseClient
        .from("deployments")
        .select("*")
        .eq("project_id", projectId)
        .eq("environment", environment)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

    if (deploymentError) {
      console.error(deploymentError);
      return new Response(JSON.stringify(projectSteps), {
        headers: {
          "Content-Type": "application/json",
          deployment_id: "no deployment found",
        },
      });
    }

    return new Response(JSON.stringify(latestDeployment), {
      headers: {
        "Content-Type": "application/json",
        deployment_id: `${latestDeployment.id}`,
        created_at: latestDeployment.created_at,
      },
    });
  } catch (error) {
    if (error instanceof FunctionsHttpError) {
      const errorMessage = await error.context.json();
      console.log("Function returned an error", errorMessage);
      return new Response(JSON.stringify({ error: errorMessage }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    } else if (error instanceof FunctionsRelayError) {
      console.log("Relay error:", error.message);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    } else if (error instanceof FunctionsFetchError) {
      console.log("Fetch error:", error.message);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      console.log("Unknown error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return new Response(JSON.stringify({ error: errorMessage }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
});
