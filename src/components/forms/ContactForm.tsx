import { type FormEvent, useState } from "react";
import Toast, { ToastType } from "../toasts/Toast";
import type { ContactSchema } from "../../pages/api/contact";
import { ErrorText } from "./ErrorText";

type ValidationError = {
  [K in keyof ContactSchema]?: string;
};

export default function ContactForm() {
  const [response, setResponse] = useState<{
    message: string;
    type: ToastType | null;
  }>({
    message: "",
    type: null,
  });
  const [errors, setErrors] = useState<ValidationError>({});

  const onCancel = (timer = 0) => {
    const modal = document.getElementById(
      "contact_modal",
    ) as HTMLDialogElement | null;

    setTimeout(() => {
      setResponse({ message: "", type: null });
      setErrors({});
      modal?.close?.();
    }, timer);
  };

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setResponse({ message: data?.message, type: ToastType.SUCCESS });
        setErrors({});
        (e.target as HTMLFormElement).reset();
        onCancel(500);
      } else {
        setResponse({
          message: data?.message || "An error occurred. Please try again.",
          type: ToastType.ERROR,
        });
        if (data?.errors) {
          const validationErrors: ValidationError = {};
          for (const error of data.errors) {
            validationErrors[error.field as keyof ContactSchema] =
              error.message;
          }
          setErrors(validationErrors);
        }
      }
    } catch (error) {
    setResponse({
        message: "An error occurred. Please try again.",
        type: ToastType.ERROR,
      });
    }
  }

  return (
    <>
      <form onSubmit={submit} className="space-y-4">
        <div className="form-control">
          <label htmlFor="name" className="label">
            <span className="label-text">Your Name</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            className="input input-bordered w-full rounded-none"
            required
          />
          <ErrorText error={errors?.name} />
        </div>
        <div className="form-control">
          <label htmlFor="email" className="label">
            <span className="label-text">Your Email</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="email@example.com"
            className="input input-bordered w-full rounded-none"
            required
          />
          <ErrorText error={errors?.email} />
        </div>
        <div className="form-control">
          <label htmlFor="message" className="label">
            <span className="label-text">Your Message</span>
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Your message..."
            className="textarea textarea-bordered w-full rounded-none"
            required
          />
          <ErrorText error={errors?.message} />
        </div>
        <div className="modal-action flex flex-col items-end">
          <div className="flex gap-2">
            <button type="submit" className="btn btn-primary rounded-none">
              Send Message
            </button>
            <button
              className="btn rounded-none text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              type="button"
              onClick={() => onCancel()}
            >
              Close
            </button>
          </div>
        </div>
      </form>
      {response?.message && (
        <Toast type={response.type as ToastType}>{response.message}</Toast>
      )}
    </>
  );
}
