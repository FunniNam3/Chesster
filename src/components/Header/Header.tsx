import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase-client";
import type { Profile } from "../../App";
import "./Header.css";
import type { SetStateAction } from "react";
import type { Session } from "@supabase/supabase-js";

function Header({
  profile,
  setSession,
  setProfile,
}: {
  profile: Profile | null;
  setSession: React.Dispatch<SetStateAction<Session | null>>;
  setProfile: React.Dispatch<SetStateAction<Profile | null>>;
}) {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav
      style={{
        top: "0",
        width: "96vw",
        padding: "0 2vw",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <div style={{ flexGrow: 1, flexDirection: "row", display: "flex" }}>
        <Link
          to="/"
          style={{ color: "rgba(255, 255, 255, 0.87)", flexGrow: 1 }}
        >
          <h1>Home</h1>
        </Link>
        <Link
          to={profile ? "/play" : "/auth"}
          style={{ color: "rgba(255, 255, 255, 0.87)", flexGrow: 1 }}
        >
          <h1>Play</h1>
        </Link>
      </div>
      {profile ? (
        <>
          <Link
            to={`/profiles/${profile.username}`}
            style={{ color: "rgba(255, 255, 255, 0.87)" }}
          >
            <h1>{profile?.display_name}</h1>
          </Link>
          <button
            onClick={() => {
              logout();
              setProfile(null);
              setSession(null);
            }}
            className="Headerbutton"
          >
            <h3>Log Out</h3>
          </button>
        </>
      ) : (
        <Link to="/auth" style={{ color: "rgba(255, 255, 255, 0.87)" }}>
          <h1>Sign In</h1>
        </Link>
      )}
    </nav>
  );
}

export default Header;
