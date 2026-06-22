import { templates } from "../templates";

interface TemplateSelectorProps {
  value: string;
  onChange: (templateId: string) => void;
}

export default function TemplateSelector({
  value,
  onChange,
}: TemplateSelectorProps) {
  return (
    <div className="template-selector">
      <label className="block mb-2 text-sm font-semibold text-slate-700">
        Modelo de contrato
      </label>
      <div className="flex flex-wrap gap-2">
        {templates.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            title={t.description}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer border
              ${
                value === t.id
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50"
              }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <p className="mt-1.5 text-xs text-slate-500">
        {templates.find((t) => t.id === value)?.description}
      </p>
    </div>
  );
}
