import { render, screen, fireEvent } from "@testing-library/react";
import ContentCard from "../components/ContentCard";

const mockContent = {
  _id: "123",
  type: "generated",
  outputText: "Test content",
  createdAt: new Date().toISOString(),
  prompt: "Test prompt",
};

describe("ContentCard", () => {
  it("renders content card with text", () => {
    const mockFetchHistory = jest.fn();

    render(
      <ContentCard content={mockContent} fetchHistory={mockFetchHistory} />
    );

    expect(screen.getByText("Generated")).toBeInTheDocument();
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("enables edit mode when edit button is clicked", () => {
    const mockFetchHistory = jest.fn();

    render(
      <ContentCard content={mockContent} fetchHistory={mockFetchHistory} />
    );

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test content")).toBeInTheDocument();
  });

  it("has all action buttons", () => {
    const mockFetchHistory = jest.fn();

    render(
      <ContentCard content={mockContent} fetchHistory={mockFetchHistory} />
    );

    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Copy")).toBeInTheDocument();
    expect(screen.getByText("Export PDF")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });
});
