import { useState, type ChangeEvent } from "react";
interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export default function Learning() {
  const [data, setData] = useState<User | null>(null);
  //change handler
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ [e.target.name]: e.target.value, ...prev }));
  };
  return (
    <div>
      <label>
        <input
          onChange={changeHandler}
          name="name"
          type="text"
          value={data?.name}
        />
      </label>
      <label>
        <input
          onChange={changeHandler}
          name="email"
          type="text"
          value={data?.email}
        />
      </label>
      <label>
        <input
          onChange={changeHandler}
          name="password"
          type="text"
          value={data?.password}
        />
      </label>
      <label>
        <input
          onChange={changeHandler}
          name="confirmPassword"
          type="text"
          value={data?.confirmPassword}
        />
      </label>
    </div>
  );
}
