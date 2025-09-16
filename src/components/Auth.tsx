import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type SetStateAction,
} from "react";
import { supabase } from "../supabase-client";
import type { Session } from "@supabase/supabase-js";

export const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuthSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignUp) {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) {
        console.error("Error signing up: ", signUpError.message);
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        console.error("Error signing in: ", signInError.message);
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem" }}>
      <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
      <form onSubmit={handleAuthSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />
        <button
          type="submit"
          style={{ padding: "0.5rem 1rem", marginRight: "0.5rem" }}
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>
      <button
        onClick={() => {
          setIsSignUp(!isSignUp);
        }}
        style={{ padding: "0.5rem 1rem" }}
      >
        {isSignUp ? "Switch to Sign In" : "Switch to Sign Up"}
      </button>
    </div>
  );
};

export const SetUser = ({
  session,
  setUser,
}: {
  session: Session;
  setUser: React.Dispatch<SetStateAction<string | null>>;
}) => {
  const [username, setUsername] = useState("");

  const handleUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase
      .from("profiles")
      .upsert(
        { id: session.user.id, username: username, display_name: username },
        { onConflict: "id" }
      );
    if (error) console.error(error);
    else console.log("Username updated!");

    setUser(username);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem" }}>
      <h2>Set Username</h2>
      <form onSubmit={handleUserSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />
        <button
          type="submit"
          style={{ padding: "0.5rem 1rem", marginRight: "0.5rem" }}
          disabled={!username}
        >
          Confirm
        </button>
      </form>
    </div>
  );
};
