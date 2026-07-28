import { useState, type ChangeEvent, type SubmitEvent } from "react";
interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
export default function Learning() {
  const [data, setData] = useState<User>(initialState);
  const [errors, setError] = useState(initialState);
  //change handler
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError((prev) => ({ ...prev, [name as keyof User]: "" }));
    setData((prev) => ({ ...prev, [name as keyof User]: value }));
  };
  const submitHandler = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    for (const key in data) {
      const value = data[key as keyof User];
      if (value.trim() === "") {
        setError((prev) => ({
          ...prev,
          [key]:
            key !== "confirmPassword"
              ? "field required"
              : data.password !== data.confirmPassword
                ? "pasword must be same "
                : "",
        }));
      }
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label className="flex flex-col">
          Name
          <input
            className=" border border-white"
            onChange={changeHandler}
            name="name"
            type="text"
            value={data?.name}
          />
          <span className="text-red-500">{errors.name}</span>
        </label>
        <label className="flex flex-col ">
          Email
          <input
            className=" border border-white"
            onChange={changeHandler}
            name="email"
            type="text"
            value={data?.email}
          />
          <span className="text-red-500">{errors.email}</span>
        </label>
        <label className="flex flex-col  ">
          Password
          <input
            className=" border border-white"
            onChange={changeHandler}
            name="password"
            type="text"
            value={data?.password}
          />
          <span className="text-red-500">{errors.password}</span>
        </label>
        <label className="flex flex-col ">
          Confirm Password
          <input
            className=" border border-white"
            onChange={changeHandler}
            name="confirmPassword"
            type="text"
            value={data?.confirmPassword}
          />
          <span className="text-red-500">{errors.confirmPassword}</span>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
