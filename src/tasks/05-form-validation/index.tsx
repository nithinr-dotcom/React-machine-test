import { useState } from "react";

// TODO (your task) — see SPEC.md for the full rules:
//   1. One `values` object in state (name, email, password, confirm), all controlled.
//   2. Track `touched` per field and a single `submitted` flag.
//   3. DERIVE `errors` from `values` on every render — do not store an errors object.
//   4. Show a field's error only once it's touched OR submit has been pressed.
//   5. On valid submit: preventDefault, render the collected values / a success message.
//   6. Cross-field rule: Confirm must re-validate when Password changes.
// No form libraries, no validation libraries, no useEffect for validation.

type Field = "name" | "email" | "password" | "confirm";

const EMPTY: Record<Field, string> = {
  name: "",
  email: "",
  password: "",
  confirm: "",
};

export default function FormValidation() {
  const [values, setValues] = useState<Record<Field, string>>(EMPTY);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <label>
          Name{" "}
          <input
            value={values.name}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </label>
      </div>

      <p>TODO: add email, password, confirm, validation and submit — see SPEC.md.</p>

      <button type="submit">Sign up</button>
    </form>
  );
}
