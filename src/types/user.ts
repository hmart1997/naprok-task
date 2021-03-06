export type Nationality =
  | "AU"
  | "BR"
  | "CA"
  | "CH"
  | "DE"
  | "DK"
  | "ES"
  | "FI"
  | "FR"
  | "GB"
  | "IE"
  | "IR"
  | "NO"
  | "NL"
  | "NZ"
  | "TR"
  | "US";

export type Gender = "male" | "female";

export type User = {
  gender: Gender;
  name: {
    title: string;
    first: string;
    last: string;
  };
  nat: Nationality;
  email: string;
  dob: { date: Date; age: Number };
  picture: { large: string; medium: string; thumbnail: string };
};
