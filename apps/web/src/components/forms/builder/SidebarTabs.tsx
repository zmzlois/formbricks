import clsx from "clsx";

export default function SidebarTabs({ tabs, state, setState }) {
  return (
    <div className="">
      <nav className="relative z-0 flex divide-x divide-slate-200 rounded-lg" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setState(tab.id)}
            className={clsx(
              state === tab.id ? " text-slate-900" : "text-slate-500 hover:text-slate-700",
              "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-slate-50 focus:z-10 focus:outline-none"
            )}
            aria-current={state === tab.id ? "page" : undefined}>
            <span>{tab.name}</span>
            <span
              aria-hidden="true"
              className={clsx(
                state === tab.id ? "bg-brand-dark" : "bg-transparent",
                "absolute inset-x-0 bottom-0 h-0.5"
              )}
            />
          </button>
        ))}
      </nav>
    </div>
  );
}
