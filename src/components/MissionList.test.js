import React from "react";
import { render } from "@testing-library/react";
import { MISSION_TESTID, ERROR_TESTID } from "../testing/variables";
import missions from "../testing/mockMissionsData";
import MissionList from "./MissionList";

test("MissionList shows data when rendered with new missions data", () => {
  const { queryByTestId, queryAllByTestId, rerender } = render(
    <MissionList error="" missions={[]} />
  );

  // Assert that there are no missions listed when the component first renders
  // expect queryByAll for missions list to be an empty array
  expect(queryAllByTestId(MISSION_TESTID)).toHaveLength(0);
  expect(queryByTestId(ERROR_TESTID)).toBeNull();

  rerender(
    <MissionList error="" missions={missions} />
  );

  expect(queryAllByTestId(MISSION_TESTID)).toHaveLength(missions.length);
  expect(queryByTestId(ERROR_TESTID)).toBeNull();
});