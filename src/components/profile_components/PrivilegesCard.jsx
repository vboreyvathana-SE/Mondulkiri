import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";

// The three perks + the invitation link with a copy button.
export default function PrivilegesCard({ privileges }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!privileges.inviteLink) return;

    try {
      await navigator.clipboard.writeText(privileges.inviteLink);
      setCopied(true);
      setTimeout(function () {
        setCopied(false);
      }, 2000);
    } catch {
      // clipboard blocked by the browser: the link can still be selected by hand
    }
  }

  return (
    <div className="rounded-xl bg-[#211a17] p-6 shadow-lg">
      <h3 className="mb-4 font-label text-sm leading-[18px] font-semibold uppercase tracking-wider text-[#fcba5f]">
        {privileges.title}
      </h3>

      <div className="flex flex-col gap-2">
        {privileges.perks.length === 0 ? (
          <p className="font-body text-[12px] leading-[18px] text-[#d5c4b1]">
            No account privileges are recorded yet.
          </p>
        ) : privileges.perks.map((perk) => (
          <div
            key={perk.title}
            className="flex items-start gap-2 rounded p-1 transition-colors hover:bg-[#251e1b]"
          >
            <FontAwesomeIcon icon={perk.icon} className="mt-1 w-5 text-[16px] text-[#fcba5f]" />
            <div>
              <p className="font-head text-[15px] leading-6 font-semibold text-[#ede0da]">{perk.title}</p>
              <p className="font-body text-[12px] leading-[18px] text-[#d5c4b1]">{perk.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg bg-[#251e1b] p-4">
        <label
          htmlFor="invite-link"
          className="mb-1 block font-label text-[10px] leading-[14px] font-semibold uppercase tracking-wider text-[#9e8e7e]"
        >
          Guild Invitation Link
        </label>
        <div className="flex items-center gap-1">
          <input
            id="invite-link"
            type="text"
            readOnly
            value={privileges.inviteLink || "Not available"}
            className="w-full rounded bg-[#130d0a] px-2 py-1.5 font-label text-[11px] text-[#d5c4b2] outline-none select-all"
          />
          <button
            type="button"
            onClick={handleCopy}
            title="Copy invite link"
            aria-label={copied ? "Invite link copied" : "Copy invite link"}
            disabled={!privileges.inviteLink}
            className="cursor-pointer rounded bg-[#d99b43] p-1.5 text-[#563500] transition-colors hover:bg-[#fcba5f] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="w-4 text-[14px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
