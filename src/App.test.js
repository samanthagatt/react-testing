import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { fetchMissions as mockFetchMissions } from "./api/fetchMissions";
import mockMissionsData from "./testing/mockMissionsData";
import App from './App';
import { GET_DATA_TEXT, MISSION_TESTID, FETCHING_TEXT, ERROR_TESTID } from './testing/variables';

jest.mock("./api/fetchMissions");

test("App renders correctly", () => {
  const { getByText, queryByTestId } = render(<App />);
  getByText(/space missions/i);
  expect(queryByTestId(ERROR_TESTID)).toBeNull();
  expect(queryByTestId())
});

// use async/await
test("App fetches missions data and renders data", async () => {

  mockFetchMissions.mockResolvedValueOnce({ data: mockMissionsData});
  
  const { getByText, findAllByTestId } = render(<App />);

  const button = getByText(GET_DATA_TEXT);
  fireEvent.click(button);

  // will be fetching now that button has been clicked
  getByText(FETCHING_TEXT);

  // waits until the code block doesn't throw an error (or a timeout occurs which will cause test to fail)
  // await wait(() => { queryAllByTestId(MISSION_TESTID); })
  // findAllByTestId is pretty much the same
  const missions = await findAllByTestId(MISSION_TESTID);

  // below await is the same as inside a .then()
  expect(missions).toHaveLength(mockMissionsData.length);
});
