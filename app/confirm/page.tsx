"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/app/lib/database/supabase";

export default function ConfirmPage() {
  const params = useSearchParams();
  const router = useRouter();

  const name = params.get("name");
  const email = params.get("email");
  const message = params.get("message");

  const handleSubmit = async () => {
    const { error } = await supabase.from("contacts").insert([
      {
        name,
        email,
        message,
      },
    ]);

    if (error) {
      console.error(error);
      alert("失敗");
      return;
    }

    router.push("/thanks");
  };

  return (
    <div>
      <h2>確認画面</h2>

      <p>名前: {name}</p>
      <p>メール: {email}</p>
      <p>メッセージ: {message}</p>

      <button onClick={() => router.back()}>戻る</button>
      <button onClick={handleSubmit}>送信</button>
    </div>
  );
}
