"use client";
import { FormEvent, useState } from "react";
import LabeledText from "./components/LabeledText";
import { COLORS_ENUM, Labels, ResultModel } from "./models/api";
import Tag from "./components/Tag";
import Graph from "./components/Graph";
import processText from "./services/process";
import useGetModels from "./hooks/useGetModels";
import Spiner from "./components/Spiner";
import Toggle from "./components/Toggle";

export default function Home() {
  const [result, setResult] = useState<ResultModel>();
  const [tags, setTags] = useState<{ entity: Labels; color: COLORS_ENUM }[]>();
  const [showGraph, setShowGraph] = useState(false)
  const { isLoading: modelsLoading, models } = useGetModels()

  const [processingPending, setProcessingPending] = useState(false)
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const file = (event.target.file as HTMLInputElement).files[0]
    const model = (event.target.model as HTMLSelectElement).value
    setProcessingPending(true)
    if (file && model) {
      const { labels, result } = await processText({ file, model })
      setResult(result);
      setTags(labels);
    }
    setProcessingPending(false)

  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container flex flex-col space-y-6">
        <form
          className="flex flex-col justify-between items-start"
          onSubmit={onSubmit}
        >
            <label
              htmlFor="dropdown"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Model:
            </label>
            <select
              id="dropdown"
              className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="model"
              required
            >
              <option disabled>Select model</option>
              {models.map((name, id) => (
                <option key={id} value={name}>
                  {name}
                </option>
              ))}
            </select>

            <label className="block">
              <span className="sr-only">Choose file</span>
              <input
                type="file"
                name="file"
                required
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-violet-100
                "
              />
            </label>
            <button
              type="submit"
              className="h-12 mt-6 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
              disabled={modelsLoading || processingPending}
            >
              {modelsLoading || processingPending ? <Spiner /> : 'Process'}
            </button>
        </form>

        {result ? <>
          <Toggle onToggle={setShowGraph} label={showGraph ? 'IT Map' : 'Labeled CV'} />
          {showGraph ? <Graph data={result} /> : <>
            {tags &&
             <div className="flex">
               {tags.map((tag) => (
                <Tag tag={tag.entity} color={tag.color} key={tag.color} />
              ))}
              </div>}
            <LabeledText text={result.text} ents={result.ents} />
          </>}
        </> : null}
      </div>
    </main>
  );
}
