import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ subject, body, links }) {
  const { data, error } = await resend.emails.send({
    from: "Produktbevakare <onboarding@resend.dev>",
    to: [process.env.EMAIL_TO],
    subject,

    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; color: #333;">
        <h2>${subject}</h2>

        <p>${body.replace(/\n/g, "<br>")}</p>

        ${
          links.length
            ? `
              <h3>Hittade produkter</h3>
              <ul style="padding-left: 20px;">
                ${links
                  .map(
                    (link) => `
                      <li style="margin-bottom: 12px;">
                        <a href="${link.url}" style="color: #2563eb;">
                          ${link.title}
                        </a>
                        <br>
                        <span>${link.price} – ${link.source}</span>
                      </li>
                    `,
                  )
                  .join("")}
              </ul>
            `
            : ""
        }
      </div>
    `,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
