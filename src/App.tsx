import { Box, Grid } from "@mui/material";
import { DayCard } from "./DayCard.tsx";
import { useMenorahs } from "./useMenorahs.ts";

export const App = () => {
  const { days, totalCandles, availableCandles } = useMenorahs();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        margin: 4,
      }}
    >
      <Box>
        <Box>{`Total Candles: ${totalCandles}`}</Box>
        <Box>{`Available Candles: ${availableCandles}`}</Box>
        <Grid container columns={7} spacing={2}>
          {days.map((day) => {
            return (
              <Grid size={1} key={day.date.toISO()}>
                <DayCard {...day} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};
