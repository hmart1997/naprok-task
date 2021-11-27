import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";
import { Gender, Nationality, User } from "../types/user";
import getUsers from "../utilities/utilities";

const nationalities: Nationality[] = [
  "AU",
  "BR",
  "CH",
  "DE",
  "DK",
  "ES",
  "FI",
  "FR",
  "GB",
  "IE",
  "IR",
  "NO",
  "NL",
  "NZ",
  "TR",
  "CA",
  "US",
];

const useStyles = makeStyles((theme) => ({
  listContainer: {
    backgroundColor: theme.palette.primary.light,
    color: "white",
    borderRadius: "20%",
  },
  list: {
    maxHeight: "10rem",
    overflowY: "scroll",
    width: "100%",
  },
  gender: {
    width: "100%",
  },
  submitButton: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    margin: "2rem 0",
  },
}));

interface Props {
  setUsers: (value: User[]) => void;
}

const localNatinalities = localStorage.getItem("checkedNatinalities")?.split(",") as Nationality[];

export default function UserFilter({ setUsers }: Props) {
  const classes = useStyles();
  const [gender, setGender] = useState<Gender | "all">(
    (localStorage.getItem("gender") as Gender | "all") ?? "all",
  );
  const [checkedNatinalities, setCheckedNatinalities] = React.useState<Nationality[]>(
    localNatinalities || [],
  );

  const handleListOnClicked = (value: Nationality) => {
    if (!checkedNatinalities.includes(value)) {
      setCheckedNatinalities((prev) => [...prev, value]);
    } else {
      setCheckedNatinalities((prev) => prev.filter((current) => current !== value));
    }
  };

  const onSubmit = async () => {
    const users = await getUsers({
      ...(gender !== "all" ? { gender } : {}),
      natinalities: checkedNatinalities,
    });
    localStorage.setItem("gender", gender);
    localStorage.setItem("checkedNatinalities", checkedNatinalities.toString());
    setUsers(users);
  };

  return (
    <Grid item xs={4}>
      <FormControl fullWidth>
        <Grid container justifyContent="space-evenly" alignItems="flex-start" spacing={5}>
          <Grid item xs>
            <InputLabel>Gender</InputLabel>
            <Select
              value={gender}
              label="Gender"
              className={classes.gender}
              onChange={(e) => setGender(e.target.value as Gender)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </Grid>

          <Grid item xs className={classes.listContainer}>
            <>
              <Typography align="center" variant="body1">
                Natinalities
              </Typography>
              <List className={classes.list}>
                {nationalities.map((value) => (
                  <ListItem
                    component="button"
                    button
                    key={value}
                    onClick={() => handleListOnClicked(value)}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checkedNatinalities.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText primary={value} />
                  </ListItem>
                ))}
              </List>
            </>
          </Grid>
        </Grid>
        <Button onClick={onSubmit} className={classes.submitButton}>
          Apply filters
        </Button>
      </FormControl>
    </Grid>
  );
}
