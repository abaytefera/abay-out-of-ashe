import { faTimesCircle, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ControlLogic } from "../../ControlLofic/Controllogic";

const CreateTaskPage = () => {
  const [files, setFiles] = useState([]);
  const [tempFiles, setTempFiles] = useState([]);
  const { isDarkmode } = ControlLogic();

  const handleTempFileChange = (e) => {
    setTempFiles(Array.from(e.target.files));
  };

  const handleAddFiles = () => {
    setFiles((prev) => [...prev, ...tempFiles]);
    setTempFiles([]);
  };

  const handleSetFiles = () => {
    setFiles([...tempFiles]);
    setTempFiles([]);
  };

  const handleCancel = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className={`${isDarkmode ? "bg-gray-800 text-white" : "bg-gray-50 text-black"}  h-screen overflow-auto pb-40 flex justify-center items-start  `}>
      <form className={`w-full max-w-md ${isDarkmode ?"bg-gray-900":"bg-white"} shadow-xl rounded-xl p-6 space-y-6`}>
        <h1 className="text-3xl font-bold text-sky-500 text-center">Create Task</h1>

        {/* Title */}
        <div>
          <label htmlFor="task-title" className="block font-medium mb-1">Title</label>
          <input
            id="task-title"
            type="text"
            placeholder="Enter task title"
            className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Assign */}
        <div>
          <label htmlFor="assign" className="block font-medium mb-1">Assign To</label>
          <select
            id="assign"
            className={`w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500  ${isDarkmode?"bg-gray-800":"bg-white"}`}
          >
            <option value="">Select employee</option>
            <option value="yimesgen">Yimesgen</option>
            <option value="tigsten">Tigsten</option>
            <option value="adanechi">Adanechi</option>
          </select>
        </div>

        {/* Upload Files */}
        <div>
          <label className="block font-medium mb-2">Upload Files</label>

          <label
            htmlFor="file"
            className="w-full flex items-center justify-center gap-3 border border-dashed border-sky-400 rounded-md p-4 text-sky-600 cursor-pointer hover:bg-sky-50"
          >
            <FontAwesomeIcon icon={faUpload} className="text-xl" />
            <span className="font-medium">Choose Files</span>
          </label>

          <input
            id="file"
            type="file"
            multiple
            onChange={handleTempFileChange}
            className="hidden"
          />

          {tempFiles.length > 0 && (
            <div className="flex gap-4 mt-3">
              <button
                type="button"
                onClick={handleAddFiles}
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
              >
                Add Files
              </button>
              <button
                type="button"
                onClick={handleSetFiles}
                className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
              >
                Set Files
              </button>
            </div>
          )}

          {/* File List */}
          {files.length > 0 && (
            <div className="mt-3 space-y-2">
              <p className="font-semibold text-sm">Selected Files:</p>
              {files.map((file, index) => (
                <div key={index} className="flex justify-between items-center text-sm bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-md">
                  <span>{file.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</span>
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      className="text-red-500 text-lg cursor-pointer"
                      onClick={() => handleCancel(index)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block font-medium mb-1">Description</label>
          <textarea
            id="description"
            placeholder="Describe the task..."
            className="w-full h-28 px-3 py-2 rounded-md border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Deadline */}
        <div>
          <label htmlFor="deadline" className="block font-medium mb-1">Deadline</label>
          <input
            type="date"
            id="deadline"
            className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-sky-600 hover:bg-purple-500 text-white font-semibold rounded transition"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTaskPage;
