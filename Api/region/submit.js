import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://wgtxnpqhroxdrekmckxc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndndHhucHFIcm94ZHJla21ja3hjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyMDUxNzQsImV4cCI6MjA0Nzc4MTE3NH0.0dBy7ANYq_909bb0519OgrtmdFZHGFAMl30NyHkkJHE";

const client = createClient(supabaseUrl, supabaseKey);

export async function onRequestPost({ request }) {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const message = formData.get("message");

    const { error } = await client
      .from("submissions")
      .insert([{ name, message }]);

    if (error) {
      return new Response("خطا: " + error.message, { status: 500 });
    }

    return new Response("اطلاعات با موفقیت ذخیره شد");
  } catch (e) {
    return new Response("خطا در سرور: " + e.toString(), { status: 500 });
  }
}
