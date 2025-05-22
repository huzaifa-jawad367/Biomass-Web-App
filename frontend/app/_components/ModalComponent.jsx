// "use client";
// import { useMemo } from "react";
// import Image from "next/image"; // Import Image from next/image

// const ModalComponent = ({
//   isOpen,
//   onClose,
//   shapeArea,
//   shapeCoordinates,
//   isDescriptionLoading,
//   description,
//   isBiomassLoading,
//   biomassData,
//   biomassImage,
//   error,
//   handleDescription,
//   handleCalculateBiomass,
// }) => {
//   if (!isOpen) return null;

//   // Memoizing the modal content outside of conditional rendering
//   const modalContent = useMemo(() => (
//     <div className="p-1 md:p-2 space-y-4 flex flex-col">
//       <p className="text-base leading-relaxed text-gray-500">
//         <strong className="text-gray-800">Area:</strong>{" "}
//         {shapeArea ? `${(shapeArea / 1000000).toFixed(4)} sq km` : "N/A"}
//       </p>
//       {shapeCoordinates?.length > 0 && (
//         <p className="text-base leading-relaxed text-gray-800">
//           <strong>Coordinates:</strong>
//         </p>
//       )}
//       <ul className="text-base leading-relaxed text-gray-500">
//         {shapeCoordinates?.map((coord, index) => (
//           <li key={index}>
//             <strong className="text-gray-800">Lng:</strong> {coord.lng},{" "}
//             <strong className="text-gray-800">Lat:</strong> {coord.lat}
//           </li>
//         ))}
//       </ul>
//       {isDescriptionLoading && (
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
//       )}
//       {error && <div className="text-red-700">Error: {error}</div>}
//       {description && (
//         <p className="text-base leading-relaxed text-gray-500">
//           <strong className="text-gray-800">Description:</strong> {description}
//         </p>
//       )}
//       {biomassData && (
//         <div>
//           <p className="text-base leading-relaxed text-gray-500">
//             <strong className="text-gray-800">Biomass:</strong> {biomassData} tons
//           </p>
//           {biomassImage && (
//             <div className="mt-4 flex justify-center">
//               <Image
//                 src={biomassImage}
//                 alt="Biomass Visualization"
//                 width={300} // Specify width
//                 height={200} // Specify height
//                 className="w-[20%] h-auto rounded-lg shadow-md"
//               />
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   ), [shapeArea, shapeCoordinates, isDescriptionLoading, description, biomassData, biomassImage, error]);

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-5 rounded-lg shadow-md w-11/12 md:w-1/2">
//         <div className="flex items-center justify-between p-1 border-b rounded-t">
//           <h3 className="text-xl font-semibold text-gray-900">Shape Details</h3>
//           <button
//             type="button"
//             onClick={onClose}
//             className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8"
//           >
//             ✖
//           </button>
//         </div>
//         {modalContent}
//         <div className="flex gap-2 mt-4">
//           <button
//             onClick={handleDescription}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//             disabled={isDescriptionLoading}
//           >
//             {isDescriptionLoading ? "Generating..." : "Generate Description"}
//           </button>
//           <button
//             onClick={handleCalculateBiomass}
//             className="bg-green-600 text-white px-4 py-2 rounded"
//             disabled={isBiomassLoading}
//           >
//             {isBiomassLoading ? "Calculating..." : "Calculate Biomass"}
//           </button>
//           <button onClick={onClose} className="bg-gray-200 px-4 py-2 rounded">
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ModalComponent;