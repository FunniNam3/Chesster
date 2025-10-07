import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styles, type Profile } from "../../App";
import { supabase } from "../../supabase-client";

export function ProfilePage({
  currentProfile,
}: {
  currentProfile: Profile | null;
}) {
  const { username } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editing, setEditing] = useState<Boolean>(false);
  const [newDisplayName, setNewDisplayName] = useState("");

  const fetchProfile = async () => {
    const { error, data } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", username)
      .single();
    if (error) {
      console.error("Error fetching username: ", error.message);
      return;
    }
    setProfile(data);
  };

  const updateProfile = async (profile: Profile) => {
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: newDisplayName })
      .eq("id", profile.id)
      .eq("username", profile.username);

    if (error) {
      console.error("Error updating task: ", error.message);
      return;
    }

    setNewDisplayName("");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      <div style={styles.container}>
        {profile ? (
          <>
            <h1>Display Name: {profile.display_name}</h1>
            <h1>Username: {profile.username}</h1>
            {currentProfile?.id == profile.id && (
              <button
                onClick={() => setEditing(!editing)}
                style={{ padding: "0.5rem 1rem" }}
              >
                Edit
              </button>
            )}
            {editing && (
              <form
                style={{
                  margin: "5vmin",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  width: "30vw",
                  gap: "1vh",
                }}
                onSubmit={() => {
                  if (currentProfile) {
                    updateProfile(currentProfile);
                  }
                }}
              >
                <h3>Set New Display name</h3>
                <input
                  type="text"
                  placeholder="Set New Display Name"
                  value={newDisplayName}
                  onChange={(e) => {
                    setNewDisplayName(e.target.value);
                  }}
                />
                <button type="submit" style={{ padding: "0.5rem 1rem" }}>
                  Change Display Name
                </button>
              </form>
            )}
          </>
        ) : (
          <h1>User does not exist</h1>
        )}
      </div>
    </div>
  );
}
