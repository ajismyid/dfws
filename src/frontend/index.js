import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as backend_idl, canisterId as backend_canister_id } from 'dfx-generated/backend';

const agent = new HttpAgent();
const backend = Actor.createActor(backend_idl, { agent, canisterId: backend_canister_id });

// ... FileBrowser component implementation
function FileBrowser({ folders }) {
  return (
    <div>
      <h2>Folders</h2>
      <ul>
        {folders.map((folder, index) => (
          <li key={index}>
            {folder[0]}
            <ul>
              {folder[1].files.map((file, idx) => (
                <li key={idx}>{file[0]}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
  
// ... UploadForm component implementation
function UploadForm({ onAddFolder, onAddFile }) {
  const [folderName, setFolderName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  function handleFolderSubmit(e) {
    e.preventDefault();
    onAddFolder(folderName);
    setFolderName('');
  }

  function handleFileSubmit(e) {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target.result;
      await onAddFile(folderName, selectedFile.name, content);
    };
    reader.readAsArrayBuffer(selectedFile);
  }

  return (
    <div>
      <h2>Upload</h2>
      <form onSubmit={handleFolderSubmit}>
        <label>
          Folder name:
          <input value={folderName} onChange={(e) => setFolderName(e.target.value)} />
        </label>
        <button type="submit">Create folder</button>
      </form>
      <form onSubmit={handleFileSubmit}>
        <label>
          File:
          <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
        </label>
        <button type="submit" disabled={!selectedFile || !folderName}>
          Upload file
        </button>
      </form>
    </div>
  );
}


function App() {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await backend.browse();
      setFolders(result);
    }
    fetchData();
  }, []);

  async function addFolder(folderName) {
    await backend.addFolder(folderName);
    const result = await backend.browse();
    setFolders(result);
  }

  async function addFile(folderName, fileName, content) {
    const blob = new Blob([content]);
    const result = await backend.addFile(folderName, fileName, blob);
    if (result.Ok) {
      const updatedFolders = await backend.browse();
      setFolders(updatedFolders);
    } else {
      alert(result.Err);
    }
  }

  return (
    <div>
      <h1>Decentralized File/Web Server</h1>
      <FileBrowser folders={folders} />
      <UploadForm onAddFolder={addFolder} onAddFile={addFile} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
