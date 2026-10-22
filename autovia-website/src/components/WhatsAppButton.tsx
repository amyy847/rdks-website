import { contact } from "@/content/site";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${contact.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 items-center gap-2 rounded-full bg-[#25d366] px-4 font-semibold text-green shadow-[0_8px_24px_rgb(0_0_0/0.25)] transition-transform duration-400 ease-out-quint hover:-translate-y-0.5 md:bottom-8 md:right-8"
    >
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3.5 20l1.2-4.2A8.5 8.5 0 1 1 20.5 11.5Z"
        />
      </svg>
      <span className="hidden pr-1 md:inline">WhatsApp</span>
    </a>
  );
}
