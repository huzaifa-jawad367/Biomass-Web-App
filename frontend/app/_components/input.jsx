// "use client";
// import Image from "next/image";
// import React, { useState } from "react";

// const UploadImage = () => {
//   const [preview, setPreview] = useState(null);
//   const [file, setFile] = useState(null);

//   const handleFileDrop = (e) => {
//     e.preventDefault();
//     const droppedFile = e.dataTransfer.files[0];
//     if (droppedFile && droppedFile.type.startsWith("image/")) {
//       setFile(droppedFile);
//       const reader = new FileReader();
//       reader.onload = () => setPreview(reader.result);
//       reader.readAsDataURL(droppedFile);
//     }
//   };

//   const handleFileSelect = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile && selectedFile.type.startsWith("image/")) {
//       setFile(selectedFile);
//       const reader = new FileReader();
//       reader.onload = () => setPreview(reader.result);
//       reader.readAsDataURL(selectedFile);
//     }
//   };

//   const handleDragOver = (e) => e.preventDefault();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (file) {
//       console.log("File ready to upload:", file);
//       // Implement file upload logic here
//     } else {
//       alert("No file selected!");
//     }
//   };

//   return (
//     <form className="mx-auto" onSubmit={handleSubmit}>
//       <div className="my-4 border border-black w-[400px] md:w-[600px] lg:w-[900px]">
//         <h1 className="my-4 flex align-middle justify-center text-2xl">
//           Upload File Here
//         </h1>
//         <div
//           id="drop-area"
//           className="mx-auto my-20 flex items-center justify-center border-2 border-dashed cursor-pointer max-w-[350px] h-[200px]"
//           onDrop={handleFileDrop}
//           onDragOver={handleDragOver}
//           onClick={() => document.getElementById("image").click()}
//         >
//           {preview ? (
//             <Image
//               src={preview}
//               alt="Preview"
//               className="max-w-full max-h-full"
//             />
//           ) : (
//             "Drag here to preview"
//           )}
//         </div>
//         <input
//           type="file"
//           name="image"
//           id="image"
//           hidden
//           onChange={handleFileSelect}
//         />
//       </div>
//       <button
//         type="submit"
//         className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500"
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

// export default UploadImage;