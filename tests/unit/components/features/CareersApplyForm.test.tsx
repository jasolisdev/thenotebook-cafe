import React from "react";
import { describe, expect, test, vi } from "vitest";
import { render, screen, userEvent, waitFor } from "@/tests/utils/test-utils";
import CareersApplyForm from "@/app/components/features/CareersApplyForm";

describe("CareersApplyForm", () => {
  test("submits with required fields and uploads resume", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<CareersApplyForm />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("First Name *"), "Ada");
    await user.type(screen.getByPlaceholderText("Last Name *"), "Lovelace");
    await user.type(screen.getByPlaceholderText("Phone Number *"), "7147423311");
    await user.type(screen.getByPlaceholderText("Email *"), "ada@example.com");

    const birthdateInput = screen.getByLabelText("Birthday *") as HTMLInputElement;
    await user.type(birthdateInput, "1993-07-20");

    await user.selectOptions(screen.getByRole("combobox"), "Weekdays");
    await user.type(screen.getByPlaceholderText("Tell us why you're a good fit..."), "Coffee nerd.");

    const resumeInput = screen.getByLabelText("Resume *") as HTMLInputElement;
    const resumeFile = new File(["resume"], "resume.pdf", { type: "application/pdf" });
    await user.upload(resumeInput, resumeFile);

    await user.click(screen.getByRole("button", { name: /submit application/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
  });

  test("uploads optional application file", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<CareersApplyForm />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("First Name *"), "Ada");
    await user.type(screen.getByPlaceholderText("Last Name *"), "Lovelace");
    await user.type(screen.getByPlaceholderText("Phone Number *"), "7147423311");
    await user.type(screen.getByPlaceholderText("Email *"), "ada@example.com");
    await user.type(screen.getByLabelText("Birthday *"), "1993-07-20");
    await user.selectOptions(screen.getByRole("combobox"), "Weekends");
    await user.type(screen.getByPlaceholderText("Tell us why you're a good fit..."), "Applicant.");

    const resumeInput = screen.getByLabelText("Resume *") as HTMLInputElement;
    const resumeFile = new File(["resume"], "resume.pdf", { type: "application/pdf" });
    await user.upload(resumeInput, resumeFile);

    const appInput = screen.getByLabelText("Completed Application (optional)") as HTMLInputElement;
    const appFile = new File(["application"], "application.pdf", { type: "application/pdf" });
    await user.upload(appInput, appFile);

    await user.click(screen.getByRole("button", { name: /submit application/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
  });
});
