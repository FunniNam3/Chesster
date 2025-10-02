import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase-client";
import type { Profile } from "../../App";
import "./Header.css";

function Header({ profile }: { profile: Profile | null }) {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav
      style={{
        top: "0",
        margin: "auto 4vw",
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
          to="/play"
          style={{ color: "rgba(255, 255, 255, 0.87)", flexGrow: 1 }}
        >
          <h1>Play</h1>
        </Link>
      </div>
      {profile ? (
        <>
          <Link
            to={`/${profile.username}`}
            style={{ color: "rgba(255, 255, 255, 0.87)" }}
          >
            <h1>{profile?.display_name}</h1>
          </Link>
          <button onClick={logout} className="Headerbutton">
            <h3>Log Out</h3>
          </button>
        </>
      ) : (
        <h1>Sign In</h1>
      )}
    </nav>
  );
}

export default Header;
