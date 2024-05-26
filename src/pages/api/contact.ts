import type { APIRoute } from "astro";

// IF A ROUTE SHOULD BE SSR NOT SSG
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 },
    );
  }

  // Do something with the data, then return a success response
  return new Response(
    JSON.stringify({
      message: "Successfully sent message!",
    }),
    { status: 200 },
  );
};
