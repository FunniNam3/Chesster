import { useEffect, useState } from "react";
import type { Profile } from "../../App";
import { supabase } from "../../supabase-client";
import { Navigate, useNavigate } from "react-router-dom";

export function GameLobby({ profile }: { profile: Profile | null }) {
  const nav = useNavigate();
  useEffect(() => {
    if (profile?.currentGame) {
      nav("/play/" + profile?.currentGame);
    }
  }, []);

  const [isWhite, setIsWhite] = useState(true);
  const createGame = async () => {
    if (!profile) {
      return;
    }
    const { data, error } = await supabase
      .from("games")
      .insert({
        white_player: isWhite ? profile.id : null,
        black_player: isWhite ? null : profile.id,
      })
      .select()
      .single();
    if (error) {
      console.error(error);
    } else {
      await supabase
        .from("profiles")
        .update({ currentGame: data.id })
        .eq("id", profile.id);
      nav("/play/" + data.id);
    }
  };

  return (
    <div>
      {!profile && <Navigate to="/Auth" />}
      <button onClick={() => setIsWhite(!isWhite)}>
        Playing White: {String(isWhite)}
      </button>
      {profile && <button onClick={createGame}>HELLO</button>}
    </div>
  );
}
