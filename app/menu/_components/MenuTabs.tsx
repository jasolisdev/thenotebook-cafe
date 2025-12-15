"use client";

type MenuSection = "drinks" | "meals" | "desserts";

type MenuTabsProps = {
  activeSection: MenuSection;
  onChange: (section: MenuSection) => void;
};

export function MenuTabs({ activeSection, onChange }: MenuTabsProps) {
  return (
    <div className="flex gap-2 sm:gap-4 w-full sm:w-auto justify-center sm:justify-center overflow-visible p-1">
      {(["drinks", "meals", "desserts"] as const).map((section) => {
        const isActive = activeSection === section;
        return (
          <button
            key={section}
            type="button"
            onClick={() => onChange(section)}
            className="menu-tab-button basis-1/3 sm:flex-none px-6 py-2 rounded-lg text-[11px] md:text-xs font-bold uppercase tracking-[0.22em] whitespace-nowrap transition-colors duration-150 ease-out border"
            data-active={isActive ? "true" : "false"}
            aria-pressed={isActive}
          >
            {section}
          </button>
        );
      })}
    </div>
  );
}

