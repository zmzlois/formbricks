import { persistForm } from "@/lib/forms";
import { Switch } from "@headlessui/react";
import clsx from "clsx";

export default function OpenForm({ element, setElement, form }) {
  const setElementAttribute = (key, value, persist = false) => {
    const updatedElement = JSON.parse(JSON.stringify(element));
    updatedElement[key] = value;
    setElement(updatedElement, persist);
  };

  const setElementConfigAttribute = (key, value, persist = false) => {
    const updatedElement = JSON.parse(JSON.stringify(element));
    if (!updatedElement.config) updatedElement.config = {};
    updatedElement.config[key] = value;
    setElement(updatedElement, persist);
  };

  const setOption = (optionIdx, option) => {
    const newOptions = element.options ? JSON.parse(JSON.stringify(element.options)) : [];
    newOptions[optionIdx] = option;
    //if (option === "" && newOptions.length === optionIdx + 1) newOptions.pop(); // remove last entry if empty
    setElementAttribute("options", newOptions);
  };

  return (
    <>
      <div>
        <div className="mt-1">
          <input
            type="text"
            name="label"
            id="label"
            className="block w-full rounded-md border-slate-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
            placeholder="Question"
            value={element.label || ""}
            onChange={(e) => setElementAttribute("label", e.target.value)}
            onBlur={() => persistForm(form)}
          />
        </div>
        <div className="mt-2">
          <input
            type="text"
            name="description"
            className="block w-full rounded-md border-slate-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
            placeholder="Help Text (optional)"
            value={element.help || ""}
            onChange={(e) => setElementAttribute("help", e.target.value)}
            onBlur={() => persistForm(form)}
          />
        </div>
        <div className="mt-2">
          {element.options.map((option, optionIdx) => (
            <div
              key={optionIdx}
              className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-slate-200 sm:py-2">
              <label className="block text-sm font-medium text-slate-700 sm:mt-px sm:pt-2">
                Option {optionIdx + 1}
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name={`option-${optionIdx}`}
                  className="block w-full max-w-lg rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                  value={option}
                  onChange={(e) => setOption(optionIdx, e.target.value)}
                  onBlur={() => persistForm(form)}
                />
              </div>
            </div>
          ))}
        </div>
        <hr className="my-2" />
        <div className="mt-2">
          <Switch.Group as="div" className="flex items-center justify-between">
            <span className="flex flex-grow flex-col">
              <Switch.Label as="span" className="text-sm font-medium text-slate-600" passive>
                Allow multiple selections
              </Switch.Label>
            </span>
            <Switch
              checked={element.config?.multipleChoice}
              onChange={() =>
                setElementConfigAttribute("multipleChoice", !element.config?.multipleChoice || true, true)
              }
              className={clsx(
                element.config?.multipleChoice ? "bg-pink-600" : "bg-slate-200",
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
              )}>
              <span
                aria-hidden="true"
                className={clsx(
                  element.config?.multipleChoice ? "translate-x-5" : "translate-x-0",
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                )}
              />
            </Switch>
          </Switch.Group>
        </div>
        <div className="mt-2">
          <Switch.Group as="div" className="flex items-center justify-between">
            <span className="flex flex-grow flex-col">
              <Switch.Label as="span" className="text-sm font-medium text-slate-600" passive>
                Randomize
              </Switch.Label>
            </span>
            <Switch
              checked={element.config?.randomize}
              onChange={() =>
                setElementConfigAttribute("randomize", !element.config?.randomize || true, true)
              }
              className={clsx(
                element.config?.randomize ? "bg-pink-600" : "bg-slate-200",
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
              )}>
              <span
                aria-hidden="true"
                className={clsx(
                  element.config?.randomize ? "translate-x-5" : "translate-x-0",
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                )}
              />
            </Switch>
          </Switch.Group>
        </div>
      </div>
    </>
  );
}
