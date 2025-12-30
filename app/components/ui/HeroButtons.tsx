"use client";

import { Button } from "@/app/components/ui/Button";

export default function HeroButtons() {
  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      <Button href="/menu" variant="cta" size="lg" withArrow>
        Explore Our Menu
      </Button>
    </div>
  );
}
