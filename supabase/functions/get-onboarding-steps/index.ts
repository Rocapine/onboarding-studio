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

    if (!projectId) {
      throw new Error("projectId is required");
    }
    if (!environment) {
      throw new Error("Environment is required");
    }

    const { data: projectSteps, error } = await supabaseClient
      .from("projects")
      .select("steps")
      .eq("id", projectId)
      .single();

    if (error) throw error;

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
      return new Response(JSON.stringify(projectSteps.steps), {
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
