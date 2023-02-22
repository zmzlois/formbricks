import { persistForm } from "@/lib/forms";

export default function OpenForm({ element, setElement, form }) {
  const setElementDataAttribute = (key, value) => {
    const updatedElement = { ...element };
    updatedElement[key] = value;
    setElement(updatedElement);
  };

  return (
    <>
      <div>
        <div className="mt-1">
          <input
            type="text"
            name="question"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Question"
            value={element.label || ""}
            onChange={(e) => setElementDataAttribute("label", e.target.value)}
            onBlur={() => persistForm(form)}
          />
        </div>
        <div className="mt-2">
          <input
            type="text"
            name="help"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Help text (optional)"
            value={element.help || ""}
            onChange={(e) => setElementDataAttribute("help", e.target.value)}
            onBlur={() => persistForm(form)}
          />
        </div>
      </div>
    </>
  );
}
