import { useRouter } from "next/router";
import FormContextMenu from "./forms/FormContextMenu";

export const FormName = ({ name }) => {
  const router = useRouter();

  return (
    <div className="flex items-center space-x-2">
      <h2 className="text-lg font-bold text-slate-600">{name}</h2>
      <FormContextMenu
        formId={router.query.formId?.toString()}
        organisationId={router.query.organisationId?.toString()}
      />
    </div>
  );
};
