import { type FormEvent, useState } from "react";

export default function ContactForm() {
  const [responseMessage, setResponseMessage] = useState("");

  const onCancel = () => {
    const modal = document.getElementById(
      "my_modal_1",
    ) as HTMLDialogElement | null;

    setTimeout(() => {
      setResponseMessage("");
      modal?.close?.();
    }, 500);
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
      onCancel();
    }
  }

  return (
    // <form onSubmit={submit}>
    //   <label htmlFor="name">
    //     Name
    //     <input type="text" id="name" name="name" autoComplete="name" required />
    //   </label>
    //   <label htmlFor="email">
    //     Email
    //     <input
    //       type="email"
    //       id="email"
    //       name="email"
    //       autoComplete="email"
    //       required
    //     />
    //   </label>
    //   <label htmlFor="message">
    //     Message
    //     <textarea id="message" name="message" autoComplete="off" required />
    //   </label>
    //   <button>Send</button>
    //   {responseMessage && <p>{responseMessage}</p>}
    // </form>
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
        {responseMessage && (
          <p className="text-success self-end pb-2">{responseMessage}</p>
        )}
        <div className="flex gap-2">
          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
          <button className="btn" type="button" onClick={onCancel}>
            Close
          </button>
        </div>
      </div>
    </form>
  );
}
