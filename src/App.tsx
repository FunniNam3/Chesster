import { useEffect, useState } from "react";
import "./App.css";
import TaskManager from "./components/TaskManager.tsx";
import { Auth, SetUser } from "./components/Auth.tsx";
import { supabase } from "./supabase-client";
import type { Session } from "@supabase/supabase-js";
import Header from "./components/Header.tsx";

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

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <section style={{ minHeight: "100vh" }}>
      <Header />
      {session ? (
        <>
          <button onClick={logout}>Log Out</button>
          {profile ? (
            <>
              <h1>{profile.username}</h1>
              <TaskManager session={session} />
            </>
          ) : (
            <SetUser session={session} setProfile={setProfile} />
          )}
        </>
      ) : (
        <Auth />
      )}
    </section>
  );
}

export default App;
