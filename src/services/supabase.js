import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://mylcsnmrcbdrphqobkdv.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15bGNzbm1yY2JkcnBocW9ia2R2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNjk1NTU2OCwiZXhwIjoyMDUyNTMxNTY4fQ.XUDCoRIASHnMGoTQ7V2bN9UofX98fysRoQIBLZ-pY2Y";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;