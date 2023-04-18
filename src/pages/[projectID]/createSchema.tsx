import { FC, ReactNode, useEffect, useState } from "react";
import Stack from "~/components/Stack";
import AddModalButton from "~/components/schema/AddModalButton";
import Tag from "~/components/schema/Tag";
import { TYPES } from "~/types/fields";
import { prismaTypesToIcons } from "~/types/icons";
import { Field, FieldType, Model, Schema } from "~/types/projectTypes";
import classNames from "~/utils/classNames";
import FieldComponent from "~/components/schema/Field";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";

const Schema = ({}) => {
  const [schema, setSchema] = useState<Schema>();
  const [selectedModel, setSelectedModel] = useState<number>(-1);
  const [addingField, setAddingField] = useState<FieldType>();
  const [editingField, setEditingField] = useState<string>();
  const [openModal, setOpenModel] = useState<boolean>(false);
  const { query, push } = useRouter();

  useEffect(() => {
    const schema = localStorage.getItem("schema");
    if (schema) {
      setSchema(JSON.parse(schema));
    }
  }, []);
  useEffect(() => {
    console.log(schema?.models[selectedModel]);
  }, [selectedModel]);

  useEffect(() => {
    console.log(
      "🚀 ~ file: createSchema.tsx:29 ~ useEffect ~ editingField:",
      editingField
    );
  }, [editingField]);

  useEffect(() => {
    console.log("🚀 ~ file: createSchema.tsx:36 ~ addingField:", addingField);
  }, [addingField]);

  useEffect(() => {
    if (schema) localStorage.setItem("schema", JSON.stringify(schema));
  }, [schema]);
  const updateModel = (values: any) => {
    if (schema === undefined) return;
    setSchema({
      ...schema,
      models: schema.models.map((model, index) => {
        if (index === selectedModel) {
          return {
            ...model,
            ...values,
          };
        }
        return model;
      }),
    });

    localStorage.setItem("schema", JSON.stringify(schema));
  };

  const AddField = (value: any) => {
    if (schema === undefined) return;
    //@ts-ignore
    schema?.models[selectedModel].fields.push(value);
    localStorage.setItem("schema", JSON.stringify(schema));
  };

  const { mutateAsync, isSuccess, isLoading } =
    api.project.updateSchema.useMutation();

  const handelUpdateSchema = async () => {
    if (schema === undefined && query.projectID === undefined) return;
    await mutateAsync({
      ProjectID: query.projectID as string,
      Schema: JSON.stringify(schema),
    });

    if (isSuccess) alert("Updated Successfully");

    push(`/${query.projectID}`);
  };
  if (schema !== undefined)
    return (
      <>
        {addingField && openModal && (
          <FieldComponent
            schema={schema}
            setSchema={setSchema}
            defaultType={addingField ?? ("" as FieldType)}
            onClose={() => {
              setAddingField(undefined);
              setOpenModel(false);
            }}
            model={schema?.models[selectedModel] as Model}
            onSubmit={(field) => {
              // updateModel({
              //   fields: [...schema.models, field],
              // });

              AddField(field);

              setAddingField(undefined);
              setOpenModel(false);
            }}
          />
        )}

        {editingField && openModal && (
          <FieldComponent
            schema={schema}
            setSchema={setSchema}
            onClose={() => {
              setEditingField(undefined);
            }}
            model={schema?.models[selectedModel] as Model}
            defaultValues={
              schema?.models[selectedModel]?.fields?.find(
                (field: Field) => field.name === editingField
              ) ?? ({} as Field)
            }
            onSubmit={(field) => {
              updateModel({
                fields: schema?.models[selectedModel]?.fields.map((f: Field) =>
                  f.name === editingField ? field : f
                ),
              });
            }}
          />
        )}
        <h1 className="ml-[10%] text-4xl font-bold text-black">Setup Schema</h1>
        <div className="mt-10 flex h-[70vh] w-full flex-row justify-around px-24">
          <section className="no-scrollbar flex h-full w-[15vw] flex-col overflow-y-scroll rounded-2xl bg-white px-2 py-4 drop-shadow-card">
            <AddModalButton schema={schema} setSchema={setSchema} />
            {schema?.models.map((model, index) => {
              return (
                <div
                  className="mx-2 mt-2 rounded-xl bg-white py-2 text-center text-black drop-shadow-card hover:cursor-pointer hover:bg-blue-grotto"
                  key={index}
                  onClick={() => setSelectedModel(index)}
                >
                  {model.name}
                </div>
              );
            })}
          </section>
          <section className="no-scrollbar h-full w-[50vw] overflow-y-scroll rounded-2xl bg-white px-2 py-4 drop-shadow-card ">
            {selectedModel > -1 ? (
              <div className="flex flex-col gap-2">
                <h1
                  className="truncate text-2xl font-bold text-black transition"
                  contentEditable
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      e.currentTarget.blur();
                    }
                  }}
                  onBlur={(e) => {
                    const newName = e.currentTarget.innerText.trim();

                    if (newName && newName !== schema?.name) {
                      updateModel({
                        name: newName,
                      });
                    }
                  }}
                >
                  {schema?.models[selectedModel]?.name}
                </h1>
                {schema?.models[selectedModel]?.fields.map((field, index) => {
                  return (
                    <div
                      className="mx-4 bg-white px-2 py-4 pl-8 drop-shadow-card hover:cursor-pointer"
                      onClick={() => {
                        setEditingField(field.name);
                        setOpenModel(true);
                      }}
                    >
                      <div className="text-2xl text-black ">{field.name}</div>
                      <div className="flex gap-2">
                        <Tag>
                          {field.list ? "[" : ""}
                          {field.type}
                          {field.list ? "]" : ""}
                        </Tag>
                        {field.unique && <Tag>Unique</Tag>}
                        {field.required && <Tag>Required</Tag>}
                        {field.default && <Tag>{field.default}</Tag>}
                        {field.isUpdatedAt && <Tag>Updated At</Tag>}
                        {field.isId && <Tag>ID</Tag>}{" "}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </section>
          <section className="no-scrollbar h-full w-[15vw] overflow-y-scroll rounded-2xl bg-white px-2 py-4 drop-shadow-card ">
            <h1 className=" mx-2 mt-4  border-black text-center text-3xl text-black">
              Add Field
            </h1>
            <Stack direction="vertical">
              {[
                ...TYPES(schema.database).map((t) => ({
                  ...t,
                  type: "type",
                })),
                ...schema.models.map((m) => ({
                  ...m,
                  description: "",
                  type: "model",
                })),
                ...(schema.database !== "sqlite" &&
                schema.database !== "sqlserver"
                  ? schema.enums.map((e) => ({
                      ...e,
                      description: "",
                      type: "enum",
                    }))
                  : []),
              ].map((type) => {
                const Icon = (
                  type.type === "enum"
                    ? prismaTypesToIcons.Enum
                    : type.type === "model"
                    ? prismaTypesToIcons.Model
                    : prismaTypesToIcons[type.name] ??
                      prismaTypesToIcons.default
                ) as ({ className }: any) => JSX.Element;

                return (
                  <button
                    type="button"
                    className={classNames(
                      "group mx-2 mb-4 flex items-center space-x-3.5 rounded-lg border border-transparent bg-white py-3 px-4 text-left text-black shadow drop-shadow-card hover:border-indigo-500 focus:border-indigo-500 focus:outline-none focus:ring-0"
                    )}
                    onClick={() => {
                      setAddingField(type.name as FieldType);
                      setOpenModel(true);
                    }}
                    key={type.name}
                  >
                    <div className="flex items-center justify-center rounded-md bg-blue-grotto p-3 text-black  group-hover:text-inherit ">
                      //@ts-nocheck
                      <Icon className="w-5" />
                    </div>

                    <Stack direction="vertical" spacing="tiny">
                      <h4 className="font-medium">{type.name}</h4>
                      <p className="text-sm text-black">{type.description}</p>
                    </Stack>
                  </button>
                );
              })}
            </Stack>
          </section>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={handelUpdateSchema}
            className="align-center mt-10 w-fit rounded-xl border-2 border-blue bg-white py-2 px-20 text-2xl font-bold text-black drop-shadow-card hover:border-0 hover:bg-blue-grotto hover:text-white"
          >
            Done
          </button>
        </div>
      </>
    );
};

export default Schema;
