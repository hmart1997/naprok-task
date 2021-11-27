import { Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import UserFilter from "../components/UserFilter";
import { Nationality, User } from "../types/user";
import getUsers from "../utilities/utilities";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: theme.spacing(20),
  },
  title: {
    marginBottom: theme.spacing(8),
  },
}));

export default function MainPage() {
  const classes = useStyles();
  const [users, setUsers] = useState<User[] | undefined>(undefined);

  useEffect(() => {
    const gender = localStorage.getItem("gender");
    const natinalities = localStorage.getItem("checkedNatinalities")?.split(",") as Nationality[];

    (async () => {
      const result = await getUsers({
        ...(gender === "male" || gender === "female" ? { gender } : {}),
        natinalities,
      });
      setUsers(result);
    })();
  }, []);

  return (
    <>
      <Typography variant="h1" align="center" className={classes.title}>
        Filter users task
      </Typography>
      <Grid container justifyContent="center">
        <UserFilter setUsers={setUsers} />
      </Grid>
      <Grid container justifyContent="center" spacing={5} className={classes.mainContainer}>
        {users?.map((user) => (
          <Grid item xs={3} key={user.email}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
