import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "../App";

// Simulate a mobile screen width
beforeAll(() => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: 375,
  });
  window.dispatchEvent(new Event("resize"));
});

// Mock fetch to return your stories.json data
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            userId: 1,
            userName: "Alice",
            profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
            stories: [
              "https://picsum.photos/id/1005/300/500",
              "https://picsum.photos/id/1006/300/500",
              "https://picsum.photos/id/1004/300/500",
            ],
          },
          {
            userId: 2,
            userName: "Bob",
            profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
            stories: [
              "https://picsum.photos/id/1011/300/500",
              "https://picsum.photos/id/1012/300/500",
              "https://picsum.photos/id/1013/300/500",
            ],
          },
        ]),
    })
  ) as jest.Mock;
});

afterEach(() => {
  jest.clearAllMocks();
});

test("renders user avatars after fetch", async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });
});

test("opens story viewer when avatar clicked", async () => {
  render(<App />);
  await waitFor(() => screen.getByText("Alice"));
  fireEvent.click(screen.getByText("Alice"));

  await waitFor(() => {
    expect(screen.getByAltText("story")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });
});
