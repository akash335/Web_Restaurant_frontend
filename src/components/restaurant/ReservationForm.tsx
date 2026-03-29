import { useMemo, useState } from "react";
import { postJSON } from "@/lib/api";

type ReservationResponse = {
  success: boolean;
  message?: string;
  reservationId?: string;
};

export function ReservationForm() {
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const minDate = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const form = e.currentTarget;
      const fd = new FormData(form);
      const payload = {
        name: String(fd.get("name") || "").trim(),
        email: String(fd.get("email") || "").trim(),
        phone: String(fd.get("phone") || "").trim(),
        date: String(fd.get("date") || "").trim(),
        time: String(fd.get("time") || "").trim(),
        guests: Number(fd.get("guests") || 0),
        specialRequests: String(fd.get("specialRequests") || "").trim(),
      };

      const data = await postJSON<ReservationResponse>("/api/reservations", payload);
      if (!data?.success) {
        throw new Error(data?.message || "Failed to send reservation.");
      }

      setSuccessMsg("Reservation request sent. Please check Inbox and Spam for confirmation.");
      form.reset();
    } catch (err: any) {
      setErrorMsg(err?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputBase =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 " +
    "focus:outline-none focus:ring-2 focus:ring-amber-400/60";

  return (
    <section id="reservation" className="mx-auto max-w-2xl px-4 md:px-6 py-12 md:py-16">
      <h2 className="text-3xl md:text-4xl font-extrabold text-amber-300 mb-6">
        Reserve a Table
      </h2>

      {errorMsg && (
        <div className="mb-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="mb-4 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {successMsg}
        </div>
      )}

      <form onSubmit={onSubmit} noValidate className="space-y-4" aria-label="Reservation form">
        <div>
          <label htmlFor="res-name" className="block text-sm text-white/80 mb-1">
            Full name
          </label>
          <input id="res-name" name="name" type="text" autoComplete="name" required placeholder="e.g., Akash Kumar" className={inputBase} />
        </div>

        <div>
          <label htmlFor="res-email" className="block text-sm text-white/80 mb-1">
            Email
          </label>
          <input id="res-email" name="email" type="email" autoComplete="email" inputMode="email" required placeholder="you@example.com" className={inputBase} />
        </div>

        <div>
          <label htmlFor="res-phone" className="block text-sm text-white/80 mb-1">
            Phone
          </label>
          <input id="res-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="10-digit number" className={inputBase} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="res-date" className="block text-sm text-white/80 mb-1">
              Date
            </label>
            <input id="res-date" name="date" type="date" min={minDate} autoComplete="off" required className={inputBase} />
          </div>

          <div>
            <label htmlFor="res-time" className="block text-sm text-white/80 mb-1">
              Time
            </label>
            <input id="res-time" name="time" type="time" autoComplete="off" required className={inputBase} />
          </div>
        </div>

        <div>
          <label htmlFor="res-guests" className="block text-sm text-white/80 mb-1">
            Guests
          </label>
          <input id="res-guests" name="guests" type="number" min={1} max={20} autoComplete="off" required placeholder="2" className={inputBase} />
        </div>

        <div>
          <label htmlFor="res-notes" className="block text-sm text-white/80 mb-1">
            Special requests (optional)
          </label>
          <textarea id="res-notes" name="specialRequests" rows={4} autoComplete="off" placeholder="Allergies, occasion, seating preference…" className={inputBase} />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-gradient-to-r from-amber-300 to-amber-500 text-black font-semibold py-3 hover:brightness-110 disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Send Reservation"}
        </button>
      </form>
    </section>
  );
}
