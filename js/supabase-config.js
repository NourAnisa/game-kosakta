/**
 * Supabase Cloud Realtime Configuration
 * Project: game-kosakta-multiplayer
 * Region: Singapore (ap-southeast-1)
 */
const SUPABASE_CONFIG = {
    url: "https://vmsmmueseewuxgqtaguf.supabase.co",
    anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtc21tdWVzZWV3dXhncXRhZ3VmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM4OTA1OTIsImV4cCI6MjEwOTQ2NjU5Mn0.2e7QsvYAFgYnebc4DdlqdXU6O2JFHDMGBCyj4gHqIy8"
};

let sbClient = null;

try {
    if (window.supabase && typeof window.supabase.createClient === "function") {
        sbClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
        console.log("⚡ Supabase Realtime Client Connected:", SUPABASE_CONFIG.url);
    }
} catch (e) {
    console.warn("Supabase init warning:", e);
}

window.sbClient = sbClient;
