import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { uploadImage } from './functions/functions';
import axios from 'axios'

function CKEditorComponent() {

    //Image handling in CKEditor5
    const uploadImage = async (body) => {
      return await axios.post(
          `http://localhost:5000/api/user/upload-image`,
          body
      )
  }
    const [data,setData]=useState('')
    console.log(data)
    function uploadAdapter(loader) {
      return {
        upload: () => {
          return new Promise((resolve, reject) => {
            const body = new FormData();
            loader.file
              .then((file) => {
                body.append("uploadImg", file);
                uploadImage(body)
                  .then((res) => {
                    const imageUrl = `http://localhost:5000${res.data.url}`;
                    resolve({ default: imageUrl });
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => reject(err));
          });
        },
      };
    }
    

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <div className="main container">
      <h2 className='heading'>Upload Image using CKEditor5 </h2>
        <CKEditor
            editor={ ClassicEditor }
            data={data}
            config={{
                extraPlugins: [uploadPlugin],
            }}
            onChange={ ( event, editor ) => {
                const data = editor.getData();
                console.log( { event, editor, data } );
                setData(data)
            } }
        />
    </div>
  );
}

export default CKEditorComponent;
