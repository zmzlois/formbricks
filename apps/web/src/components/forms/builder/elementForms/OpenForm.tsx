import { persistForm } from "@/lib/forms";

export default function OpenForm({ element, setElement, form }) {
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
            className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Question"
            value={element.label || ""}
            onChange={(e) => setElementAttribute("label", e.target.value)}
            onBlur={() => persistForm(form)}
          />
        </div>
        <div className="mt-2">
          <input
            type="text"
            name="help"
            className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Help text (optional)"
            value={element.help || ""}
            onChange={(e) => setElementAttribute("help", e.target.value)}
            onBlur={() => persistForm(form)}
          />
        </div>
      </div>
    </>
  );
}
