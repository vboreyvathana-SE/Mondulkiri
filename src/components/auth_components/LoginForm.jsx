import { useState } from "react";
import { faAt, faKey } from "@fortawesome/free-solid-svg-icons";
import { TextField, PasswordField } from "./AuthField";
import SubmitButton from "./SubmitButton";
import FormError from "./FormError";
import { loginText } from "./authData";
import { loginUser } from "./authSession";

// Sign in = email + password, nothing else.
export default function LoginForm({ onSuccess }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  // one function for both inputs, it uses the input's "name" to know which one changed
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const result = await loginUser(formData);
      onSuccess(result);
    } catch (err) {
      setError(err.message || "Could not sign you in. Please try again.");
      setSending(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-head text-[26px] leading-[34px] font-normal text-[#ede0da]">{loginText.title}</h1>
        <p className="mt-1 font-body text-[13px] leading-5 text-[#d5c4b1]">{loginText.text}</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-1 flex flex-col gap-4">
        <TextField
          label="Guild ID / Email"
          id="login-email"
          name="email"
          type="email"
          icon={faAt}
          value={formData.email}
          onChange={handleChange}
          placeholder="cellar@mondulkiricoffee.kh"
          autoComplete="email"
          required
        />

        <PasswordField
          label="Roast Key / Password"
          id="login-password"
          name="password"
          icon={faKey}
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••••••"
          autoComplete="current-password"
          required
        />

        <SubmitButton sending={sending} text={loginText.button} sendingText={loginText.sending} />
        <FormError message={error} />
      </form>
    </div>
  );
}
