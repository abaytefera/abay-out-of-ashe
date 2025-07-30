
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zkjgdrtmexmdmqvstwuz.supabase.co";
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpramdkcnRtZXhtZG1xdnN0d3V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4NjYzMzQsImV4cCI6MjA2NjQ0MjMzNH0.9lTMzA_ilOBBostaIEIif0LBQKvLbjZjAKysqnAYFak'; // Keep this safe in env vars in real projects
const supabase = createClient(supabaseUrl, supabaseKey);

export const upload = async (file) => {
  const filename = `${Date.now()}_${file.name}`;

  try {
    // Upload the file
    const { data, error: uploadError } = await supabase.storage
      .from("my-file")
      .upload(`file/${filename}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: urlData, error: urlError } = supabase.storage
      .from("my-file")
      .getPublicUrl(`file/${filename}`);

    if (urlError) throw urlError;

    return urlData.publicUrl;

  } catch (err) {
    console.error("File upload failed:", err.message);
    throw new Error(err.message);
  }
};
