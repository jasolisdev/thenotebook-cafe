import React from "react";
import { describe, expect, test } from "vitest";
import { render, screen } from "@/tests/utils/test-utils";
import CareersApplyForm from "@/app/components/features/CareersApplyForm";

describe("CareersApplyForm", () => {
  test("renders active form fields", () => {
    render(<CareersApplyForm />);

    const firstName = screen.getByPlaceholderText("First Name *");
    const lastName = screen.getByPlaceholderText("Last Name *");
    const phone = screen.getByPlaceholderText("Phone Number *");
    const email = screen.getByPlaceholderText("Email *");
    const message = screen.getByPlaceholderText("Tell us why you're a good fit...");

    expect(firstName).toBeEnabled();
    expect(lastName).toBeEnabled();
    expect(phone).toBeEnabled();
    expect(email).toBeEnabled();
    expect(message).toBeEnabled();
    expect(
      screen.getByRole("button", { name: /submit application/i })
    ).toBeEnabled();
  });

  test("shows required application template link", () => {
    render(<CareersApplyForm />);

    const templateLink = screen.getByRole("link", { name: /download our application template/i });
    expect(templateLink).toHaveAttribute("href", "/tnc-application-template.html");
  });
});
