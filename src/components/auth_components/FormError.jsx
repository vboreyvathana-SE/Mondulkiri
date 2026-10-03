// Red message under the button when the login / register request fails.
export default function FormError({ message }) {
  if (!message) return null;

  return (
    <p role="alert" className="rounded-lg bg-[#93000a]/40 p-3 font-body text-[13px] leading-5 text-[#ffdad6]">
      {message}
    </p>
  );
}
