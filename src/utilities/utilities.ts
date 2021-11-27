import queryString from "query-string";
import { User } from "../types/user";

const REQUESTED_USERS = 15;

const REQUESTED_FIELDS = {
  results: REQUESTED_USERS,
  inc: "gender,email,dob,name,picture,nat",
};

const url = new URL(`https://randomuser.me/api/`);

export default async function getUsers(): Promise<User[]> {
  url.search = new URLSearchParams(queryString.stringify(REQUESTED_FIELDS)).toString();
  const users: User[] = (
    await (
      await fetch(url.toString(), {
        method: "GET",
      })
    ).json()
  ).results;
  return users;
}
