import { type FormEvent, useState } from "react";
import Toast, { ToastType } from "../toasts/Toast";

export default function ContactForm() {
  const [responseMessage, setResponseMessage] = useState("");

  const onCancel = (timer = 0) => {
    const modal = document.getElementById(
      "contact_modal",
    ) as HTMLDialogElement | null;

    setTimeout(() => {
      setResponseMessage("");
      modal?.close?.();
    }, timer);
  };

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch("/api/contact", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.message) {
      setResponseMessage(data.message);
      (e.target as HTMLFormElement).reset();
      onCancel(500);
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
            className="input input-bordered w-full"
            required
          />
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
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="message" className="label">
            <span className="label-text">Your Message</span>
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Your message..."
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>
        <div className="modal-action flex flex-col items-end">
          <div className="flex gap-2">
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
            <button className="btn" type="button" onClick={() => onCancel()}>
              Close
            </button>
          </div>
        </div>
      </form>
      {responseMessage && (
        <Toast type={ToastType.SUCCESS}>{responseMessage}</Toast>
      )}
    </>
  );
}
