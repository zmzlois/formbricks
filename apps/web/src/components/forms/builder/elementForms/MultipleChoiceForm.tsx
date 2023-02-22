import { persistForm } from "@/lib/forms";
import { Switch } from "@headlessui/react";
import clsx from "clsx";

export default function OpenForm({ element, setElement, form }) {
  const setElementAttribute = (key, value, persist = false) => {
    const updatedElement = { ...element };
    updatedElement[key] = value;
    setElement(updatedElement, persist);
  };

  const setElementConfigAttribute = (key, value, persist = false) => {
    const updatedElement = { ...element };
    updatedElement.config[key] = value;
    setElement(updatedElement, persist);
  };

  const getOption = (optionIdx) => {
    const options = element.data.options || [];
    if (options.length <= optionIdx) return "";
    return options[optionIdx];
  };

  const setOption = (optionIdx, option) => {
    const options = element.options || [];
    options[optionIdx] = option;
    if (option === "" && options.length === optionIdx + 1) options.pop(); // remove last entry if empty
    setElementAttribute("options", options);
  };

  return (
    <>
      <div>
        <div className="mt-1">
          <input
            type="text"
            name="label"
            id="label"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
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
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
            placeholder="Help Text (optional)"
            value={element.data.description || ""}
            onChange={(e) => setElementAttribute("help", e.target.value)}
            onBlur={() => persistForm(form)}
          />
        </div>
        <div className="mt-2">
          {(element.data.options || []).concat([""]).map((option, optionIdx) => (
            <div
              key={optionIdx}
              className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:py-2">
              <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Option {optionIdx + 1}
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="option"
                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                  value={getOption(optionIdx)}
                  onChange={(e) => setOption(optionIdx, e.target.value)}
                  onBlur={(e) => persistForm(form)}
                />
              </div>
            </div>
          ))}
        </div>
        <hr className="my-2" />
        <div className="mt-2">
          <Switch.Group as="div" className="flex items-center justify-between">
            <span className="flex flex-grow flex-col">
              <Switch.Label as="span" className="text-sm font-medium text-gray-600" passive>
                Allow multiple selections
              </Switch.Label>
            </span>
            <Switch
              checked={element.data.multipleChoice}
              onChange={() => setElementConfigAttribute("multipleChoice", !element.data.multipleChoice, true)}
              className={clsx(
                element.data.multipleChoice ? "bg-pink-600" : "bg-gray-200",
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
              )}>
              <span
                aria-hidden="true"
                className={clsx(
                  element.data.multipleChoice ? "translate-x-5" : "translate-x-0",
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                )}
              />
            </Switch>
          </Switch.Group>
        </div>
        <div className="mt-2">
          <Switch.Group as="div" className="flex items-center justify-between">
            <span className="flex flex-grow flex-col">
              <Switch.Label as="span" className="text-sm font-medium text-gray-600" passive>
                Randomize
              </Switch.Label>
            </span>
            <Switch
              checked={element.data.randomize}
              onChange={() => setElementConfigAttribute("randomize", !element.data.randomize, true)}
              className={clsx(
                element.data.randomize ? "bg-pink-600" : "bg-gray-200",
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
              )}>
              <span
                aria-hidden="true"
                className={clsx(
                  element.data.randomize ? "translate-x-5" : "translate-x-0",
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
