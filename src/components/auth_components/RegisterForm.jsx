import { useState } from "react";
import { TextField, PasswordField, SelectField } from "./AuthField";
import SubmitButton from "./SubmitButton";
import FormError from "./FormError";
import { registerText, accountTypes } from "./authData";
import { registerUser } from "./authSession";

// Register = first name, last name, email, password, account type.
export default function RegisterForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    accountType: "consumer",
  });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // the input also has minLength, this is a second check in case the browser skips it
    if (formData.password.length < 8) {
      setError("Your roast key needs at least 8 characters.");
      return;
    }

    setSending(true);
    setError("");

    try {
      await registerUser(formData);
      onSuccess();
    } catch (err) {
      setError(err.message || "Could not create your account. Please try again.");
      setSending(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-head text-[26px] leading-[34px] font-normal text-[#ede0da]">{registerText.title}</h1>
        <p className="mt-1 font-body text-[13px] leading-5 text-[#d5c4b1]">{registerText.text}</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-1 flex flex-col gap-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <TextField
            label="First Name"
            id="register-first-name"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Sophea"
            autoComplete="given-name"
            required
          />
          <TextField
            label="Last Name"
            id="register-last-name"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Vanna"
            autoComplete="family-name"
            required
          />
        </div>

        <TextField
          label="Email"
          id="register-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="vanna@craft.kh"
          autoComplete="email"
          required
        />

        <PasswordField
          label="Create Roast Key"
          id="register-password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="At least 8 characters"
          autoComplete="new-password"
          minLength={8}
          required
        />

        <SelectField
          label="Account Type"
          id="register-account-type"
          name="accountType"
          value={formData.accountType}
          onChange={handleChange}
          options={accountTypes}
        />

        <SubmitButton sending={sending} text={registerText.button} sendingText={registerText.sending} />
        <FormError message={error} />
      </form>
    </div>
  );
}
