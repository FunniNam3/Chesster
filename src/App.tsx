import { useEffect, useState } from "react";
import "./App.css";
// import TaskManager from "./components/Taskmanager/TaskManager.tsx";
import { Auth, SetUser } from "./components/Auth.tsx";
import { supabase } from "./supabase-client";
import type { Session } from "@supabase/supabase-js";
import Header from "./components/Header/Header.tsx";
import { Routes, Route } from "react-router-dom";
import { ProfilePage } from "./components/Profile/Profile.tsx";
import { Homepage } from "./components/Home.tsx";
import { Play } from "./components/Play/Play.tsx";

export interface Profile {
  id: string;
  username: string;
  display_name: string;
}

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    // console.log(currentSession.data.session);
    setSession(currentSession.data.session);
  };

  const fetchProfile = async () => {
    if (session) {
      const { error, data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();
      if (error) {
        console.error("Error fetching username: ", error.message);
        return;
      }
      setProfile(data);
    }
  };

  useEffect(() => {
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log("Fetching Profile");
    fetchProfile();
  }, [session]);

  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        justifyContent: "center",
        justifyItems: "center",
      }}
    >
      <Header
        profile={profile}
        setProfile={setProfile}
        setSession={setSession}
      />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/play"
          element={
            <>
              {session ? (
                <>
                  {profile ? (
                    <>
                      <Play />
                      {/* <TaskManager session={session} /> */}
                    </>
                  ) : (
                    <SetUser session={session} setProfile={setProfile} />
                  )}
                </>
              ) : (
                <Auth />
              )}
            </>
          }
        />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/profiles/:username"
          element={<ProfilePage currentProfile={profile} />}
        />
        <Route path="/*" element={<h1>GO AWAY THERE IS NOTHING HERE</h1>} />
      </Routes>
    </div>
  );
}

export default App;

export const styles: { container: React.CSSProperties } = {
  container: {
    borderRadius: "8px",
    border: "1vmin solid #1a1a1aff",
    padding: "0.6em 1.2em",
    backgroundColor: "#202020ff",
    justifyContent: "center",
    justifyItems: "center",
    width: "fit-content",
    height: "fit-content",
  },
};
