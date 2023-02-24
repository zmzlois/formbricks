import clsx from "clsx";
import { FormName } from "./FormName";

export default function TabNavigation({ tabs, currentTab, setCurrentTab, name }) {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-slate-300 focus:border-teal-500 focus:ring-teal-500"
          onChange={(e) => setCurrentTab(e.target.value)}
          defaultValue={currentTab}>
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="flex items-center justify-center border-b border-slate-200">
          <div className="absolute left-10 text-lg font-bold text-slate-600">
            <FormName name={name} />
          </div>
          <nav className="-mb-px flex space-x-8 text-center" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setCurrentTab(tab.name)}
                className={clsx(
                  tab.name === currentTab
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700",
                  "group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium"
                )}
                aria-current={currentTab === tab.name ? "page" : undefined}>
                <tab.icon
                  className={clsx(
                    tab.name === currentTab ? "text-teal-500" : "text-slate-400 group-hover:text-slate-500",
                    "-ml-0.5 mr-2 h-5 w-5"
                  )}
                  aria-hidden="true"
                />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
