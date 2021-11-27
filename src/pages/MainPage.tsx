import { Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import { User } from "../types/user";
import getUsers from "../utilities/utilities";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: theme.spacing(20),
  },
}));

export default function MainPage() {
  const classes = useStyles();
  const [users, setUsers] = useState<User[] | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const result = await getUsers();
      setUsers(result);
    })();
  }, []);

  return (
    <>
      <Typography variant="h1" align="center">
        Filter users task
      </Typography>
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
