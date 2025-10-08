import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type SetStateAction,
} from "react";
import { supabase } from "../supabase-client";
import type { AuthError, Session } from "@supabase/supabase-js";
import { styles, type Profile } from "../App";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vPassword, setVpassword] = useState("");
  const [AuthError, setAuthError] = useState<AuthError>();

  const handleAuthSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignUp) {
      if (password !== vPassword) {
        console.error("Error signing up: Passwords do not match");
        return;
      }
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) {
        setAuthError(signUpError);
        console.error("Error signing up: ", signUpError.message);
      } else {
        navigate("/");
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        setAuthError(signInError);
        console.error("Error signing in: ", signInError.message);
      } else {
        navigate("/");
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem" }}>
      <div style={styles.container}>
        <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
        <p>{AuthError ? `Error: ${AuthError.message}` : ""}</p>
        <form
          onSubmit={handleAuthSubmit}
          style={{
            display: "flex",
            marginBottom: "1rem",
            flexDirection: "column",
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            style={{ marginBottom: "0.5rem", padding: "0.5rem" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            style={{ marginBottom: "0.5rem", padding: "0.5rem" }}
          />
          {isSignUp && (
            <input
              type="password"
              placeholder="Verify Password"
              value={vPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setVpassword(e.target.value)
              }
              style={{
                marginBottom: "0.5rem",
                padding: "0.5rem",
              }}
            />
          )}

          <button
            type="submit"
            style={{ padding: "0.5rem 1rem", marginRight: "0.5rem" }}
            disabled={isSignUp && (password !== vPassword || !password)}
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
    </div>
  );
};

export const SetUser = ({
  session,
  setProfile,
}: {
  session: Session;
  setProfile: React.Dispatch<SetStateAction<Profile | null>>;
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

    setProfile({
      id: session.user.id,
      username: username,
      display_name: username,
      currentGame: "",
    });

    useNavigate()("/");
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
