import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://jdalkyifqhvscmepedok.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkYWxreWlmcWh2c2NtZXBlZG9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA1NjE4MjAsImV4cCI6MjAzNjEzNzgyMH0.VLMy-JPzK0etxDGWaMMj39wilNI8Vh5LJPC7UT6xiVo";
const supabase = createClient(supabaseUrl, supabaseKey);


export default supabase;
