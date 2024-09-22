"use client";

import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./page";
// import Influencers from "../components/Influencers/Influencers"; // Use relative path

jest.mock("../components/Influencers/Influencers", () => {
  return function MockInfluencers() {
    return <div data-testid="mock-influencers">Mock Influencers Component</div>;
  };
});

describe("Home Page", () => {
  it("renders the Influencers component", () => {
    render(<Home />);
    
    // Check if the mocked Influencers component is rendered
    expect(screen.getByTestId("mock-influencers")).toBeInTheDocument();
  });
});