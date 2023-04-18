import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Model, Schema } from "~/types/projectTypes";
import { ID_FIELD } from "../../types/fields";

interface AddModalButtonProps {
  setSchema: Dispatch<SetStateAction<Schema | undefined>>;
  schema: Schema | undefined;
}

const AddModalButton: FC<AddModalButtonProps> = ({ schema, setSchema }) => {
  const handleCreateModel = () => {
    const newModelName = "New";
    if (!schema) return;

    if (schema.models.some((model: Model) => model.name === newModelName)) {
      alert("A model called New exists");
    } else {
      const newSchema = {
        ...schema,
        models: [
          ...schema.models,
          {
            name: newModelName,
            fields: [ID_FIELD],
            enums: [],
          },
        ],
      };
      localStorage.setItem("schema", JSON.stringify(newSchema));
      setSchema(newSchema);
    }
  };

  return (
    <button
      className="mx-2 mt-4 border-b border-black text-center text-3xl text-black"
      onClick={handleCreateModel}
    >
      Modals &nbsp;&nbsp;&nbsp;&nbsp;+
    </button>
  );
};

export default AddModalButton;
