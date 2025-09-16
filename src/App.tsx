import { useEffect, useState } from "react";
import "./App.css";
import TaskManager from "./components/TaskManager.tsx";
import { Auth, SetUser } from "./components/Auth.tsx";
import { supabase } from "./supabase-client";

function App() {
  const [session, setSession] = useState<any>(null);
  const [username, setUsername] = useState<string | null>("");

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
      setUsername(data.username);
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
    fetchProfile();
  }, [session]);

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      {session ? (
        <>
          <button onClick={logout}>Log Out</button>
          {username ? (
            <TaskManager session={session} />
          ) : (
            <SetUser session={session} setUser={setUsername} />
          )}
        </>
      ) : (
        <Auth />
      )}
    </>
  );
}

export default App;
