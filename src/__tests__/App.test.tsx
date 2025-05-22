import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";

// Mock window.innerWidth to simulate mobile view
beforeAll(() => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: 375,
  });
});

jest.useFakeTimers();

// Mock fetch to return fake users + stories
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            userId: 1,
            userName: "Alice",
            profilePic: "https://example.com/alice.jpg",
            stories: [
              "https://example.com/alice_story1.jpg",
              "https://example.com/alice_story2.jpg",
            ],
          },
          {
            userId: 2,
            userName: "Bob",
            profilePic: "https://example.com/bob.jpg",
            stories: [
              "https://example.com/bob_story1.jpg",
              "https://example.com/bob_story2.jpg",
            ],
          },
        ]),
    })
  ) as jest.Mock;
});

describe("Instagram Stories App", () => {
  it("renders user avatars from fetched data", async () => {
    render(<App />);
    expect(await screen.findByText("Alice")).toBeInTheDocument();
    expect(screen.getByAltText("Alice")).toHaveAttribute(
      "src",
      expect.stringContaining("alice.jpg")
    );
  });

  it("opens story viewer when avatar is clicked", async () => {
    render(<App />);
    fireEvent.click(await screen.findByText("Alice"));
    expect(await screen.findByAltText("story")).toHaveAttribute(
      "src",
      expect.stringContaining("alice_story1")
    );
    expect(screen.getByText("Alice")).toBeInTheDocument(); // name in header
  });

  it("navigates to next story on right click", async () => {
    render(<App />);
    fireEvent.click(await screen.findByText("Alice"));

    fireEvent.click(screen.getByAltText("story"), { clientX: 300 });
    await waitFor(() => {
      expect(screen.getByAltText("story")).toHaveAttribute(
        "src",
        expect.stringContaining("alice_story2")
      );
    });
  });

  it("navigates to previous story on left click", async () => {
    render(<App />);
    fireEvent.click(await screen.findByText("Alice"));

    // Go to next first
    fireEvent.click(screen.getByAltText("story"), { clientX: 300 });
    await screen.findByAltText("story");

    // Then go back
    fireEvent.click(screen.getByAltText("story"), { clientX: 10 });
    await waitFor(() => {
      expect(screen.getByAltText("story")).toHaveAttribute(
        "src",
        expect.stringContaining("alice_story1")
      );
    });
  });

  it("auto advances to next story after 5 seconds", async () => {
    render(<App />);
    fireEvent.click(await screen.findByText("Alice"));

    expect(screen.getByAltText("story")).toHaveAttribute(
      "src",
      expect.stringContaining("alice_story1")
    );
    jest.advanceTimersByTime(5000);

    await waitFor(() => {
      expect(screen.getByAltText("story")).toHaveAttribute(
        "src",
        expect.stringContaining("alice_story2")
      );
    });
  });

  it("closes story viewer after all stories are done", async () => {
    render(<App />);
    fireEvent.click(await screen.findByText("Alice"));

    // Advance twice: Alice Story 1 → 2 → Bob 1 → 2 → end
    jest.advanceTimersByTime(5000); // to Alice 2
    jest.advanceTimersByTime(5000); // to Bob 1
    jest.advanceTimersByTime(5000); // to Bob 2
    jest.advanceTimersByTime(5000); // exit

    await waitFor(() => {
      expect(screen.queryByAltText("story")).not.toBeInTheDocument();
    });
  });
});
