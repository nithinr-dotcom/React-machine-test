import { useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";

// --- THE SHAPE IS THE LESSON ---
// One union of field names drives everything below. `values`, `touched` and `errors` are all
// `Record<Field, ...>`, so adding a 5th field is ONE edit here plus one <Row/> in the JSX —
// not five new useStates, five handlers and five error slots.
type Field = "name" | "email" | "password" | "confirm";

type Values = Record<Field, string>;
type Touched = Record<Field, boolean>;
type Errors = Record<Field, string>; // "" means valid

const EMPTY_VALUES: Values = { name: "", email: "", password: "", confirm: "" };
const NOT_TOUCHED: Touched = {
  name: false,
  email: false,
  password: false,
  confirm: false,
};

const LABELS: Record<Field, string> = {
  name: "Name",
  email: "Email",
  password: "Password",
  confirm: "Confirm password",
};

// something@something.tld — deliberately loose. The spec says "looks like an email"; a
// stricter regex rejects valid addresses and is a classic interview trap. Real apps confirm
// by sending a mail, not by regex.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// --- VALIDATION IS A PURE FUNCTION OF VALUES ---
// It lives at module scope, takes values, returns errors. No state, no `this`, no effect.
// That is what makes the errors DERIVED: there is no second copy of the truth to keep in
// sync, so it is impossible for an error to go stale.
function validate(values: Values): Errors {
  const errors: Errors = { name: "", email: "", password: "", confirm: "" };

  // Trim before checking: a name of all spaces is empty. Note we trim HERE, at validation
  // time, and never in onChange — trimming while typing makes it impossible to type a space.
  const name = values.name.trim();
  if (name === "") errors.name = "Name is required";
  else if (name.length < 2) errors.name = "Name must be at least 2 characters";

  const email = values.email.trim();
  if (email === "") errors.email = "Email is required";
  else if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address";

  // Password is NOT trimmed — spaces are legal password characters.
  const password = values.password;
  if (password === "") errors.password = "Password is required";
  else if (password.length < 8)
    errors.password = "Password must be at least 8 characters";
  else if (!/[a-zA-Z]/.test(password) || !/\d/.test(password))
    errors.password = "Password needs at least one letter and one digit";

  // --- THE CROSS-FIELD RULE ---
  // This is the whole reason errors must be derived. `confirm`'s error reads `values.password`
  // at render time, so editing Password automatically re-validates Confirm on the very next
  // render. If we stored errors in state and only updated the field being edited, Confirm
  // would keep a stale "valid" — the exact bug the spec calls out.
  if (values.confirm === "") errors.confirm = "Please confirm your password";
  else if (values.confirm !== values.password)
    errors.confirm = "Passwords do not match";

  return errors;
}

export default function FormValidation() {
  const [values, setValues] = useState<Values>(EMPTY_VALUES);

  // --- WHY BOTH `touched` AND `submitted` ---
  // touched  : per field, set on blur. Answers "has the user finished with this field yet?"
  //            Without it, every field screams red on first render before you type a letter.
  // submitted: one flag, set on the first submit attempt. Answers "has the user asked us to
  //            check everything?" Without it, a user who tabs straight to Submit without
  //            blurring anything gets a form that silently refuses to submit with no errors
  //            shown — nothing explains why.
  // Neither alone is enough. Show an error when EITHER is true.
  const [touched, setTouched] = useState<Touched>(NOT_TOUCHED);
  const [submitted, setSubmitted] = useState(false);

  // What we render after a successful submit. `null` = nothing submitted yet.
  const [result, setResult] = useState<Values | null>(null);

  // DERIVED, every render. Not state. No useEffect. No useMemo either — this is four regex
  // tests on a keystroke; memoizing it would cost more than it saves and would add a
  // dependency array to get wrong.
  const errors = validate(values);
  const isValid = Object.values(errors).every((message) => message === "");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Store the raw value verbatim. Normalising (trim/lowercase) while typing fights the
    // user; do it at validation and submit time instead.
    setValues((prev) => ({ ...prev, [name as Field]: value }));
    // NOTE what we do NOT do here: touch any error. Errors recompute themselves above.
    // "Submit-then-fix clears the error live" is free — nothing to wire up.
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name as Field]: true }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Flip submitted FIRST and unconditionally: on an invalid submit this is what reveals
    // every error at once, including fields the user never focused.
    setSubmitted(true);

    if (!isValid) {
      setResult(null);
      return; // nothing is submitted
    }
    setResult(values);
  };

  // A field's error is VISIBLE only once the user has finished with that field, or has asked
  // us to check the whole form. The error itself always exists — visibility is a separate
  // question from validity, and keeping them separate is what makes the timing controllable.
  const visibleError = (field: Field): string =>
    touched[field] || submitted ? errors[field] : "";

  return (
    <div>
      {/* noValidate turns off the browser's own bubbles so our messages are the only ones. */}
      <form onSubmit={handleSubmit} noValidate>
        {(Object.keys(LABELS) as Field[]).map((field) => {
          const message = visibleError(field);
          return (
            <div key={field}>
              <label className="flex flex-col">
                {LABELS[field]}
                <input
                  className="border border-white"
                  // `name` is what lets ONE handler serve every field. It must match the
                  // Field union — that is the contract the casts in the handlers rely on.
                  name={field}
                  type={
                    field === "password" || field === "confirm"
                      ? "password"
                      : "text"
                  }
                  // Controlled: value always comes from state, never from the DOM.
                  value={values[field]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // Baseline a11y: tie the message to the input so a screen reader hears it.
                  aria-invalid={message !== ""}
                  aria-describedby={message ? `${field}-error` : undefined}
                />
              </label>
              {/* Render the <span> only when there is something to say, so empty red boxes
                  don't reserve space on a clean first render. */}
              {message && (
                <span id={`${field}-error`} className="text-red-500">
                  {message}
                </span>
              )}
            </div>
          );
        })}

        <button type="submit">Sign up</button>
      </form>

      {/* There is no server. "Submitting" means showing what we collected. */}
      {result && (
        <div>
          <p>Signed up.</p>
          <ul>
            <li>Name: {result.name.trim()}</li>
            <li>Email: {result.email.trim()}</li>
            {/* Never echo the password back — shown here only to prove it was captured. */}
            <li>Password: {"•".repeat(result.password.length)}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
