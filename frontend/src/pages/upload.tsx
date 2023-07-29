import { ChangeEvent, useState } from "react";
import api from "../api/api";
import Button from "../components/Button";

const Upload = () => {
  const [fileName, setFileName] = useState('');
  const [isUpload, setIsUpload] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<any>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFileName(file ? file.name : '');
    setFile(file);
  };

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
      try {
        await api.post('/users', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setIsUpload(true);
      } catch (error: any) {
          setError(error.response.data.error);
      }
    }
  }

  return (
    <section className="flex flex-col justify-center items-center h-screen">
      <div className="grid place-items-center grid-flow-row gap-2">
        <h1 className="">Upload a CSV file</h1>
        <form id="form" onSubmit={handleUpload} className="grid grid-flow-col gap-2">
        <label
          htmlFor="fileInput"
          className="px-4 py-2 bg-transparent text-black rounded-md cursor-pointer shadow border border-gray-300 hover:bg-gray-100"
        >
          <span className="mr-2">Browse</span>
          <span className="text-gray-400">{fileName}</span>
        </label>
          <input id="fileInput"
          type="file"
          className="hidden" onChange={handleFileChange} />
          <Button disabled={!file} type="submit" form="form">Upload</Button>
          </form>
          {
              isUpload && <p className="text-green-500">File uploaded successfully</p>
            }
          {error && <p className="text-red-500">Error: {error}</p>}
        </div>
      </section>
  );
}
 
export default Upload;