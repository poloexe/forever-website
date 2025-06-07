import { useQuery } from "@tanstack/react-query";

export const useAdminUser = () => {
  return useQuery({
    queryKey: ["authAdmin"],
    queryFn: async () => {
      const res = await fetch(
        "https://forever-website-1mf9.onrender.com/api/auth/getadmin",
        { credentials: "include" }
      );
      const payload = await res.json();

      if (!res.ok) throw new Error(payload.msg || "Something went wrong");
      return payload;
    },
    retry: false,
  });
};
