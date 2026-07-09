import * as yup from "yup";
import { FormData } from "@/app/types/form";

export const contactSchema: yup.ObjectSchema<FormData> = yup.object({
  name: yup.string().required("名前を入力してください"),
  email: yup
    .string()
    .email("正しいメールアドレスを入力してください")
    .required("メールを入力してください"),
  message: yup.string().required("メッセージを入力してください"),
});
