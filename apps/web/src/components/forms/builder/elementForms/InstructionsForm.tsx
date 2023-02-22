import { persistForm } from "@/lib/forms";

export default function InstructionsForm({ element, setElement, form }) {
  const setElementAttribute = (key, value) => {
    const updatedElement = JSON.parse(JSON.stringify(element));
    updatedElement[key] = value;
    setElement(updatedElement);
  };

  return (
    <>
      <div>
        <div className="mt-1">
          <input
            type="text"
            name="label"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Title"
            value={element.label || ""}
            onChange={(e) => setElementAttribute("label", e.target.value)}
            onBlur={() => persistForm(form)}
          />
        </div>
        <div className="mt-2">
          <input
            type="text"
            name="help"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Description (optional)"
            value={element.help || ""}
            onChange={(e) => setElementAttribute("help", e.target.value)}
            onBlur={() => persistForm(form)}
          />
        </div>
        <div className="mt-2">
          <textarea
            name="body"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Your Instructions"
            value={element.html || ""}
            onChange={(e) => setElementAttribute("html", e.target.value)}
            onBlur={() => persistForm(form)}
          />
        </div>
      </div>
    </>
  );
}
