import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

const Survey = ({ survey, onDelete }) => {
  return (
    <div className="overflow-x-auto p-4 bg-white shadow-md rounded-lg">
      <Table className="min-w-full border border-gray-200">
        <TableHeader>
          <TableRow className="bg-gray-100 text-gray-700">
            <TableHead className="p-3 text-left font-semibold">Sr No</TableHead>
            <TableHead className="p-3 text-left font-semibold">
              Coordinates
            </TableHead>
            <TableHead className="p-3 text-left font-semibold">
              Biomass
            </TableHead>
            <TableHead className="p-3 text-left font-semibold">Image</TableHead>
            <TableHead className="p-3 text-left font-semibold">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {survey && survey.length > 0 ? (
            survey.map((item, index) => (
              <TableRow key={item._id} className="hover:bg-gray-50">
                <TableCell className="p-3">{index + 1}</TableCell>
                <TableCell className="p-3 space-y-1">
                  {item.coordinates.map((coord, coordIndex) => (
                    <div
                      key={coord._id || coordIndex}
                      className="text-sm text-gray-700"
                    >
                      {`Lat: ${coord.lat}, Lng: ${coord.lng}`}
                    </div>
                  ))}
                </TableCell>
                <TableCell className="p-3">{item.biomass}</TableCell>
                <TableCell className="p-3">
                  <img
                    src={item.imageUrl}
                    alt="Survey"
                    className="w-12 h-12 object-cover rounded border"
                  />
                </TableCell>
                <TableCell className="p-3 space-x-2">
                  <button
                    onClick={() => {
                      console.log("Edit clicked for ID:", item._id);
                      onDelete(item._id)}}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="5" className="text-center p-4 text-gray-500">
                No survey data available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Survey;
