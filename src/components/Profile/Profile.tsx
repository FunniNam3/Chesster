import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Profile } from "../../App";
import { supabase } from "../../supabase-client";

export function Profile() {
  const { userName } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);

  const fetchProfile = async () => {
    const { error, data } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", userName)
      .single();
    if (error) {
      console.error("Error fetching username: ", error.message);
      return;
    }
    setProfile(data);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      {profile ? (
        <>
          <h1>Username: {profile?.username}</h1>
          <h1>Display Name: {profile?.display_name}</h1>
        </>
      ) : (
        <h1>User does not exist</h1>
      )}
    </div>
  );
}
