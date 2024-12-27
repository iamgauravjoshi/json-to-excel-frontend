import React, { useState } from "react";
import axios from "axios";

const UploadJson = () => {
   const [file, setFile] = useState(null);

   const handleFileChange = (e) => {
      setFile(e.target.files[0]);
   };

   const handleUpload = async () => {
      if (!file) {
         alert("Please upload a file!");
         return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
         //  const response = await axios.post(
         //     "http://localhost:5000/upload",
         //     formData,
         //     {
         //        responseType: "blob",
         //     }
         //  );

         const response = await axios.post(
            "https://json-to-excel-backend-36cf0b82y-gaurav-joshis-projects-1f07293c.vercel.app/upload",
            formData,
            {
               responseType: "blob",
            }
         );

         const blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
         });
         const link = document.createElement("a");
         link.href = window.URL.createObjectURL(blob);
         link.download = "ConvertedFile.xlsx";
         link.click();
      } catch (error) {
         console.error("Error uploading file:", error);
      }
   };

   return (
      <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100'>
         <div className='text-center mb-16'>
            <h1 className='text-4xl font-bold text-indigo-600'>
               JSON to Excel Converter
            </h1>
            <p className='text-gray-600 mt-2'>
               Upload your JSON file and download the Excel file instantly!
            </p>
         </div>
         <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-md'>
            <div className='mb-4'>
               <label
                  htmlFor='file-upload'
                  className='block text-lg font-medium text-gray-700 mb-2'>
                  Choose JSON File
               </label>
               <input
                  type='file'
                  id='file-upload'
                  accept='.json'
                  onChange={handleFileChange}
                  className='block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200'
               />
            </div>
            <button
               onClick={handleUpload}
               className='w-full bg-indigo-600 text-white text-lg font-medium py-2 rounded shadow hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300'>
               Upload and Convert
            </button>
         </div>
      </div>
   );
};

export default UploadJson;
