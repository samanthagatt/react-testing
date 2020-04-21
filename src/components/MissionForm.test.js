import React from "react";
import { render } from "@testing-library/react";
import { GET_DATA_TEXT, FETCHING_TEXT } from "../testing/variables";
import MissionForm from "./MissionForm";

// test fx comes from jest library included with react testing library
test("MissionForm reneders correctly", () => {
  const mockGetData = jest.fn();
  // 
  const { getByText, queryByText } = render(
    <MissionForm getData={mockGetData} isFetchingData={false} />
  );

  // test that the button is rendered
  // getBy fxs throw an error if nothing is found so expect fx is not needed
  getByText(GET_DATA_TEXT);
  // test that the loading state is not
  expect(queryByText(FETCHING_TEXT)).toBeNull();
});

test("MissionForm transitions to loading state when isFetchingData is true", () => {
  const mockGetData = jest.fn();
  // Flow of states for user
  // First isFetchingData will be false
  const { getByText, queryByText, rerender } = render(
    <MissionForm getData={mockGetData} isFetchingData={false} />
  );

  getByText(GET_DATA_TEXT);
  expect(queryByText(FETCHING_TEXT)).toBeNull();

  // For user getData will change isFetchingData to true and component will be rerendered
  rerender(
    <MissionForm getData={mockGetData} isFetchingData={true} />
  );

  getByText(FETCHING_TEXT);
  expect(queryByText(GET_DATA_TEXT)).toBeNull();
});

test("MissionForm transitions from loading state back to resting state", () => {
  const mockGetData = jest.fn();
  const { getByText, rerender, queryByText } = render(
    <MissionForm getData={mockGetData} isFetchingData={true} />
  );
  
  getByText(FETCHING_TEXT);
  expect(queryByText(GET_DATA_TEXT)).toBeNull();

  rerender(
    <MissionForm getData={mockGetData} isFetchingData={false} />
  );

  getByText(GET_DATA_TEXT);
  expect(queryByText(FETCHING_TEXT)).toBeNull();
});