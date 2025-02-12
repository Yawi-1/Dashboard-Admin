import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../Redux/Actions/jobAction";
import Spinner from "../../Components/Spinner/Spinner";
import JobDeleteModal from "./JobDeleteModal";

const UpdateJob = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const dispatch = useDispatch();
  const { jobs, status } = useSelector((state) => state.jobs);
  useEffect(() => {
    dispatch(fetchJobs());
  }, []);

  const handleDelete = (job) => {
    setIsDelete(true);
    setSelectedJob(job);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Jobs</h1>
          <p className="text-lg text-gray-600">Expand your skills</p>
          <Link
            to="/Job/form"
             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 float-right"
          >
            Add new Job
          </Link>
        </div>
        <div className="p-6 pt-0">
          <div className="relative overflow-y-auto max-h-[80vh] rounded-lg shadow">
            <table className="w-full text-left bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 w-48 font-semibold">S.No</th>
                  <th className="p-4 w-48 font-semibold">Title</th>
                  <th className="p-4 font-semibold">Description</th>
                  <th className="p-4 font-semibold">Skills Required</th>
                  <th className="p-4 font-semibold">Job Type</th>
                  <th className="p-4 font-semibold">Last Date</th>
                  <th className="p-4 w-32 font-semibold">Delete</th>
                </tr>
              </thead>
              {status === "loading" ? (
                <Spinner />
              ) : (
                <>
                {jobs.length === 0 && <h1 className="text-2xl py-8 text-center">No Jobs Found ....</h1>}
                  <tbody className="overflow-y-auto max-h-[70vh]">
                    {jobs?.map((job, index) => (
                      <tr key={job._id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium">{index + 1}.</td>
                        <td className="p-4 font-medium">{job.title}</td>
                        <td className="p-4 font-xs">{job.description}</td>
                        <td className="p-4 text-gray-600">
                          {job.skills.map((skill, index) => (
                            <span className="capitalize" key={index}>
                              {skill},
                            </span>
                          ))}
                        </td>
                        <td className="p-4 text-gray-600">{job.jobType}</td>
                        <td className="p-4 text-gray-600">
                          {new Date(job.lastDate).toLocaleDateString()}
                        </td>

                        <td className="p-4">
                          <Button
                            variant="text"
                            size="small"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDelete(job)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}
            </table>
            <JobDeleteModal
              isOpen={isDelete}
              onClose={() => setIsDelete(false)}
              job={selectedJob}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateJob;
