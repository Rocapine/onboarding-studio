import { useState } from "react";

const initialTeams = [
  {
    name: "Sammy's team",
    id: "cskldjfskljflskjflskd",
    slug: "sammy",
  },
  {
    name: "Rocapine",
    id: "dkjfslkfjskjslkdfjsdfs",
    slug: "rocapine",
  },
];

export const useTeams = () => {
  const [teams, setTeams] = useState(initialTeams);
  const handleTeamCreate = ({
    teamName,
    teamSlug,
  }: {
    teamName: string;
    teamSlug: string;
  }) => {
    setTeams((prevTeams) => {
      return [
        ...prevTeams,
        { name: teamName, slug: teamSlug, id: teamSlug + "skdfjslkfjslkdj" },
      ];
    });
  };

  return { teams, handleTeamCreate };
};
