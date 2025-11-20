// submit.js

import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
    const { region, description } = req.body;

    // چک کردن مقادیر ورودی
    if (!region || !description) {
      return res.status(400).json({ error: "Both fields are required" });
    }

    // اتصال به supabase
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE
    );

    // درج در دیتابیس
    const { data, error } = await supabase
      .from('regions')
      .insert([{ region, description }]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ success: true, data });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
