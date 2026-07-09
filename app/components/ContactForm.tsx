"use client";
import { useState } from "react";
import styles from "@/styles/components/form.module.scss";
import * as yup from "yup";
import { FormData } from "@/app/types/form";
import { contactSchema } from "@/app/lib/validation/contactSchema";

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const hasEmpty = Object.values(form).some((v) => !v.trim());
  const hasError = Object.values(errors).some((v) => v);
  const isDisabled = hasEmpty || hasError;

  const validate = async () => {
    try {
      await contactSchema.validate(form, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: Partial<FormData> = {};

        err.inner.forEach((e) => {
          if (e.path) newErrors[e.path as keyof FormData] = e.message;
        });

        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const field = name as keyof FormData;
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (await validate()) {
      alert("送信成功！");
      setForm({
        name: "",
        email: "",
        message: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <h2>お問い合わせ</h2>

      <label htmlFor="name">名前</label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="名前"
        value={form.name}
        onChange={handleChange}
      />
      {errors.name && <p className={styles.error}>{errors.name}</p>}

      <label htmlFor="email">メール</label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="メール"
        value={form.email}
        onChange={handleChange}
      />
      {errors.email && <p className={styles.error}>{errors.email}</p>}

      <label htmlFor="message">メッセージ</label>
      <textarea
        name="message"
        id="message"
        placeholder="メッセージ"
        value={form.message}
        onChange={handleChange}
      />
      {errors.message && <p className={styles.error}>{errors.message}</p>}

      <button type="submit" disabled={isDisabled}>
        送信
      </button>
    </form>
  );
}
