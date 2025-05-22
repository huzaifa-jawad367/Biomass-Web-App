"use client";
import React, { useEffect, useState } from "react";
import Survey from "../../components/Survey";

const SurveyPage = () => {
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await fetch("/api/biomass");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (!data) {
          console.error("No data found");
          return;
        }
        setSurvey(data.data);
      } catch (error) {
        console.error("Error fetching surveys:", error);
      }
    };

    fetchSurveys();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/biomass/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Delete failed");

      // Remove the deleted item from UI
      setSurvey((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting survey:", error);
    }
  };

  return (
    <div className="relative top-20">
      {survey ? (
        <Survey survey={survey} onDelete={handleDelete} />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold mb-4">No Surveys Found</h1>
          <p className="text-lg">Please create a survey.</p>
        </div>
      )}
    </div>
  );
};

export default SurveyPage;