import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { User } from "../types/user";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    padding: theme.spacing(4),
    borderRadius: "10%",
  },
  pictureContainer: {
    marginBottom: "1rem",
  },
  picture: {
    borderRadius: "10%",
  },
}));

interface Props {
  user: User;
}

export default function UserCard({ user }: Props) {
  const classes = useStyles();

  return (
    <Grid className={classes.mainContainer}>
      <Grid
        container
        item
        xs
        justifyContent="center"
        alignItems="center"
        className={classes.pictureContainer}
      >
        <img src={user.picture.large} alt="user-pic" className={classes.picture} />
      </Grid>
      <Typography variant="h2">{`${user.name.first} ${user.name.last}`}</Typography>
      <Typography variant="body1">{user.gender}</Typography>
      <Typography variant="body1">{user.email}</Typography>
      <Typography variant="body1">{user.dob.date.toString().split("T")[0]}</Typography>
    </Grid>
  );
}
