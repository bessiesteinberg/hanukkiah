import { Box, Card, IconButton, Stack, Typography } from "@mui/material";
import type { Day } from "./useMenorahs.ts";
import { Add, Remove } from "@mui/icons-material";

export const DayCard = ({
  date,
  numberOfCandles,
  numberOfMenorahs,
  addMenorah,
  removeMenorah,
}: Day) => {
  return (
    <Card>
      <Box>
        <Typography
          variant={"h6"}
          sx={{
            backgroundColor: "#4E4187",
            color: "white",
            padding: 2,
          }}
        >{`${date.weekdayShort},  ${date.monthShort} ${date.day}`}</Typography>
      </Box>
      <Box>
        <Typography
          variant={"h6"}
          sx={{
            padding: 2,
          }}
        >{`Candles: ${numberOfCandles}`}</Typography>
      </Box>
      <Box>
        <Typography
          variant={"h6"}
          sx={{
            padding: 2,
          }}
        >{`Menorahs: ${numberOfMenorahs}`}</Typography>
      </Box>
      <Stack direction={"row"} sx={{ justifyContent: "space-evenly" }}>
        {removeMenorah === null ? (
          <IconButton disabled>
            <Remove />
          </IconButton>
        ) : (
          <IconButton>
            <Remove onClick={removeMenorah} />
          </IconButton>
        )}
        {addMenorah === null ? (
          <IconButton disabled>
            <Add />
          </IconButton>
        ) : (
          <IconButton onClick={addMenorah}>
            <Add />
          </IconButton>
        )}
      </Stack>
    </Card>
  );
};
