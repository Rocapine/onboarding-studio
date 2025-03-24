import { useState } from "react";

const initialTeamMembers = [
  { id: "kdfjslkfjsdlkffskjls", email: "hildegarde@croute.lol" },
  { id: "qdskljqdflkqsjldkqjqsld", email: "philipe@croute.lol" },
];

export const useTeam = (teamId: string) => {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);

  const handleTeamMemberCreate = ({ email }: { email: string }) => {
    setTeamMembers((prevTeams) => {
      return [...prevTeams, { email, id: email + "skdfjslkfjslkdj" }];
    });
  };
  return { teamMembers, handleTeamMemberCreate };
};
