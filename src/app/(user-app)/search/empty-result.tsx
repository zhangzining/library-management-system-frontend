import {TrashIcon} from "@heroicons/react/24/outline";

export default function EmptyResult({searchHistories, onClearHistory, onSelectHistory}: {
  searchHistories: Array<string>,
  onClearHistory: () => void,
  onSelectHistory: (keyword: string) => void,
}) {
  return (
    <div>
      {
        searchHistories.length > 0 ? (
          <div className="w-full flex flex-row flex-wrap  px-2">
            {
              searchHistories.map((name) => (
                <button
                  key={name}
                  className="bg-white text-gray-400 rounded-3xl mt-2 ml-2 px-3 py-1"
                  onClick={() => onSelectHistory(name)}
                >{name}</button>
              ))
            }
            {
              <button className="bg-white rounded-3xl mt-2 ml-2 px-3 py-1" onClick={() => onClearHistory()}>
                <TrashIcon className="text-gray-400 w-5"/>
              </button>
            }
          </div>
        ) : (
          <p className="w-full p-2 text-gray-400 text-center mt-5">今天想找什么书？</p>
        )
      }
    </div>
  )
}